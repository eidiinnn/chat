import { UserModel, MessageModel } from "../../database/model";
import { type Express } from "express";

function setupMessageAPI(app: Express): void {
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
}
export default setupMessageAPI;
