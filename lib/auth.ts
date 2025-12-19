import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('🔐 Authorize called with:', credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log('❌ Missing credentials');
                    throw new Error('Invalid credentials');
                }

                try {
                    console.log('🔍 Looking up user:', credentials.email);
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    console.log('👤 User found:', user ? 'Yes' : 'No');

                    if (!user || !user.password) {
                        console.log('❌ User not found or no password');
                        throw new Error('User not found');
                    }

                    console.log('🔑 Comparing passwords...');
                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    console.log('✅ Password valid:', isValid);

                    if (!isValid) {
                        console.log('❌ Invalid password');
                        throw new Error('Invalid password');
                    }

                    console.log('✅ Login successful for:', user.email);
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        isPremium: user.isPremium
                    };
                } catch (error) {
                    console.error('❌ Auth error:', error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub as string;
                session.user.isAdmin = token.isAdmin as boolean;
                session.user.isPremium = token.isPremium as boolean;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // On initial sign in (user object exists)
            if (user) {
                console.log('🔐 Initial JWT - User:', user.email);
                token.isAdmin = user.isAdmin;
                token.isPremium = user.isPremium;
            }

            // Always fetch latest premium status from database
            if (token.email) {
                console.log('🔄 Syncing premium status for:', token.email);
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                    select: { isPremium: true, isAdmin: true }
                });

                if (dbUser) {
                    console.log('✅ Premium status synced:', dbUser.isPremium);
                    token.isPremium = dbUser.isPremium;
                    token.isAdmin = dbUser.isAdmin;
                } else {
                    console.log('⚠️ User not found in database, creating...');
                    // For Google OAuth users, create account if doesn't exist
                    if (account?.provider === 'google' && token.name && token.email) {
                        const newUser = await prisma.user.create({
                            data: {
                                email: token.email,
                                name: token.name,
                                isPremium: false,
                                isAdmin: false,
                            }
                        });
                        token.isPremium = newUser.isPremium;
                        token.isAdmin = newUser.isAdmin;
                        console.log('✅ Google user created:', token.email);
                    }
                }
            }

            return token;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60, // 30 days
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
};
