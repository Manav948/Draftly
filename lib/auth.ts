import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        "strategy": "jwt"
    },
    pages: {
        error: "sign-in",
        signIn: "sign-in"
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID!,
            clientSecret: process.env.APPLE_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Name", type: "text", placeholder: "Name" },
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await db.user.findFirst({})
    ]
}

