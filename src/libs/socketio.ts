import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:5005", {
  extraHeaders: {
    "x-device-token": "1234",
    "x-remote-token": "1234:567",
    "x-staff-session": "1234",
  },
  reconnectionDelayMax: 10000,
  auth: {
    token: "123",
  },
});

socket.on("connection", () => {
  console.log(socket.id); // "G5p5..."
});

socket.on("openrtc", (msg: any) => {
  console.log("openrtc==>:", msg); // "G5p5..."
});

socket.on("disconnect", () => {
  console.log(socket.id); // "G5p5..."
});

export { socket };
