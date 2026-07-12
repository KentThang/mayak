-- CreateTable
CREATE TABLE "MonkeytypeResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" BIGINT NOT NULL,
    "wpm" REAL NOT NULL,
    "accuracy" REAL NOT NULL,
    "consistency" REAL NOT NULL,
    "language" TEXT NOT NULL
);
