/* Jerry — 没有依赖、没有构建。
   文章改 posts，碎片改 scraps，其余是让页面活起来的部分。 */

const posts = [
  {
    id: 'delete-the-template', no: 1, date: '2026.11.10', tag: '改版', minutes: 4,
    title: '把模板博客删干净以后',
    desc: '上一版有四篇示例文章、三处占位文案和一张外链图片。删掉之后，页面反而像个页面了。',
    body: [
      '我把上一版的四篇示例文章数了一遍：标题是「给忙碌的日子留下一点空白」「从一个小想法开始」，正文里还留着一句「这是一篇示例文章，你可以在 app.js 中替换成自己的第一篇记录」。日期排得很整齐，11.06、10.28、10.15、09.30，一看就是编的。',
      '一开始以为是配色的问题。换了字体，调了留白，还是不对。后来想明白，毛病不在好不好看，在每句话都不指向任何东西。「A PERSONAL SPACE ON THE INTERNET」「把想法写下来，让生活慢慢展开」—— 语法挑不出错，但没有一条能被验证。人写东西会顺手带上时间、文件名和踩过的坑，模板不会。',
      '所以这次先删内容，再谈设计。删掉外链的 Unsplash 照片（断网就是一块灰），删掉滚动的装饰符号条，删掉「这里的名称和介绍是示例」，删掉弹窗（文章没有地址，一刷新就没了）。剩下的位置换成具体的事：哪天改了什么、为什么改、哪一步没做成。',
      '改完最明显的变化不是视觉，是终于敢把链接发给别人了。',
      '判断一段文案像不像机器写的，有个笨办法：把主语换成任何一个陌生人，句子依然成立，那它多半没有在写你。'
    ]
  },
  {
    id: 'mouse-grid', no: 2, date: '2026.11.10', tag: '前端', minutes: 5,
    title: '一层跟着鼠标走的网格',
    desc: 'radial-gradient 当遮罩，两个 CSS 变量就够了；再加一层 canvas 点阵做磁吸。',
    body: [
      '看到 xuyi.dev 那层背景时印象很深：鼠标一动，附近那片格子就亮起来，交点上还有蓝色的小十字。翻了下 CSS，比想象中简单。两层同样的网格，上面那层套一个 radial-gradient 当 mask，圆心位置用两个 CSS 变量 --mx / --my，pointermove 时改这两个值就行。',
      '底层线压到 4.5% 透明度，探照灯那层给到 20%，再叠一张 80×80 的 SVG 画准星。整页只有一个 fixed 容器，不占文档流，pointer-events 关掉也不影响点击。用 mask 比用 ::before 盖一层渐变划算：不需要额外元素，滚动时也不会错位。',
      '我多加了一层 canvas。网格交点上画点，鼠标靠近 210px 以内会被往外推，越近推得越远、点越大越亮，鼠标离开再用 lerp 慢慢弹回去。点数按屏宽算，1440 的窗口大概 250 个，每帧就是 250 次 arc，比一般粒子效果轻得多。',
      '边角必须处理干净：devicePixelRatio 不管会糊；resize 要重建点阵；切主题要重读 --accent-rgb；prefers-reduced-motion 打开时整套动画停掉；屏幕窄于 700px 就把格子从 80px 收到 56px，并把点阵关掉。',
      '效果是有了，但克制比炫技重要。这层东西任何时候都不能抢正文，所以透明度一直压得很低，也没给它加会流动的颜色渐变。'
    ]
  },
  {
    id: 'no-more-dialog', no: 3, date: '2026.11.09', tag: '前端', minutes: 3,
    title: '文章不该只能弹窗打开',
    desc: '旧版点标题弹一个 dialog，链接没法复制，刷新就回到列表。',
    body: [
      '旧版点标题弹一个 <dialog>，看着挺利落，用起来有三个问题：没有 URL，不能把某一篇发给别人；刷新就回到列表，读到哪全丢了；页内查找和搜索引擎都对弹出来的内容没办法。',
      '换成内联展开加 hash。每篇文章有自己的 id="post-xxx"，展开时用 history.replaceState 把地址写进地址栏，页面加载时读 location.hash 自动展开并滚过去。没有后端，没有路由库，一个 hashchange 监听就够。',
      '顺手把无障碍补上：标题是真正的 button，aria-expanded 跟着状态走，aria-controls 指向正文容器，Esc 收起，斜杠键直接聚焦搜索。这几样在弹窗版本里一个都没有。',
      '还有个小决定：同时只展开一篇。列表不会越点越长，也不用记哪个还开着。像翻书，不像开标签页。'
    ]
  },
  {
    id: 'edge-screenshot', no: 4, date: '2026.11.08', tag: '工具', minutes: 3,
    title: '用 Edge 给自己截两张图',
    desc: '桌面 1440、手机 390，顺手查横向溢出和 JS 报错。',
    body: [
      '静态页面最容易翻车的地方是手机：一条没折回去的长单词，就够让整页横向滚动。与其肉眼猜，不如每次改完让浏览器自己跑一遍。',
      '本机装了 Edge，就不必再下 Chromium。Playwright 里 executable_path 指到 msedge.exe，headless 起两个 viewport，1440×900 和 390×844，full_page 各截一张图。',
      '顺手断言几件事：document.documentElement.scrollWidth 有没有大于 innerWidth、有没有 pageerror、筛选后条数对不对、搜不到东西时提示是否出现、点开文章再关掉是否正常。这些比盯着截图看可靠。',
      '脚本二十几行，改版那天它抓到了两个我完全没注意到的问题：移动端日期列把文章标题挤出网格，以及一处 CSS 变量在暗色主题下没覆盖。',
      '截图还是要看。数字能证明没坏，证明不了顺眼。'
    ]
  },
  {
    id: 'system-fonts', no: 5, date: '2026.11.07', tag: '前端', minutes: 3,
    title: '系统字体就够用了',
    desc: '不加载 web font，首屏少一个请求，超大字标也不会突然跳一下。',
    body: [
      '上一版标题用 Georgia 配宋体，正文 Arial 加微软雅黑，其实都是系统字体；真正额外请求的只有那张外链照片。这一版干脆一个外部资源都不留。',
      '衬线栈按中英文分别回退：Newsreader、Iowan Old Style 给英文，Songti SC、STSong、SimSun、Noto Serif CJK SC 给中文，最后 Georgia 兜底。Windows 上中文会落到 SimSun，笔画偏细，所以大标题字号要往上给一点，字重保持 400，不要加粗。',
      '小字全部用等宽：日期、编号、坐标、时间条。数字等宽之后，实时钟走动时不会左右抖。这是很廉价但一眼能感觉到的一处体面。',
      '不加载 web font 省掉的不只是请求，还有 FOUT —— 字体到位前那一跳，放在两百像素的字标上特别难看。断网打开时，这个站和联网时一模一样。'
    ]
  },
  {
    id: 'tiny-search', no: 6, date: '2026.11.06', tag: '工具', minutes: 3,
    title: '搜索框只要二十行',
    desc: '标题、摘要、标签、正文拼成一个字符串，剩下的交给 filter。',
    body: [
      '文章总量还是个位数，引搜索库没有意义。把标题、摘要、标签、正文拼成一个字符串，toLowerCase 之后 includes，就够了。',
      '筛选和搜索是叠加的，不是二选一；结果数实时写在「写过的东西」旁边。搜不到时不写「未找到相关内容」那种系统腔，直接说清搜的是什么、一共有几篇、怎么把关键词清掉。',
      '斜杠键聚焦搜索，Esc 清空并收起，输入框失焦且为空时自动合上，免得顶栏一直挂个空框。移动端把搜索框浮在顶栏下方，不去挤导航。',
      '搜索框最容易做错的是抢焦点：一进页面就 focus，手机会立刻弹出键盘。这里默认 tabindex="-1" 且 aria-hidden，展开时才放开。'
    ]
  },
  {
    id: 'two-hyphens', no: 7, date: '2026.11.05', tag: '闲话', minutes: 3,
    title: '仓库为什么有两个连字符',
    desc: 'jerry--web。创建时手抖，后来一直没改。',
    body: [
      '仓库叫 jerry--web。创建的时候多敲了一个连字符，后来一直没改，因为一改旧链接就得全部失效。',
      '这次打开仓库还发现一件事：README 写的是「游享 · 游戏福利指南」，讲 Cloudflare Pages、D1 数据库、管理员登录；根目录里躺的却是 index.html、style.css、app.js 三个静态文件，一个博客。两边完全不是同一个项目。',
      '大概是某次往里塞东西时只覆盖了页面文件，忘了文档。这种残留比 bug 更难发现，因为它不影响运行，只会让下一个人（包括三个月后的自己）看不懂。',
      '所以这次是清空再推，不是覆盖。四个旧文件连同那份 README 一起删掉，重新提交一份对得上的说明。',
      '顺带记一下：GitHub 仓库名不区分大小写但区分连字符。找不到的第一反应应该是列一遍自己的仓库，而不是怀疑权限出了问题。'
    ]
  }
];

