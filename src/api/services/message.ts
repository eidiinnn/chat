import { UserModel, MessageModel } from "../../database/model";
import { type Express } from "express";
import { type Server } from "socket.io";

function setupMessageAPI(app: Express, io: Server): void {
  app.post("/message", (req, res) => {
    const { token, message } = req.body;
    void UserModel.findOne({ token })
      .exec()
      .then(async (user) => {
        if (!user) {
          res.sendStatus(401);
        } else {
          const data = await new MessageModel({
            createdDate: new Date().toString(),
            message,
            user: user._id,
          }).save();
          if (data._id) res.send({ message: data.message, user: data.user });
          else res.sendStatus(500);
        }
      });
  });

  MessageModel.addListener("save", (message) => {
    io.emit("message", message);
  });

}
export default setupMessageAPI;
