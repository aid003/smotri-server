-- CreateTable
CREATE TABLE "Video" (
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
    "voiceActing" TEXT NOT NULL,
    "TitleSeo" TEXT NOT NULL,
    "DescriptionSeo" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "prime" TEXT NOT NULL,
    "reatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "Urls_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_title_key" ON "Video"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
