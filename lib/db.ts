import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const createPrismaClient = () =>
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? [
                      { emit: "stdout", level: "warn" },
                      { emit: "stdout", level: "error" },
                  ]
                : [{ emit: "stdout", level: "error" }],
    })

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
    prisma = createPrismaClient()
} else {
    if (!globalThis.prisma) {
        globalThis.prisma = createPrismaClient()
    }
    prisma = globalThis.prisma
}

export const db = prisma
