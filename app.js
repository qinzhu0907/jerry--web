// 示例文章：修改这里的标题、分类、日期和正文，即可更新博客。
const posts = [
  { date: '2026.11.06', category: '小王说', title: '变形记', description: '在不断向前的日子里，试着为自己保留一段不被安排的时间。', content: ['今天是11月8日，也是你成为小猪佩奇的日子，你十分忐忑，我也十分激动。在这一天，你终于变成了小猪佩奇！让我们敲锣打鼓来庆祝你成为了小猪佩奇......忽然天空划出了一道裂缝，神的威严之声：你作为小猪佩奇的转世，应经历九九八十一难，方可成神。我派孙悟空随你修行，途中你会遇见唐僧，而你从此更名为猪八戒'] },
  { date: '2026.10.28', category: '创作', title: '从一个小想法开始', description: '不必等到一切准备就绪，先做出一个可以继续改进的版本。', content: ['很多事情开始时都很模糊。与其花很长时间寻找完美的起点，不如先留下一个粗糙的轮廓。', '当想法变得可以看见、可以触摸，就更容易知道下一步要做什么。小小的进展，会为后面的探索留下一条路径。'] },
  { date: '2026.10.15', category: '生活', title: '最近喜欢的一些小事', description: '窗边的光、路上的风，还有那些容易被忽略的平常时刻。', content: ['生活里值得记住的瞬间，往往没有特别响亮的名字。它们可能是一顿简单的早餐，也可能是傍晚路过的一扇亮着灯的窗。', '把它们写下来，并不是为了证明今天有多特别，而是提醒自己：平常的日子也值得被认真对待。'] },
  { date: '2026.09.30', category: '思考', title: '关于持续学习的一点记录', description: '比起追赶所有新东西，更重要的是找到适合自己的节奏。', content: ['学习并不总是一条笔直向上的线。有时需要反复回到同一个问题，有时又会因为一次偶然的发现豁然开朗。', '不妨把注意力放在真正好奇的地方。留下笔记，允许自己暂时不懂，然后在下一次相遇时继续往前走。'] }
];
const list = document.querySelector('#posts');
const search = document.querySelector('#search');
const dialog = document.querySelector('#article-dialog');
let filter = '全部';
function render() {
  const term = search.value.trim().toLowerCase();
  const visible = posts.filter(post => (filter === '全部' || post.category === filter) && [post.title, post.description, post.category, ...post.content].join(' ').toLowerCase().includes(term));
  list.replaceChildren();
  visible.forEach(post => {
    const button = document.createElement('button');
    button.className = 'post';
    const date = document.createElement('span'); date.className = 'post-date'; date.textContent = post.date;
    const info = document.createElement('span');
    const title = document.createElement('span'); title.className = 'post-title'; title.style.display = 'block'; title.textContent = post.title;
    const desc = document.createElement('span'); desc.className = 'post-desc'; desc.textContent = post.description;
    info.append(title, desc);
    const category = document.createElement('span'); category.className = 'post-category'; category.textContent = ' /  ' + post.category;
    const arrow = document.createElement('span'); arrow.className = 'post-arrow'; arrow.textContent = '↗';
    button.append(date, info, category, arrow);
    button.addEventListener('click', () => openPost(post));
    list.append(button);
  });
  document.querySelector('#empty').hidden = visible.length > 0;
}
function openPost(post) {
  const article = document.querySelector('#article-body'); article.replaceChildren();
  const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = post.date + '  /  ' + post.category;
  const title = document.createElement('h2'); title.textContent = post.title;
  article.append(meta, title);
  post.content.forEach(text => { const p = document.createElement('p'); p.textContent = text; article.append(p); });
  const end = document.createElement('p'); end.className = 'article-end'; end.textContent = '✳  感谢阅读'; article.append(end);
  dialog.showModal();
}
document.querySelector('#total-count').textContent = String(posts.length).padStart(2, '0');
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button)); render(); }));
search.addEventListener('input', render);
document.querySelector('#search-toggle').addEventListener('click', () => { document.querySelector('#writing').scrollIntoView(); search.focus({preventScroll:true}); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
render();
