import log from "../../utils/log";
import { UserModel } from "../../database/model";
import { type Express } from "express";
import { generateUserToken } from "../../auth/JWT";

function setupUserApi(app: Express): void {
  app.post("/user", (req, res) => {
    if (typeof req.body !== "object" || !req.body.name) {
      res.sendStatus(400);
      return;
    }
    new UserModel({ name: req.body.name })
      .save()
      .then((v) => {
        if (!v.name || !v._id) return res.sendStatus(500);

        res.send({
          ...v.toJSON(),
          token: generateUserToken({ name: v.name, _id: v._id }),
        });
      })
      .catch((v) => {
        log.error("Impossible to create a user", v);
        res.sendStatus(500);
      });
  });
}

export default setupUserApi;
