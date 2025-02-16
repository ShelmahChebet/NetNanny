/*
  Warnings:

  - Added the required column `suspicious_name` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "suspicious_name" TEXT NOT NULL;
