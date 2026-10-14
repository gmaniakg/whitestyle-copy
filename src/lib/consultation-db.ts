import fs from 'fs';
import path from 'path';

export interface ConsultationRecord {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  memo: string;
  agreedPrivacy: boolean;
  source: string;
  ip?: string;
  status: 'PENDING' | 'CONTACTED' | 'RESERVED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'consultations.json');

// Ensure storage directory and file exist
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[consultation-db] ensureStorage error:', err);
  }
}

// Read records from local JSON fallback
function readLocalRecords(): ConsultationRecord[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as ConsultationRecord[];
  } catch (err) {
    console.error('[consultation-db] readLocalRecords error:', err);
    return [];
  }
}

// Write records to local JSON fallback
function writeLocalRecords(records: ConsultationRecord[]) {
  ensureStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('[consultation-db] writeLocalRecords error:', err);
  }
}

// Check if Prisma can be safely used
let prismaInstance: any = null;
async function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (prismaInstance) return prismaInstance;
  try {
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient();
    return prismaInstance;
  } catch (e) {
    console.warn('[consultation-db] Prisma not available, using JSON storage:', e);
    return null;
  }
}

/**
 * Create a new consultation record
 */
export async function createConsultation(data: {
  name: string;
  phone: string;
  treatment?: string;
  memo?: string;
  agreedPrivacy?: boolean;
  source?: string;
  ip?: string;
}): Promise<ConsultationRecord> {
  const prisma = await getPrisma();
  const now = new Date();

  const newRecord: ConsultationRecord = {
    id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    treatment: data.treatment || '일반/종합상담',
    memo: data.memo || '',
    agreedPrivacy: data.agreedPrivacy ?? true,
    source: data.source || 'quick_bar',
    ip: data.ip || '',
    status: 'PENDING',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  if (prisma) {
    try {
      const created = await prisma.consultation.create({
        data: {
          id: newRecord.id,
          name: newRecord.name,
          phone: newRecord.phone,
          treatment: newRecord.treatment,
          memo: newRecord.memo,
          agreedPrivacy: newRecord.agreedPrivacy,
          source: newRecord.source,
          ip: newRecord.ip,
          status: newRecord.status,
          createdAt: now,
          updatedAt: now,
        },
      });
      return {
        ...created,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    } catch (err) {
      console.warn('[consultation-db] Prisma create failed, falling back to JSON:', err);
    }
  }

  // Fallback to local storage
  const records = readLocalRecords();
  records.unshift(newRecord);
  writeLocalRecords(records);
  return newRecord;
}

/**
 * List consultation records with filtering & search
 */
export async function getConsultations(params?: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ items: ConsultationRecord[]; total: number }> {
  const prisma = await getPrisma();
  const limit = params?.limit ?? 50;
  const offset = params?.offset ?? 0;

  if (prisma) {
    try {
      const where: any = {};
      if (params?.status && params.status !== 'ALL') {
        where.status = params.status;
      }
      if (params?.search) {
        where.OR = [
          { name: { contains: params.search, mode: 'insensitive' } },
          { phone: { contains: params.search, mode: 'insensitive' } },
          { memo: { contains: params.search, mode: 'insensitive' } },
        ];
      }

      const [items, total] = await Promise.all([
        prisma.consultation.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        prisma.consultation.count({ where }),
      ]);

      return {
        items: items.map((item: any) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (err) {
      console.warn('[consultation-db] Prisma query failed, falling back to JSON:', err);
    }
  }

  // Fallback to local storage
  let records = readLocalRecords();

  if (params?.status && params.status !== 'ALL') {
    records = records.filter(r => r.status === params.status);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    records = records.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        (r.memo && r.memo.toLowerCase().includes(q))
    );
  }

  const total = records.length;
  const items = records.slice(offset, offset + limit);

  return { items, total };
}

/**
 * Update consultation status
 */
export async function updateConsultationStatus(
  id: string,
  status: 'PENDING' | 'CONTACTED' | 'RESERVED' | 'CANCELLED'
): Promise<ConsultationRecord | null> {
  const prisma = await getPrisma();
  const now = new Date();

  if (prisma) {
    try {
      const updated = await prisma.consultation.update({
        where: { id },
        data: { status, updatedAt: now },
      });
      return {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } catch (err) {
      console.warn('[consultation-db] Prisma update failed, falling back to JSON:', err);
    }
  }

  const records = readLocalRecords();
  const idx = records.findIndex(r => r.id === id);
  if (idx === -1) return null;

  records[idx].status = status;
  records[idx].updatedAt = now.toISOString();
  writeLocalRecords(records);
  return records[idx];
}
