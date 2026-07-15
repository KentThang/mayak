/*
  Warnings:

  - Added the required column `characters` to the `MonkeytypeResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonkeytypeResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" BIGINT NOT NULL,
    "wpm" REAL NOT NULL,
    "accuracy" REAL NOT NULL,
    "characters" REAL NOT NULL
);
INSERT INTO "new_MonkeytypeResult" ("accuracy", "id", "timestamp", "wpm") SELECT "accuracy", "id", "timestamp", "wpm" FROM "MonkeytypeResult";
DROP TABLE "MonkeytypeResult";
ALTER TABLE "new_MonkeytypeResult" RENAME TO "MonkeytypeResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
