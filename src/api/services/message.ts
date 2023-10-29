import { authMiddleware, tokenObject } from "../../auth/JWT";
import { UserModel, MessageModel } from "../../database/model";
import { type Express } from "express";
import { type Server } from "socket.io";

type body = {
  message: undefined | string;
  userInfos: tokenObject | undefined;
};

function setupMessageAPI(app: Express, io: Server): void {
  app.post("/message", authMiddleware, async (req, res) => {
    const { message, userInfos } = req.body as body;
    if (!userInfos) return res.sendStatus(400);

    void UserModel.findOne({ _id: userInfos._id })
      .exec()
      .then(async (user) => {
        if (!user) {
          res.sendStatus(400);
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
