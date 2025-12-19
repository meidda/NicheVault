import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            isAdmin: boolean
            isPremium: boolean
        } & DefaultSession["user"]
    }

    interface User {
        isAdmin: boolean
        isPremium: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean
        isPremium: boolean
    }
}
