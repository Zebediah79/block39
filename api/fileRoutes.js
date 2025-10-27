import express from "express";
const fileRouter = express.Router();
export default fileRouter;
import { getFiles } from "#db/queries/files";

fileRouter.route("/").get(async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
