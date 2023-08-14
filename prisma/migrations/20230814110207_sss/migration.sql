-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ratingFilm" TEXT NOT NULL,
    "novelty" TEXT NOT NULL,
    "postersUrl" TEXT NOT NULL,
    "preview" TEXT,
    "photo" TEXT,
    "yearCreate" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "gendre" TEXT NOT NULL,
    "content" TEXT,
    "ageRestriction" TEXT NOT NULL,
    "description" TEXT,
    "actors" TEXT NOT NULL,
    "TitleSeo" TEXT,
    "DescriptionSeo" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("DescriptionSeo", "TitleSeo", "actors", "ageRestriction", "content", "countries", "createdAt", "description", "gendre", "id", "novelty", "photo", "postersUrl", "preview", "published", "ratingFilm", "title", "updatedAt", "yearCreate") SELECT "DescriptionSeo", "TitleSeo", "actors", "ageRestriction", "content", "countries", "createdAt", "description", "gendre", "id", "novelty", "photo", "postersUrl", "preview", "published", "ratingFilm", "title", "updatedAt", "yearCreate" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_title_key" ON "Video"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
