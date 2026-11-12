/* 青竹 — 没有依赖、没有构建。
   文章改 posts，碎片改 scraps，其余是让页面活起来的部分。 */

/* 文章列表：往数组里加一项，页面上就多一篇。
   模板（照抄一份改文字就行）：

   {
     id: 'my-first-post',          // 用于链接 #post-my-first-post，别和别的重复
     no: 1,                        // 显示用的序号
     date: '2026.11.12',           // 自己填的日期
     tag: '随笔',                  // 标签，要同时加进下面的 tags 数组才会出现在筛选栏
     minutes: 3,                   // 估计的阅读分钟数
     title: '文章标题',
     desc: '一句话摘要，显示在标题下面',
     body: ['第一段', '第二段', '想写几段写几段']
   },
*/
const posts = [];

const tags = ['随笔', '技术', '生活'];

/* 碎片：每项 { date: '11.12', text: '一句话' }，日期自己定 */
const scraps = [];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const pad2 = n => String(n).padStart(2, '0');
const pad4 = n => String(Math.round(n)).padStart(4, '0');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function setHash(id) {
  // file:// 下部分浏览器不允许 replaceState 改写完整 URL，失败就安静跳过
  try { history.replaceState(null, '', id ? '#post-' + id : location.href.split('#')[0]); } catch (_) {}
}

/* ---------- 主题 ---------- */
const THEME_KEY = 'jerry-theme';
try {
  const saved = localStorage.getItem(THEME_KEY);
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
} catch (_) { /* 隐私模式下忽略 */ }
$('#theme-toggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = next === 'dark' ? '#131316' : '#fbfaf7';
  readAccent();
});

/* ---------- 时间条 ---------- */
function isoWeek(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - y0) / 86400000 + 1) / 7);
}
function tick() {
  const now = new Date();
  $('#clock').textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const pct = (now - start) / (end - start) * 100;
  $('#year-pct').textContent = pct.toFixed(0) + '%';
  $('#year-bar').style.width = pct.toFixed(2) + '%';
  $('#week').textContent = pad2(isoWeek(now));
}
tick();
setInterval(tick, 1000);
$('#year').textContent = new Date().getFullYear();

/* ---------- 文章列表 ---------- */
const list = $('#post-list');
const search = $('#search');
const searchWrap = $('#search-wrap');
let activeTag = '全部';

$('#filters').innerHTML = tags.map(t => {
  const n = posts.filter(p => p.tag === t).length;
  return `<button type="button" data-tag="${t}" class="${t === activeTag ? 'is-active' : ''}">${t}<em>${pad2(n)}</em></button>`;
}).join('');

function haystack(p) {
  return [p.title, p.desc, p.tag, p.date, ...p.body].join(' ').toLowerCase();
}

function render() {
  const term = search.value.trim().toLowerCase();
  const visible = posts.filter(p => (activeTag === '全部' || p.tag === activeTag) && haystack(p).includes(term));
  list.innerHTML = visible.map(p => `
    <article class="post" id="post-${p.id}">
      <button class="post-head" type="button" aria-expanded="false" aria-controls="body-${p.id}">
        <span class="post-num">${String(p.no).padStart(3, '0')}</span>
        <span class="post-info">
          <span class="post-title">${esc(p.title)}</span>
          <span class="post-desc">${esc(p.desc)}</span>
        </span>
        <span class="post-meta"><b>${p.date}</b>${p.tag} · ${p.minutes} 分钟</span>
        <span class="post-arrow" aria-hidden="true">↗</span>
      </button>
      <div class="post-body" id="body-${p.id}" hidden></div>
    </article>
  `).join('');

  const count = $('#sec-count');
  count.textContent = posts.length === 0
    ? '随着风前行……'
    : (term || activeTag !== '全部'
      ? `${pad2(visible.length)} / ${pad2(posts.length)} 篇`
      : `${pad2(posts.length)} 篇 · 最后更新 ${posts[0].date}`);

  const empty = $('#empty');
  empty.hidden = visible.length > 0;
  if (!visible.length) {
    empty.textContent = posts.length === 0
      ? '暂无更新'
      : `「${search.value.trim()}」没搜到。这里一共 ${posts.length} 篇，清空关键词或者换个标签看看。`;
  }
  syncHash(visible);
}

function closePost(art) {
  art.classList.remove('is-open');
  $('.post-head', art).setAttribute('aria-expanded', 'false');
  $('.post-body', art).hidden = true;
}

