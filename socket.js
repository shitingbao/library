import { checkPermission } from "./middleware";

const roomNum = {}; // room client num
const device = {};
const remoteRoomFlag = "remote";
// const devicesRoomFlag = "device";
const tokenInfo = {}; // 可能 android 设备后上线，先保存 token ，设备上线直接下发

export function Socket(io, app) {
  io.use(async (socket, next) => {
    const headers = socket.handshake.headers;
    const isValid = await checkPermission({
      headers,
      app,
      socket,
    });
    if (!isValid) {
      socket.emit("error", {
        code: 4003,
        msg: "permission error",
      });
      socket.disconnect();
      return next(new Error("permission error"));
    }
    return next();
  });

  io.on("connection", async (client, req) => {
    devicesConnect(app, client);

    client.on("subscription/device", (msg) => {
      client.join("device:" + getRoomID(client));
    });

    client.on("unsubscribe/device", (msg) => {
      client.leave("device:" + getRoomID(client));
    });

    client.on("subscription/remote", (msg) => {
      const roomID = "remote:" + getRoomID(client);
      if (roomNum[roomID]) {
        roomNum[roomID] = 1;
      } else {
        roomNum[roomID] += 1;
      }
      devicesRemoteWake(client, msg.sn, roomID); // 先通知，再加入房间
      client.join(roomID);
      //如果是iot 设备远程连接，查看客户端是否已经下发 token，下发后并删除
      if (client.handshake.iotDeviceId && tokenInfo[roomID]) {
        client.emit("openrtc", tokenInfo[roomID]);
        const deviceQuery = client.handshake.query;
        client.to(roomID).emit("screen", {
          width: deviceQuery.width,
          height: deviceQuery.height,
        });
        delete tokenInfo[roomID];
      }
    });

    client.on("unsubscribe/remote", (msg) => {
      const roomID = "remote:" + getRoomID(client);
      client.leave(roomID);
      if (roomNum[roomID]) {
        roomNum[roomID] -= 1;
      }
      if ((roomNum[roomID] == 1) == remoteRoomFlag) {
        app.service.aliyun.rtc.DeleteChannel(flag);
      }
    });

    client.onAny((event, msg) => {
      const ignoreEvents = ["subscription/remote", "unsubscribe/remote"];
      if (ignoreEvents.includes(event)) return;
      devicesOnAny(app, client, event, msg);
    });

    client.on("disconnect", () => {
      devicesDisconnect(app, client);
    });
  });
}

// 上线广播,保持设备连接，通知房间内的客户端设备上线
async function devicesConnect(app, client) {
  console.log("connect socket");
  if (client.handshake.iotDeviceId || client.handshake.remoteDevice) {
    device[getRoomID(client)] = client;
  }
  await sendDevicesOnline(app, client);
  client.to("device:" + getRoomID(client)).emit("/devices/status", true);
}

// 通知下线，记录下线入库，并 room num，离开房间
async function devicesDisconnect(app, client) {
  const roomID = getRoomID(client);
  client.to(getRoomID(client)).emit("/devices/status", false);
  if (roomNum[roomID]) {
    roomNum[roomID] -= 1;
  }
  if (roomNum[roomID] == 1) {
    app.service.aliyun.rtc.DeleteChannel(flag);
  }
  client.leave(getRoomID(client));
  sendDevicesOffline(app, client);
}

// 广播转发事件
function devicesOnAny(app, client, event, msg) {
  const roomID = getRoomID(client);
  const token = getRtcToken(app, getRoomID(client));
  console.log("any event:", event, getRoomID(client));
  if (event == "openrtc") {
    const deviceClient = device[roomID];
    if (deviceClient) {
      client.to(roomID).emit(event, token);
      const deviceQuery = deviceClient.handshake.query;
      client.to(roomID).emit("screen", {
        width: deviceQuery.width,
        height: deviceQuery.height,
      });
    } else {
      tokenInfo[roomID] = token;
    }
    return;
  }
  client.to(roomID).emit(event, msg);
}

// 唯一 id 码（机器id）
function getRoomID(client, msg) {
  if (msg) {
    return msg.sn;
  }
  if (client.handshake.query) {
    return client.handshake.query.sn;
  }
  if (client.handshake.iotDeviceId) {
    return client.handshake.iotDeviceId;
  }
  if (client.handshake.remoteDevice) {
    return client.handshake.remoteDevice.split(":")[0];
  }
}

async function getRtcToken(app, flag) {
  const token = await app.service.aliyun.rtc.genToken({
    userId: flag,
    channelId: flag,
  });
  token.gslb = token.gslb[0];
  return token;
}

// 向 redis 中发送设备在线信息
async function sendDevicesOnline(app, client) {
  if (!client.handshake.iotDeviceId) {
    return;
  }
  await app.redis.lPush("devides-online", [getRoomID(client)]);
}

// 向 redis 中发送设备离线信息
async function sendDevicesOffline(app, client) {
  if (!client.handshake.iotDeviceId) {
    return;
  }
  await app.redis.lPush("devides-offline", [getRoomID(client)]);
}

// 通知 iot 设备开启远程
export function devicesRemoteWake(client, sn, roomID) {
  client.to(roomID).emit("/devices/wake", sn);
}

// 通知 iot 设备关闭远程
export function devicesRemoteClose(client, sn, roomID) {
  client.to(roomID).emit("/devices/close", sn);
}
