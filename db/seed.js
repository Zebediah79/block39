import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    const folder = await createFolder({ name: "Folder" + i });
    for (let j = 1; j <= 5; j++) {
      await createFile({
        name: "File" + j,
        size: 1024 * j,
        folderId: folder.id,
      });
    }
  }
}