function openPost(art, p, writeHash = true) {
  $$('.post.is-open', list).forEach(other => { if (other !== art) closePost(other); });
  art.classList.add('is-open');
  $('.post-head', art).setAttribute('aria-expanded', 'true');
  const body = $('.post-body', art);
  body.innerHTML = p.body.map(t => `<p>${esc(t)}</p>`).join('') +
    `<p class="post-foot">${p.date} · ${p.tag} · #post-${p.id} <a href="#post-${p.id}" data-copy>复制链接 ↗</a></p>`;
  body.hidden = false;
  const copy = $('[data-copy]', body);
  copy.addEventListener('click', async e => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(location.href.split('#')[0] + '#post-' + p.id);
      copy.textContent = '已复制 ✓';
    } catch (_) {
      copy.textContent = '按 Ctrl+C 复制地址栏';
    }
  });
  if (writeHash) setHash(p.id);
}

function syncHash(visible) {
  if (!location.hash.startsWith('#post-')) return;
  const id = location.hash.slice(6);
  const p = posts.find(x => x.id === id);
  if (!p || !visible.some(v => v.id === id)) {
    setHash(null);
    return;
  }
  const art = $('#post-' + id, list);
  if (art && !art.classList.contains('is-open')) openPost(art, p, false);
}

list.addEventListener('click', e => {
  const btn = e.target.closest('.post-head');
  if (!btn) return;
  const art = btn.closest('.post');
  const p = posts.find(x => x.id === art.id.replace('post-', ''));
  if (art.classList.contains('is-open')) {
    closePost(art);
    setHash(null);
  } else {
    openPost(art, p);
  }
});

$('#filters').addEventListener('click', e => {
  const btn = e.target.closest('[data-tag]');
  if (!btn) return;
  activeTag = btn.dataset.tag;
  $$('#filters button').forEach(b => b.classList.toggle('is-active', b === btn));
  render();
});

search.addEventListener('input', render);
window.addEventListener('hashchange', () => {
  // 普通锚点（#writing 等）不碰地址栏，只同步文章展开状态
  if (location.hash.startsWith('#post-') || !location.hash) render();
});

function openSearch() {
  searchWrap.classList.add('is-open');
  search.removeAttribute('tabindex');
  search.removeAttribute('aria-hidden');
  $('#search-toggle').setAttribute('aria-label', '关闭搜索');
  search.focus();
}
function closeSearch() {
  searchWrap.classList.remove('is-open');
  search.setAttribute('tabindex', '-1');
  search.setAttribute('aria-hidden', 'true');
  $('#search-toggle').setAttribute('aria-label', '打开搜索');
  if (search.value) { search.value = ''; render(); }
  search.blur();
}
$('#search-toggle').addEventListener('click', () => searchWrap.classList.contains('is-open') ? closeSearch() : openSearch());
document.addEventListener('click', e => {
  if (searchWrap.classList.contains('is-open') && !e.target.closest('#search-wrap') && !e.target.closest('#search-toggle')) closeSearch();
});
document.addEventListener('keydown', e => {
  if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
    e.preventDefault(); openSearch();
  } else if (e.key === 'Escape') {
    if (searchWrap.classList.contains('is-open')) closeSearch();
    else {
      const open = $('.post.is-open', list);
      if (open) { closePost(open); setHash(null); }
    }
  }
});

render();
if (location.hash.startsWith('#post-')) {
  const art = $(location.hash);
  if (art) setTimeout(() => art.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' }), 60);
}

/* ---------- 碎片 ---------- */
const grid = $('#scrap-grid');
if (scraps.length) {
  grid.innerHTML = scraps.map((s, i) => `
    <button class="scrap" type="button" aria-label="${esc(s.date)}：${esc(s.text)}">
      <span class="scrap-date">${esc(s.date)}</span>
      <span class="scrap-text">${esc(s.text)}</span>
      <span class="scrap-idx" aria-hidden="true">${pad2(i + 1)}</span>
    </button>
  `).join('');
} else {
  grid.innerHTML = '<div class="scrap-empty">碎片的位置也留好了，往 app.js 的 scraps 里加一条就有。</div>';
}

/* ---------- 背景场：探照灯 + 磁吸点阵 ---------- */
const canvas = $('#dots');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1, step = 80, points = [];
let accent = [53, 86, 212];
const pointer = { x: innerWidth * .72, y: innerHeight * .24 };
const smooth = { x: pointer.x, y: pointer.y };
let override = null;

function readAccent() {
  const v = getComputedStyle(root).getPropertyValue('--accent-rgb').trim().split(/[\s,]+/).map(Number);
  if (v.length === 3 && v.every(Number.isFinite)) accent = v;
}
function setFieldPos(x, y) {
  root.style.setProperty('--mx', x.toFixed(1) + 'px');
  root.style.setProperty('--my', y.toFixed(1) + 'px');
}
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  step = W < 700 ? 56 : 80;
  points = [];
  for (let x = 0; x <= W + step; x += step) {
    for (let y = 0; y <= H + step; y += step) points.push({ ox: x, oy: y, x, y, a: 0 });
  }
}

