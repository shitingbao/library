import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:5005/devices?sn=897508487", {
  reconnectionDelayMax: 10000,
  auth: {
    sid: "5ce0fe572e59f395a53ef6d42e7d37b00e5b2d7c",
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
