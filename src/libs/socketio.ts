import { io } from "socket.io-client";
// dev
// const socket = io("ws://192.168.31.35:5005/iot?name=aa", {
//   withCredentials: true,
//   reconnectionDelayMax: 10000,
//   auth: {
//     sid: "9e0b7afa691dd3737189ab60a56e2e4e73b3733a",
//   },
// });

function NewSocket() {
  const socket = io("ws://192.168.31.33:5005/iot?sn=SZLXIX4EFRIP6", {
    withCredentials: true,
    reconnectionDelayMax: 10000,
    auth: {
      sid: "9e0b7afa691dd3737189ab60a56e2e4e73b3733a",
      phoneNumber: "15164350934",
      platform: "windows",
    },
  });

  socket.on("connect", () => {
    console.log("ssocket id ,connetced===:", socket.id, socket.connected); // "G5p5..."
  });

  socket.io.on("ping", () => {
    console.log("get io server ping msg!!!"); // "G5p5..."
  });

  socket.on("ping", (msg: any) => {
    console.log("get server ping msg is==> : ", msg); // "G5p5..."
  });

  socket.on("test", (msg: any) => {
    console.log("test==>:", msg); // "G5p5..."
  });

  socket.on("user-joined", (msg: any) => {
    console.log("user-joined==>:", msg); // "G5p5..."
  });

  socket.on("user-leave", (msg: any) => {
    console.log("user-leave==>:", msg); // "G5p5..."
  });

  socket.on("room-joined", (msg: any) => {
    console.log("room-joined==>:", msg); // "G5p5..."
  });

  socket.on("error", (msg: any) => {
    console.log("room-error==>:", msg); // "G5p5..."
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id); // "G5p5..."
  });
  return socket;
}

// socket.onAny((event, msg) => {
//   console.log("onAny:", event, msg);
// });

export { NewSocket };
