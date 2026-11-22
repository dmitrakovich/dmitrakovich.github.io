import type { Lang } from '../data/resume';

const MONTHS: Record<Lang, string[]> = {
  ru: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const PRESENT: Record<Lang, string> = { ru: 'сейчас', en: 'Present' };

function parse(ym: string): [number, number] {
  const [y, m] = ym.split('-').map(Number);
  return [y, m];
}

/** Months between two 'YYYY-MM' dates, counted inclusively (like LinkedIn). */
export function monthsBetween(start: string, end: string | null, now: Date = new Date()): number {
  const [sy, sm] = parse(start);
  const [ey, em] = end ? parse(end) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

/** Full years elapsed since 'YYYY-MM' (not inclusive). */
export function yearsSince(start: string, now: Date = new Date()): number {
  const [sy, sm] = parse(start);
  const months = (now.getFullYear() - sy) * 12 + (now.getMonth() + 1 - sm);
  return Math.max(0, Math.floor(months / 12));
}

export function pluralRu(n: number, forms: [string, string, string]): string {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

export function formatDuration(months: number, lang: Lang): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (lang === 'ru') {
    if (y) parts.push(`${y} ${pluralRu(y, ['год', 'года', 'лет'])}`);
    if (m) parts.push(`${m} мес.`);
  } else {
    if (y) parts.push(`${y} ${y === 1 ? 'yr' : 'yrs'}`);
    if (m) parts.push(`${m} ${m === 1 ? 'mo' : 'mos'}`);
  }
  return parts.join(' ');
}

export function formatMonth(ym: string, lang: Lang): string {
  const [y, m] = parse(ym);
  return `${MONTHS[lang][m - 1]} ${y}`;
}

export function formatPeriod(start: string, end: string | null, lang: Lang): string {
  return `${formatMonth(start, lang)} — ${end ? formatMonth(end, lang) : PRESENT[lang]}`;
}

/** Label next to a "N+" years stat. */
export function yearsLabel(n: number, lang: Lang, kind: 'career' | 'lead'): string {
  if (lang === 'ru') {
    const word = pluralRu(n, ['год', 'года', 'лет']);
    return kind === 'career' ? `${word} в коммерческой разработке` : `${word} руковожу бэкенд-командой`;
  }
  const word = n === 1 ? 'year' : 'years';
  return kind === 'career' ? `${word} of commercial development` : `${word} leading a backend team`;
}
