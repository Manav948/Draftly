-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dateId" TEXT;

-- CreateTable
CREATE TABLE "Date" (
    "id" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE SET NULL ON UPDATE CASCADE;
