-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityTitle" TEXT NOT NULL,
    "secondsSpent" INTEGER NOT NULL,
    "description" TEXT
);
