/*
  Warnings:

  - You are about to drop the column `filmName` on the `Urls` table. All the data in the column will be lost.
  - Added the required column `quality` to the `Urls` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quality" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "Urls_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Urls" ("id", "url", "videoId") SELECT "id", "url", "videoId" FROM "Urls";
DROP TABLE "Urls";
ALTER TABLE "new_Urls" RENAME TO "Urls";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
