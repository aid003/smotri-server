/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actors` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countries` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Actor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActorProfile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Country";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ratingFilm" REAL NOT NULL,
    "postersUrl" TEXT NOT NULL,
    "yearCreate" INTEGER NOT NULL,
    "countries" TEXT NOT NULL,
    "gendre" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ageRestriction" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "actors" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "TitleSeo" TEXT NOT NULL,
    "DescriptionSeo" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("DescriptionSeo", "TitleSeo", "ageRestriction", "content", "createdAt", "description", "gendre", "id", "postersUrl", "published", "ratingFilm", "title", "updatedAt", "url", "yearCreate") SELECT "DescriptionSeo", "TitleSeo", "ageRestriction", "content", "createdAt", "description", "gendre", "id", "postersUrl", "published", "ratingFilm", "title", "updatedAt", "url", "yearCreate" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_title_key" ON "Video"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
