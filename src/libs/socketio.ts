import { io } from "socket.io-client";
// dev
// const socket = io("ws://192.168.31.35:5005/iot?name=aa", {
//   withCredentials: true,
//   reconnectionDelayMax: 10000,
//   auth: {
//     sid: "9e0b7afa691dd3737189ab60a56e2e4e73b3733a",
//   },
// });

function NewSocket(){
  const socket = io("ws://192.168.31.35:5005/iot?name=aa", {
    withCredentials: true,
    reconnectionDelayMax: 10000,
    auth: {
      sid: "9e0b7afa691dd3737189ab60a56e2e4e73b3733a",
    },
  });

  socket.on("connection", () => {
    console.log(socket.id); // "G5p5..."
  });
  
  socket.on("pong", (msg: any) => {
    console.log("pong==>:", msg); // "G5p5..."
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
    console.log(socket.id); // "G5p5..."
  });
  return socket
}



// socket.onAny((event, msg) => {
//   console.log("onAny:", event, msg);
// });

export { NewSocket };
