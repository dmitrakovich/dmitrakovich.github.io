import type { Lang } from '../data/resume';
import { formatDuration, monthsBetween, yearsLabel, yearsSince } from '../lib/dates';

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const lang = (document.querySelector<HTMLElement>('main[data-lang]')?.dataset.lang ?? 'ru') as Lang;

const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

/* ---------- Theme ---------- */
function currentTheme(): 'light' | 'dark' {
  const forced = root.dataset.theme;
  if (forced === 'light' || forced === 'dark') return forced;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.classList.add('theme-switching');
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage unavailable — theme still switches for this visit */
  }
  window.setTimeout(() => root.classList.remove('theme-switching'), 400);
});

/* ---------- Fresh durations (the page is static, time is not) ---------- */
$$('[data-duration]').forEach((el) => {
  const { start, end } = el.dataset;
  if (start) el.textContent = formatDuration(monthsBetween(start, end || null), lang);
});
$$('[data-years-since]').forEach((el) => {
  const min = Number(el.dataset.min ?? 0);
  el.textContent = String(Math.max(min, yearsSince(el.dataset.yearsSince!)));
});
$$('[data-years-label]').forEach((el) => {
  const kind = el.dataset.yearsLabel as 'career' | 'lead';
  const n = Math.max(kind === 'lead' ? 1 : 0, yearsSince(el.dataset.since!));
  el.textContent = yearsLabel(n, lang, kind);
});

/* ---------- Intro ---------- */
requestAnimationFrame(() => root.classList.add('is-loaded'));

/* ---------- Reveal on scroll ---------- */
const revealEls = $$('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- Rotating role ---------- */
const typed = document.querySelector<HTMLElement>('[data-rotate]');
if (typed && !reduceMotion) {
  const words = [typed.textContent ?? '', ...JSON.parse(typed.dataset.rotate ?? '[]')] as string[];
  let index = 0;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  (async () => {
    await sleep(2600);
    for (;;) {
      const current = words[index];
      for (let i = current.length; i >= 0; i--) {
        typed.textContent = current.slice(0, i);
        await sleep(28);
      }
      index = (index + 1) % words.length;
      const next = words[index];
      await sleep(220);
      for (let i = 1; i <= next.length; i++) {
        typed.textContent = next.slice(0, i);
        await sleep(55 + Math.random() * 45);
      }
      await sleep(index === 0 ? 3200 : 1900);
    }
  })();
}

/* ---------- Code typing ---------- */
const codeBody = document.querySelector<HTMLElement>('[data-typing]');
if (codeBody && !reduceMotion) {
  const pre = codeBody.querySelector('pre');
  if (pre) {
    codeBody.style.minHeight = `${codeBody.offsetHeight}px`;
    const walker = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT);
    const nodes: { node: Text; text: string }[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      nodes.push({ node, text: node.data });
      node.data = '';
    }
    const caret = document.createElement('span');
    caret.className = 'caret caret--code';
    codeBody.classList.add('is-typing');

    let ni = 0;
    let ci = 0;
    const step = () => {
      let budget = 2;
      while (budget > 0 && ni < nodes.length) {
        const { node, text } = nodes[ni];
        if (ci === 0) node.parentNode?.insertBefore(caret, node.nextSibling);
        if (ci < text.length) {
          const ch = text[ci++];
          node.data += ch;
          if (ch.trim()) budget--;
        } else {
          ni++;
          ci = 0;
        }
      }
      if (ni < nodes.length) {
        window.setTimeout(step, 16);
      } else {
        pre.appendChild(caret);
        codeBody.classList.remove('is-typing');
      }
    };
    window.setTimeout(step, 900);
  }
}

/* ---------- Pointer effects ---------- */
if (finePointer && !reduceMotion) {
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 3;
  let frame = 0;
  const hero = document.querySelector<HTMLElement>('.hero');
  const parallax = $$('[data-parallax]');

  const paint = () => {
    frame = 0;
    root.style.setProperty('--sx', `${px}px`);
    root.style.setProperty('--sy', `${py}px`);
    if (hero && window.scrollY < window.innerHeight) {
      const dx = px / window.innerWidth - 0.5;
      const dy = py / window.innerHeight - 0.5;
      parallax.forEach((el) => {
        const f = Number(el.dataset.parallax ?? 1);
        el.style.setProperty('--px', `${(-dx * 14 * f).toFixed(2)}px`);
        el.style.setProperty('--py', `${(-dy * 14 * f).toFixed(2)}px`);
      });
    }
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      px = e.clientX;
      py = e.clientY;
      const card = (e.target as Element | null)?.closest<HTMLElement>('.glow-card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      if (!frame) frame = requestAnimationFrame(paint);
    },
    { passive: true },
  );
  root.classList.add('has-pointer');
}

/* ---------- Scroll: progress bar, nav state, timeline ---------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const timeline = document.querySelector<HTMLElement>('[data-timeline]');
const timelineFill = timeline?.querySelector<HTMLElement>('.timeline__fill');
const timelineNodes = timeline ? $$('.timeline__node', timeline) : [];
let ticking = false;

const onScroll = () => {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  progress?.style.setProperty('--p', String(max > 0 ? y / max : 0));
  nav?.classList.toggle('is-scrolled', y > 12);

  if (timeline && timelineFill) {
    const r = timeline.getBoundingClientRect();
    const mark = vh * 0.62;
    const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
    timelineFill.style.setProperty('--p', String(reduceMotion ? 1 : p));
    timelineNodes.forEach((n) => n.classList.toggle('is-active', n.getBoundingClientRect().top < mark));
  }
};
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* ---------- Active nav link ---------- */
const links = new Map($$<HTMLAnchorElement>('[data-nav-link]').map((a) => [a.dataset.navLink!, a]));
if ('IntersectionObserver' in window) {
  const navIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        const id = entry.target.id === 'recommendation' ? 'projects' : entry.target.id;
        links.get(id)?.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  $$('main section[id]').forEach((s) => navIo.observe(s));
}

/* ---------- "Show more" in roles ---------- */
$$<HTMLButtonElement>('[data-toggle-more]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const list = btn.previousElementSibling as HTMLElement | null;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    list?.classList.toggle('is-expanded', open);
    btn.textContent = (open ? btn.dataset.less : btn.dataset.more) ?? '';
  });
});

/* ---------- PDF (print) ---------- */
$$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
