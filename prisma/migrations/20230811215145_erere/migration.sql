/*
  Warnings:

  - You are about to drop the column `voiceActing` on the `Video` table. All the data in the column will be lost.
  - Added the required column `voiceActing` to the `Urls` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quality" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "voiceActing" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "Urls_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Urls" ("id", "quality", "url", "videoId") SELECT "id", "quality", "url", "videoId" FROM "Urls";
DROP TABLE "Urls";
ALTER TABLE "new_Urls" RENAME TO "Urls";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ratingFilm" TEXT NOT NULL,
    "novelty" TEXT NOT NULL,
    "postersUrl" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "yearCreate" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "gendre" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ageRestriction" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actors" TEXT NOT NULL,
    "TitleSeo" TEXT NOT NULL,
    "DescriptionSeo" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("DescriptionSeo", "TitleSeo", "actors", "ageRestriction", "content", "countries", "createdAt", "description", "gendre", "id", "novelty", "postersUrl", "preview", "published", "ratingFilm", "title", "updatedAt", "yearCreate") SELECT "DescriptionSeo", "TitleSeo", "actors", "ageRestriction", "content", "countries", "createdAt", "description", "gendre", "id", "novelty", "postersUrl", "preview", "published", "ratingFilm", "title", "updatedAt", "yearCreate" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_title_key" ON "Video"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
