import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import nextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import GithubProvider from "next-auth/providers/github";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await nextAuth(req, res, {
        adapter: PrismaAdapter(prisma),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            })
        ],
        secret: process.env.SECRET,
        session: {
            strategy: 'database'
        },
        theme: {
            colorScheme: 'auto'
        },
        debug: false
    })
}