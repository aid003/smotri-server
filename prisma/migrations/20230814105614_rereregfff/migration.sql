/*
  Warnings:

  - Added the required column `photo` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ratingFilm" TEXT NOT NULL,
    "novelty" TEXT NOT NULL,
    "postersUrl" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
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
