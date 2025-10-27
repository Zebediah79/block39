import db from "#db/client";

export async function getFiles() {
  const sql = `
    SELECT files.*,
    (
    SELECT name
    FROM folders
    WHERE folders.id = files.folder_id
    ) AS folder_name
    FROM files
    `;

  const { rows: files } = await db.query(sql);
  console.log(files);
  return files;
}

export async function getFile(id) {
  const sql = `
    SELECT *
    FROM files
    WHERE id = $1
    `;
  const {
    rows: [file],
  } = await db.query(sql, [id]);
  return file;
}

export async function createFile({ name, size, folderId }) {
  const sql = `
  INSERT INTO files
    (name, size, folder_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folderId]);
  console.log("Creating file with name:", name);
  return file;
}
