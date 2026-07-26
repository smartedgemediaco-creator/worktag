import { prisma } from "@/lib/prisma";

export async function createProfile(data: Record<string, unknown>) {
  const { userId, businessName, category, phone, whatsapp, email, location } = data as {
    userId: string;
    businessName: string;
    category: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    location?: Record<string, unknown>;
  };

  const username = (businessName as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

  const profile = await prisma.profile.create({
    data: {
      userId,
      username,
      businessName,
      category,
      phone: phone ?? null,
      whatsapp: whatsapp ?? null,
      email: email ?? null,
      location: location ? JSON.parse(JSON.stringify(location)) : undefined,
    },
  });

  return {
    ...profile,
    _id: profile.id,
    toJSON() { return { ...profile, _id: profile.id }; },
  };
}

export async function getProfileByUserId(userId: string) {
  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) return null;
  return {
    ...profile,
    _id: profile.id,
    toJSON() { return { ...profile, _id: profile.id }; },
  };
}

export async function getProfileByUsername(username: string) {
  return prisma.profile.findUnique({ where: { username } });
}

export async function updateProfile(userId: string, data: Record<string, unknown>) {
  const profile = await prisma.profile.update({ where: { userId }, data });
  return {
    ...profile,
    _id: profile.id,
    toJSON() { return { ...profile, _id: profile.id }; },
  };
}
