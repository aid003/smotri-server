/*
  Warnings:

  - Added the required column `filmName` to the `Urls` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "Urls_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Urls" ("id", "url", "videoId") SELECT "id", "url", "videoId" FROM "Urls";
DROP TABLE "Urls";
ALTER TABLE "new_Urls" RENAME TO "Urls";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
