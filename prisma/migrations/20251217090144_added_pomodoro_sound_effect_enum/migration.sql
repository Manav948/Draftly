-- CreateEnum
CREATE TYPE "PomodoroSoundEffect" AS ENUM ('ANALOG', 'BIRD', 'CHURCH_BELL', 'DIGITAL', 'FENCY', 'BELL');

-- AlterTable
ALTER TABLE "PomodoroSettings" ADD COLUMN     "soundEffect" "PomodoroSoundEffect" NOT NULL DEFAULT 'BELL',
ADD COLUMN     "soundEffectVolume" DOUBLE PRECISION NOT NULL DEFAULT 0.5;
