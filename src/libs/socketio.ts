import { io } from "socket.io-client";

const socket = io("ws://192.168.31.35:5005/iot", {
  reconnectionDelayMax: 10000,
  auth: {
    sid: "9739fcc40c161a2a0fca03c3689955efc9d552a7",
  },
});

socket.on("connection", () => {
  console.log(socket.id); // "G5p5..."
});

socket.on("test", (msg: any) => {
  console.log("test==>:", msg); // "G5p5..."
});

socket.on("disconnect", () => {
  console.log(socket.id); // "G5p5..."
});

socket.onAny((event, msg) => {
  console.log("onAny:", event, msg);
});

export { socket };
