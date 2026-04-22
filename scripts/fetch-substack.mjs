import fs from 'node:fs';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const HEADERS = { 'User-Agent': UA, 'Accept': '*/*' };
const FEED_URL = 'https://aiedlab.substack.com/feed';
const API_URL = 'https://aiedlab.substack.com/api/v1/posts?limit=15';

const stripHtml = (s) =>
  s.replace(/<[^>]*>/g, '').replace(/&[#a-z0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const stripCdata = (s) => s.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1').trim();

function normalize(posts) {
  return posts
    .filter((p) => p.title && p.link)
    .map((p) => ({
      title: p.title.trim(),
      link: p.link.trim(),
      date: p.date || '',
      summary: (p.summary || '').slice(0, 120),
      image: p.image || null,
    }));
}

function fromSubstackApi(posts) {
  return normalize(
    posts.map((p) => ({
      title: p.title,
      link: p.canonical_url,
      date: p.post_date,
      summary: p.subtitle || p.description || '',
      image: p.cover_image || null,
    }))
  );
}

function parseRss(xml) {
  const items = [];
  const matches = xml.match(/<item\b[\s\S]*?<\/item>/g) || [];
  for (const item of matches.slice(0, 15)) {
    const get = (tag) => {
      const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m ? stripCdata(m[1]) : '';
    };
    const enclosure = item.match(/<enclosure[^>]*url="([^"]+)"/);
    items.push({
      title: get('title'),
      link: get('link'),
      date: get('pubDate'),
      summary: stripHtml(get('description')),
      image: enclosure ? enclosure[1] : null,
    });
  }
  return normalize(items);
}

async function trySubstackApi() {
  const r = await fetch(API_URL, { headers: HEADERS });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const posts = await r.json();
  if (!Array.isArray(posts) || !posts.length) throw new Error('empty');
  return fromSubstackApi(posts);
}

async function trySubstackRss() {
  const r = await fetch(FEED_URL, { headers: HEADERS });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const xml = await r.text();
  const posts = parseRss(xml);
  if (!posts.length) throw new Error('empty');
  return posts;
}

async function tryRss2Json() {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  if (d.status !== 'ok' || !d.items?.length) throw new Error('empty');
  return normalize(
    d.items.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      summary: stripHtml(item.description || ''),
      image: item.thumbnail || item.enclosure?.link || null,
    }))
  );
}

async function tryAllOriginsRss() {
  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED_URL)}`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const xml = await r.text();
  const posts = parseRss(xml);
  if (!posts.length) throw new Error('empty');
  return posts;
}

const sources = [
  ['substack-api', trySubstackApi],
  ['substack-rss', trySubstackRss],
  ['rss2json', tryRss2Json],
  ['allorigins-rss', tryAllOriginsRss],
];

for (const [name, fn] of sources) {
  try {
    const posts = await fn();
    fs.mkdirSync('.cache', { recursive: true });
    fs.writeFileSync('.cache/substack.json', JSON.stringify(posts, null, 2));
    console.log(`✓ Saved ${posts.length} posts via ${name}`);
    process.exit(0);
  } catch (e) {
    console.warn(`✗ ${name} failed: ${e.message}`);
  }
}

console.error('All 4 sources failed — Substack cache not updated');
process.exit(1);
