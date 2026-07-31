import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { config } from "@/config";
import { getEmailProvider } from "@/infra";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: config.auth.resetTokenExpiry,
    sendResetPassword: async ({ user, url }) => {
      const from =
        process.env.RESEND_FROM ??
        `no-reply@${new URL(process.env.NEXT_PUBLIC_APP_URL ?? process.env.BETTER_AUTH_URL ?? "http://localhost:3000").hostname}`;
      await getEmailProvider().send({
        from,
        to: user.email,
        subject: "Reset your WorkTag password",
        html: `
          <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; line-height: 1.6; padding: 24px;">
            <h1 style="font-size: 24px; margin-bottom: 16px;">Reset your WorkTag password</h1>
            <p style="margin: 0 0 16px;">Hi ${user.name ?? user.email ?? "there"},</p>
            <p style="margin: 0 0 24px;">Click the button below to choose a new password. The link expires in 2 hours.</p>
            <a href="${url}" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 22px; background: #0A3D91; color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Reset password</a>
            <p style="margin: 24px 0 0; color: #666;">If you didn&rsquo;t request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  session: {
    expiresIn: config.auth.sessionExpiry,
    updateAge: config.auth.sessionUpdateAge,
  },
  plugins: [nextCookies()],
});

export type Auth = typeof auth;

export function getAuthClient() {
  return auth;
}
