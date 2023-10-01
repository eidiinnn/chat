import { MessageModel } from "../../database/model";
import { type Server } from "socket.io";

function setupChatSocket(io: Server): void {
  MessageModel.addListener("save", (message) => {
    io.emit("message", message);
  });
}

export default setupChatSocket;
