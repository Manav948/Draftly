-- DropForeignKey
ALTER TABLE "public"."MindMap" DROP CONSTRAINT "MindMap_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MindMap" DROP CONSTRAINT "MindMap_updatedUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_updatedUserId_fkey";

-- CreateTable
CREATE TABLE "savedMindMaps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "savedMindMaps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "savedMindMaps_userId_idx" ON "savedMindMaps"("userId");

-- CreateIndex
CREATE INDEX "savedMindMaps_taskId_idx" ON "savedMindMaps"("taskId");

-- AddForeignKey
ALTER TABLE "savedMindMaps" ADD CONSTRAINT "savedMindMaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedMindMaps" ADD CONSTRAINT "savedMindMaps_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "MindMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindMap" ADD CONSTRAINT "MindMap_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindMap" ADD CONSTRAINT "MindMap_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
