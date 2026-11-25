export const DEFAULT_OWNER_ADMIN_EMAILS = [
  'whitestyle3@naver.com',
];

export function getOwnerAdminEmails(): string[] {
  const raw = (process.env.OWNER_ADMIN_EMAILS || '').trim();
  const list = raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length > 0 ? list : DEFAULT_OWNER_ADMIN_EMAILS;
}

export function isOwnerAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getOwnerAdminEmails().includes(email.trim().toLowerCase());
}

export function generateDefaultHandle(seed?: string): string {
  const clean = (seed || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 6);
  const rand = Math.random().toString(36).slice(2, 8);
  return clean ? `hwata_${clean}_${rand.slice(0, 4)}` : `hwata_${rand}`;
}