/* 签名：每个字拆开，跟着鼠标和一阵慢风轻轻飘 */
const sig = $('#signature');
let sigSpans = [], sigState = [];
if (sig) {
  sig.innerHTML = [...sig.textContent].map(c => `<span>${esc(c)}</span>`).join('');
  sigSpans = $$('.signature span');
  sigState = sigSpans.map(() => ({ x: 0, y: 0 }));
}

let fieldRunning = false;
function frame(now) {
  if (reduced.matches || W < 700) {
    ctx.clearRect(0, 0, W, H);
    fieldRunning = false;
    return;
  }
  const target = override || pointer;
  smooth.x += (target.x - smooth.x) * .13;
  smooth.y += (target.y - smooth.y) * .13;
  ctx.clearRect(0, 0, W, H);
  const R = W < 700 ? 155 : 215;
  const [r, g, b] = accent;
  for (const p of points) {
    const dx = p.ox - smooth.x, dy = p.oy - smooth.y;
    const d = Math.hypot(dx, dy);
    const t = Math.max(0, 1 - d / R);
    const ease = t * t;
    const push = ease * 14;
    const tx = p.ox + (d > .001 ? dx / d * push : 0);
    const ty = p.oy + (d > .001 ? dy / d * push : 0);
    p.x += (tx - p.x) * .12;
    p.y += (ty - p.y) * .12;
    const targetA = .045 + ease * .6;
    p.a += (targetA - p.a) * .12;
    if (p.a > .02) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1 + ease * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.a.toFixed(3)})`;
      ctx.fill();
    }
  }
  ctx.beginPath();
  ctx.arc(smooth.x, smooth.y, 2.4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},.7)`;
  ctx.fill();

  if (sigSpans.length) {
    const t = now / 1000;
    const rects = sigSpans.map(s => s.getBoundingClientRect());
    sigSpans.forEach((s, i) => {
      const rect = rects[i];
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const dx = (cx - smooth.x) / W, dy = (cy - smooth.y) / H;
      const tx = dx * 16 + Math.sin(t * 1.1 + i * .7) * 2.4;
      const ty = dy * 11 + Math.sin(t * .9 + i * .9) * 1.8;
      const st = sigState[i];
      st.x += (tx - st.x) * .07;
      st.y += (ty - st.y) * .07;
      s.style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px) rotate(${(st.x * .35).toFixed(2)}deg)`;
    });
  }
  requestAnimationFrame(frame);
}

function startField() {
  if (fieldRunning || reduced.matches || W < 700) return;
  fieldRunning = true;
  requestAnimationFrame(frame);
}
readAccent();
resize();
window.addEventListener('resize', () => { resize(); startField(); }, { passive: true });
reduced.addEventListener('change', () => { if (!reduced.matches) startField(); });
startField();

document.addEventListener('pointermove', e => {
  if (reduced.matches || e.pointerType === 'touch') return;
  pointer.x = e.clientX; pointer.y = e.clientY;
  $('#hud-pos').textContent = `X ${pad4(e.clientX)} · Y ${pad4(e.clientY)}`;
  if (!override) setFieldPos(e.clientX, e.clientY);
}, { passive: true });

/* 碎片与背景联动：鼠标停在格子上，探照灯与点阵吸附到格子中心 */
grid.addEventListener('pointerover', e => {
  if (reduced.matches) return;
  const cell = e.target.closest('.scrap');
  if (!cell) return;
  const r = cell.getBoundingClientRect();
  override = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  setFieldPos(override.x, override.y);
  const idx = $$('.scrap', grid).indexOf(cell) + 1;
  $('#hud-state').textContent = 'LOCK ' + pad2(idx);
  $('#hud-pos').textContent = `X ${pad4(override.x)} · Y ${pad4(override.y)}`;
});
grid.addEventListener('pointerleave', () => {
  override = null;
  setFieldPos(pointer.x, pointer.y);
  $('#hud-state').textContent = 'READY';
});

/* ---------- 阅读进度 & 导航高亮 ---------- */
const bar = $('#read-progress');
let scrollQueued = false;
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
  });
}, { passive: true });

if ('IntersectionObserver' in window) {
  const links = $$('.nav a');
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id));
    }
  }, { rootMargin: '-25% 0px -65% 0px' });
  ['writing', 'scraps', 'about'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
}
