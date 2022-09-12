import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:5005/iot?name=aa", {
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

socket.on("recover", (msg: any) => {
  console.log("recover==>:", msg); // "G5p5..."
});

socket.on("disconnect", () => {
  console.log(socket.id); // "G5p5..."
});

// socket.onAny((event, msg) => {
//   console.log("onAny:", event, msg);
// });

export { socket };