const scraps = [
  { date: '11.10', text: '把 style.css 重写了一遍，装饰符号一个没留。' },
  { date: '11.09', text: 'mask-image 比盖一层渐变便宜，滚动也不会错位。' },
  { date: '11.09', text: '文章换成 hash 之后，终于能把链接发给别人了。' },
  { date: '11.08', text: 'Edge headless 截图比想象中稳，不用另外装 Chromium。' },
  { date: '11.08', text: '旧 README 写的是游戏福利站，代码却是博客。' },
  { date: '11.07', text: 'Windows 上中文衬线只有 SimSun，字号得放大一点。' },
  { date: '11.07', text: '试过给网格加噪点，太脏，撤了。' },
  { date: '11.06', text: 'prefers-reduced-motion 不是可选项，是默认值之一。' },
  { date: '11.06', text: '把本地时间放上首页，比写一段「关于我」诚实。' },
  { date: '11.05', text: '删掉了滚动装饰条。它除了晃眼没有别的用处。' },
  { date: '11.05', text: '主题存 localStorage 就够，别为这个上 cookie。' },
  { date: '11.04', text: '决定不加载任何外部图片。断网也要能看。' }
];

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
const tags = ['全部', '改版', '前端', '工具', '闲话'];
let activeTag = '全部';

$('#filters').innerHTML = tags.map(t => {
  const n = t === '全部' ? posts.length : posts.filter(p => p.tag === t).length;
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
  count.textContent = term || activeTag !== '全部'
    ? `${pad2(visible.length)} / ${pad2(posts.length)} 篇`
    : `${pad2(posts.length)} 篇 · 最后更新 ${posts[0].date}`;

  const empty = $('#empty');
  empty.hidden = visible.length > 0;
  if (!visible.length) {
    empty.textContent = term
      ? `「${search.value.trim()}」没搜到。这里一共 ${posts.length} 篇，清空关键词或者换个标签看看。`
      : '这个标签下还没有东西。';
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
$('#scrap-grid').innerHTML = scraps.map((s, i) => `
  <button class="scrap" type="button" aria-label="${s.date}：${s.text}">
    <span class="scrap-date">${s.date}</span>
    <span class="scrap-text">${s.text}</span>
    <span class="scrap-idx" aria-hidden="true">${pad2(i + 1)}</span>
  </button>
`).join('');

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
let fieldRunning = false;
function frame() {
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
const grid = $('#scrap-grid');
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
