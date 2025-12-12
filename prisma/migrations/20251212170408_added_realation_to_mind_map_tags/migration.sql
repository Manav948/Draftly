-- CreateTable
CREATE TABLE "_MindMapToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MindMapToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MindMapToTag_B_index" ON "_MindMapToTag"("B");

-- AddForeignKey
ALTER TABLE "_MindMapToTag" ADD CONSTRAINT "_MindMapToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "MindMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MindMapToTag" ADD CONSTRAINT "_MindMapToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
