import { prisma } from "@/lib/prisma";

export async function generateQR(data: Record<string, unknown>) {
  const { profileId, username } = data as { profileId: string; username: string };
  return {
    profileId,
    username,
    url: `https://worktag.io/${username}`,
    imageUrl: `/api/v1/qr/image/${username}`,
    toJSON() { return { profileId, username, url: `https://worktag.io/${username}`, imageUrl: `/api/v1/qr/image/${username}` }; },
  };
}

export async function getQRByProfileId(profileId: string) {
  const profile = await prisma.profile.findUnique({ where: { id: profileId } });
  if (!profile) return null;
  return {
    profileId,
    username: profile.username,
    url: `https://worktag.io/${profile.username}`,
    imageUrl: `/api/v1/qr/image/${profile.username}`,
    toJSON() { return { profileId, username: profile.username, url: `https://worktag.io/${profile.username}`, imageUrl: `/api/v1/qr/image/${profile.username}` }; },
  };
}
