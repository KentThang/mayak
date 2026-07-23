-- CreateTable
CREATE TABLE "ListeningExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Listen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listenedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notesDuring" TEXT,
    "notesAfter" TEXT,
    "exerciseId" TEXT NOT NULL,
    CONSTRAINT "Listen_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "ListeningExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
