import express from "express";
const folderRouter = express.Router();
export default folderRouter;
import { getFile, createFile } from "#db/queries/files";
import { getFolders, getFolder } from "#db/queries/folders";

folderRouter.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

folderRouter.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer.");

  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

folderRouter.route("/:id").get((req, res) => {
  res.send(req.folder);
});

folderRouter.route("/:id/files").post(async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have body.");
  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Request body must have: name and size.");
  const folderId = req.folder.id;
  const file = await createFile({ name, size, folderId });
  res.status(201).send(file);
});
