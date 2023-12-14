import { io } from "socket.io-client";

// import NodeRSA from 'node-rsa';
// function encodeKey() {
//     const privateKey = `-----BEGIN PRIVATE KEY-----
//     MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCrIhPS1g3ZALWW
//     39VF8c3S8wOO9fvcpWZika2fXhiUD5rvno5z86HETDF+qPVR/7NpmtGWNV+2dHR0
//     +RDVX0Y70I5vXeoH9nF+f9GLk+uuxb37DjQXD+hc5XTY2mjRUArBvXwJgbJAkHyz
//     SLy7b/yx0C+BW9EMeakQjIuFBC4HcGaNoyRlMhAegIthYLfis3L4WnN9eFv8kRX1
//     /iEe7Wb+i5G5HXm7T4hmZKs1JUNrIvuo2lHdyU28m07VqEkIo3VL88nc5tp6p1UI
//     NKVm/KLEjz8GPalXxPNwY0Z2Tok30GqsPHFfZ4cXL/1GhhvLSxWijr7P57HyBs2q
//     MrZ593ftAgMBAAECggEBAIjhpQGK/WCJVLXtK2Xa10rX3gzHbEE8evx0kW9bkEU9
//     hiwLot3UDZw5ZY1uD2sbH6JklyeSYZBK7atyXKiOoFrPol4pvDvKP1VzX2RJWMZe
//     nGrnHXsk2jMTxbZ+XECvySrWKRRhjPZfm567m1pBZNnFL3pEup1D4pq+EArBISAI
//     1Ldg2dJdwWRMGEuaCzNTLobm1poEhjW8cPr9w62k9mHhVWPNXks0KAzeDjy3u9A3
//     moWRayX6KpMJHJWxP94cbySJ79D4RGupjXcCVAnxYRrswgzLB/PS00NCkUyQhJK4
//     V+2w6grAVgfsbGCyfac1fyjU1O+DVDfVa55CMF4Dq3ECgYEA2H1YrG4K5cIVHNDR
//     Hukz+KAmJJUJ01UkxG5WuMpVFrOyP7BYdo3nTJubt8oqaTPingOi4LU7mDAj0QBT
//     zkY7F+hhA7V0FdypsR5Bmxa3waCHhq4jgN58WF+ujsceHcX3LhbR2KUGgDOiW5NS
//     EUiAwYL7PdBKRJc0DHNnZRQ+S8MCgYEAyl2e1RciEXHIfdKYgtrWLsFaHqdJ08rT
//     hpGkZ91QYysbT8hAyuBF2z9bU9On4vywlAsW5N1H1NtPRZRoZapM86TQOlnO09W7
//     kap2kifEXc8BvN5bk1pOzXlD7COHJb/OcM8eBcV7iAzHVc2Klkqr+tvUmpZIkgty
//     S8EmAQMD4o8CgYEAlM37wHHXLbws9OSXiU60OWYjMav71/ZDUn2hQF1bBUK498wH
//     0l2RqfefnkHoyu0uDHzlXN1VvDMCu2slL7jYb4N8A6eaxlgpj6QDZk3EOuRTo4BY
//     yQCkqb4C5wL4sXBciaKH1QkBoedb5uQpWdXjIqAcf42HLwRbc19zp2e1ti8CgYAK
//     LjWMYNKM8B12/v4/LwUxava+rgnPxtdnYLJVq1Oc+ZExLVDdI/U/t2s/x1kd2TqE
//     6B3pu5wegD33sSSjYLLoWvVCyjvWel0qUdoPNkLxuTVMLB+NRTDLs3sQSSVGZ+TZ
//     1gGbpri1OndYwLNlJjKKtz513HOgLUU9vGTODjnGzwKBgQCguSxM2ZgC1Zlj1/UV
//     LavmQVFnPptTn6phn8LUxhc8CArDT8q7h2U3Se9XKkJHQ+teTknrNsyqleDoO9LQ
//     b4D+hYez3GodLyn9NpE9p+SoL6KEcv9V4qNF2Enoxw0Gg/WyaxMRZLaXc7rKXmy1
//     6fWj/AF6rbr3UzHsyNdCw4tNcg==
//     -----END PRIVATE KEY-----`
//     const key = new NodeRSA(privateKey);
//   const encryptedData = key.encryptPrivate("aa", 'base64');
//   return encryptedData;
// }

function NewSocket() {
  const socket = io("ws://192.168.31.33:8000?name=aa", {
    withCredentials: true,
    reconnectionDelayMax: 10000,
    auth: {
      sid: "9e0b7afa691dd3737189ab60a56e2e4e73b3733a",
      phoneNumber: "15164350934",
      platform: "windows",
    },
    extraHeaders: {
      // "x-device-token":
      //   "Xl9TBO+BSSn4ctm/mMZMEDcaENUbaVYER7fHi/fnTb6craTHQaUCszqW98HMPxJFJ+Kuw8zg8L8okE+V6OE2HfxVqoJ5/YqZyOlGQk74marPStmB4CVgnFPfXFFQEZy8xCcEcYSzunvFDxchWF6Z4HpiWdh0zJ7rN3uVtKdZtD14T92eNuzANAhy/ONGhjunyo2AdAXTHjdMHd+FO2Mq6eAWsZx9XZDeyyGfB+8H4DY4+LKdmcD8YLDBA9FnPa35DMPcOG7BedqnNm/kKLlq1EjsjxYZVna0uOaj63E3BAoGiF1RQg07OBbSMA8H7ldSYlsAxDaStd4SBzxRqbXkGA==", // encodeKey
      // "x-device-sn": "aa",
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

  socket.on("pong", (msg: any) => {
    console.log("get server pong msg is==> : ", msg); // "G5p5..."
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
