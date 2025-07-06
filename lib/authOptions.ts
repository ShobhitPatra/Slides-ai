import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User } from "next-auth";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "very_much_secret",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              profileImage: user.image!,
            },
          });
          console.log(newUser);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },
  },
};
