import http from "http";
import { WebSocket, WebSocketServer } from "ws";

const wssHandler = (server: http.Server) => {
  const wss = new WebSocketServer({
    server: server,
    path: "/ws",
  });

  wss.on("connection", (socket: WebSocket, req: http.IncomingMessage) => {
    const remoteAddress = req.socket.remoteAddress;
    const remotePort = req.socket.remotePort;
    console.log(`Client connected from ${remoteAddress}:${remotePort}`);

    socket.on("close", (code, reason) => {
      console.log(
        `Client disconnected from ${remoteAddress}:${remotePort} (${code}: ${reason.toString()})`,
      );
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  wss.on("close", () => {
    console.log("WebSocket server closed");
  });

  return wss;
};

const attachWebSocketServer = (server: http.Server) => {
  const wss = wssHandler(server);

  const broadcastToAll = (data: string) => {
    wss.clients.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });
  };

  return {
    broadcastToAll,
  };
};

export { attachWebSocketServer };
