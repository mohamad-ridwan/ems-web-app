import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

export function generateUuid(): string {
  return uuidv4();
}

export function encrypt(text: string, uuidKey: string): string {
  const key = crypto.createHash('sha256').update(uuidKey).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string, uuidKey: string): string {
  const [ivHex, encrypted] = encryptedText.split(':');
  if (!ivHex || !encrypted) {
    throw new Error('Invalid encrypted text format');
  }

  const key = crypto.createHash('sha256').update(uuidKey).digest();
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
