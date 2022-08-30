import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:5005/remote", {
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

export { socket };
