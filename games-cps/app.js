const $ = (selector) => document.querySelector(selector);
const state = { lang: "zh", category: "all", games: [], isAdmin: false };
const copy = {
 zh: {navGames:"游戏优惠",navAbout:"关于本站",adminLogin:"管理员登录",eyebrow:"你的下一款心头好",heroTitle:'好游戏，<span class="text-accent">好折扣。</span>',heroDescription:"发现精选手游优惠、专属推广活动与实用玩法介绍。轻松找到适合你的下一场冒险。",browseDeals:"浏览游戏优惠",disclosure:"优惠详情以游戏官方及活动页面为准",statOneTitle:"精选游戏",statOneSub:"Curated games",statTwoTitle:"优惠一站看",statTwoSub:"Offers in one place",statThreeTitle:"直达活动页",statThreeSub:"Direct offer links",collectionKicker:"THE COLLECTION",gamesTitle:"游戏优惠",gamesSubtitle:"浏览游戏介绍，找到适合自己的活动。",searchPlaceholder:"搜索游戏名称…",resultsLabel:"款游戏",liveLabel:"优惠信息以详情页为准",emptyTitle:"游戏正在准备中",emptyDescription:"请稍后再来看看，或使用搜索框查找其他游戏。",noResultsTitle:"没有找到匹配的游戏",noResultsDescription:"试试其他关键词或切换分类。",aboutKicker:"ABOUT PLAYPERKS",aboutTitle:"让寻找游戏优惠更简单",aboutDescription:"我们整理游戏介绍与活动入口，帮助玩家快速了解游戏和优惠信息。部分链接可能是推广链接；当你通过这些链接访问或购买时，本站运营者可能获得佣金，你的价格通常不会因此增加。",footerText:"独立游戏优惠导航 · 优惠规则以官方页面为准",footerAbout:"推广说明",adminTitle:"管理游戏",adminIntro:"登录后可以添加、编辑、下架或删除游戏。",passwordLabel:"管理员密码",loginButton:"安全登录",securityNote:"首次使用前，请在 Cloudflare Pages 中设置管理员密码和会话密钥。",dashboardTitle:"游戏管理",logout:"退出登录",dashboardIntro:"内容保存后会立即更新网站；GitHub/Cloudflare 部署无需重新构建。",addGame:"添加游戏",nameZh:"游戏名称（中文）*",nameEn:"游戏名称（英文）*",category:"分类*",platform:"平台",discount:"折扣标题*",summaryZh:"游戏简介（中文）*",summaryEn:"游戏简介（英文）*",gameplayZh:"玩法介绍（中文）",gameplayEn:"玩法介绍（英文）",terms:"折扣规则 / 注意事项",imageUrl:"游戏封面图片 URL（可选）",promoUrl:"CPS 推广链接*",featured:"设为精选",active:"公开显示",cancelEdit:"清空表单",saveGame:"保存游戏",edit:"编辑",delete:"删除",activeStatus:"已公开",hiddenStatus:"已下架",featuredBadge:"精选",details:"查看详情",claim:"领取优惠",allCategories:"全部游戏",noDescription:"暂无介绍",loginFailed:"登录失败，请检查密码或 Cloudflare 环境变量。",loadFailed:"暂时无法加载游戏数据，请稍后重试。",saveFailed:"保存失败，请检查必填内容和数据库配置。",saved:"已保存。",deleted:"已删除。",confirmDelete:"确定要删除这款游戏吗？此操作无法撤销。",loggedOut:"已退出登录。",detailGameplay:"玩法介绍",detailTerms:"优惠规则与注意事项",detailPlatform:"平台",detailCategory:"分类",detailDisclosure:"这是推广链接。打开后请以活动页面的最终价格、资格和规则为准。",back:"返回游戏列表",adminEmpty:"还没有游戏，请使用下方表单添加。",noResults:"暂无游戏"}, 
 en: {navGames:"Game deals",navAbout:"About",adminLogin:"Admin login",eyebrow:"YOUR NEXT FAVORITE GAME",heroTitle:'Great games, <span class="text-accent">better deals.</span>',heroDescription:"Explore mobile game offers, exclusive promotions and useful gameplay guides. Find your next adventure with confidence.",browseDeals:"Browse game deals",disclosure:"Offer details are subject to official campaign pages",statOneTitle:"Curated games",statOneSub:"Hand-picked titles",statTwoTitle:"Offers in one place",statTwoSub:"Less searching, more playing",statThreeTitle:"Direct offer links",statThreeSub:"Go to campaign pages",collectionKicker:"THE COLLECTION",gamesTitle:"Game deals",gamesSubtitle:"Explore game guides and find an offer that fits you.",searchPlaceholder:"Search games…",resultsLabel:"games",liveLabel:"See each offer page for current terms",emptyTitle:"Games are coming soon",emptyDescription:"Check back soon, or use search to explore the collection.",noResultsTitle:"No matching games",noResultsDescription:"Try another keyword or choose a different category.",aboutKicker:"ABOUT PLAYPERKS",aboutTitle:"Game deals, made simpler",aboutDescription:"We organize game guides and offer links to help players understand each title and its promotions. Some links may be affiliate links. If you visit or purchase through them, the site operator may earn a commission, usually at no extra cost to you.",footerText:"Independent game-deal directory · Official offer terms apply",footerAbout:"Affiliate disclosure",adminTitle:"Manage games",adminIntro:"Sign in to add, edit, unpublish or delete games.",passwordLabel:"Admin password",loginButton:"Sign in securely",securityNote:"Before first use, set an admin password and session secret in Cloudflare Pages.",dashboardTitle:"Game management",logout:"Log out",dashboardIntro:"Saved changes update the site immediately; no rebuild is required.",addGame:"Add a game",nameZh:"Game name (Chinese)*",nameEn:"Game name (English)*",category:"Category*",platform:"Platforms",discount:"Offer headline*",summaryZh:"Summary (Chinese)*",summaryEn:"Summary (English)*",gameplayZh:"Gameplay (Chinese)",gameplayEn:"Gameplay (English)",terms:"Offer terms / notes",imageUrl:"Cover image URL (optional)",promoUrl:"CPS promotion URL*",featured:"Feature this game",active:"Publicly visible",cancelEdit:"Clear form",saveGame:"Save game",edit:"Edit",delete:"Delete",activeStatus:"Published",hiddenStatus:"Unpublished",featuredBadge:"Featured",details:"View details",claim:"View offer",allCategories:"All games",noDescription:"No description yet",loginFailed:"Login failed. Check your password and Cloudflare environment variables.",loadFailed:"Could not load games. Please try again.",saveFailed:"Save failed. Check required fields and database configuration.",saved:"Saved.",deleted:"Deleted.",confirmDelete:"Delete this game? This action cannot be undone.",loggedOut:"You have been logged out.",detailGameplay:"Gameplay",detailTerms:"Offer terms & notes",detailPlatform:"Platforms",detailCategory:"Category",detailDisclosure:"This is a promotional link. Confirm final pricing, eligibility and terms on the campaign page.",back:"Back to games",adminEmpty:"No games yet. Add one using the form below.",noResults:"No games available"}
};
const t = (key) => copy[state.lang][key] || copy.zh[key] || key;
const safeUrl = (value) => { try { const url = new URL(value); return ["https:","http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; } };
const esc = (value = "") => String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const textFor = (game, key) => state.lang === "zh" ? (game[key+"Zh"] || game[key+"En"] || "") : (game[key+"En"] || game[key+"Zh"] || "");
function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => { const key=el.dataset.i18n; if(copy[state.lang][key]) el.innerHTML=copy[state.lang][key]; });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { const key=el.dataset.i18nPlaceholder; el.placeholder=t(key); });
  $("#languageToggle").textContent = state.lang === "zh" ? "EN" : "中文";
  renderFilters(); renderGames(); if(state.isAdmin) renderAdminList();
}
function categories() { return [...new Set(state.games.filter(g=>g.active).map(g=>g.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b)); }
function renderFilters() {
 const items=[["all",t("allCategories")],...categories().map(c=>[c,c])];
 $("#filters").innerHTML=items.map(([value,label])=>'<button class="filter-button '+(state.category===value?"active":"")+'" type="button" data-category="'+esc(value)+'">'+esc(label)+'</button>').join("");
}
function renderGames() {
 const q=$("#searchInput").value.trim().toLocaleLowerCase();
 const visible=state.games.filter(g=>g.active && (state.category==="all"||g.category===state.category) && [g.nameZh,g.nameEn,g.category,g.discount,g.summaryZh,g.summaryEn].join(" ").toLocaleLowerCase().includes(q));
 $("#resultsCount").textContent=String(visible.length);
 $("#emptyState").hidden=state.games.some(g=>g.active);
 $("#noResults").hidden=visible.length>0 || !state.games.some(g=>g.active);
 $("#gamesGrid").innerHTML=visible.map(g=>{
  const img=safeUrl(g.imageUrl);
  const name=state.lang==="zh"?(g.nameZh||g.nameEn):(g.nameEn||g.nameZh);
  const summary=textFor(g,"summary");
  return '<article class="game-card"><div class="game-cover">'+(img?'<img src="'+esc(img)+'" alt="'+esc(name)+' cover" loading="lazy" onerror="this.remove()">':'<span class="cover-placeholder" aria-hidden="true">'+esc((name||"P").slice(0,1).toUpperCase())+'</span>')+'<span class="deal-badge">'+esc(g.discount)+'</span>'+(g.featured?'<span class="featured-badge">'+esc(t("featuredBadge"))+'</span>':'')+'</div><div class="game-card-body"><div class="game-meta"><span>'+esc(g.category)+'</span><span class="meta-dot"></span><span>'+esc(g.platform||"Mobile")+'</span></div><h3>'+esc(name)+'</h3><p class="game-summary">'+esc(summary||t("noDescription"))+'</p><div class="card-footer"><span class="deal-label">'+esc(g.discount)+'</span><button class="details-button" type="button" data-details="'+esc(g.id)+'">'+esc(t("details"))+' <span aria-hidden="true">↗</span></button></div></div></article>';
 }).join("");
}
function detail(game) {
 const name=state.lang==="zh"?(game.nameZh||game.nameEn):(game.nameEn||game.nameZh);
 const summary=textFor(game,"summary"), gameplay=textFor(game,"gameplay");
 const promo=safeUrl(game.promoUrl);
 const modal=$("#adminModal"); modal.hidden=false;
 $("#loginView").hidden=true; $("#dashboardView").hidden=true;
 const existing=$("#detailView"); if(existing) existing.remove();
 const view=document.createElement("div"); view.id="detailView"; view.innerHTML='<button class="modal-close" type="button" id="detailClose" aria-label="Close">×</button><span class="section-kicker">'+esc(game.category)+'</span><h2>'+esc(name)+'</h2><p class="form-intro">'+esc(game.discount)+'</p><div class="detail-copy"><p>'+esc(summary)+'</p>'+(game.platform?'<p><strong>'+esc(t("detailPlatform"))+':</strong> '+esc(game.platform)+'</p>':'')+(game.category?'<p><strong>'+esc(t("detailCategory"))+':</strong> '+esc(game.category)+'</p>':'')+(gameplay?'<h3>'+esc(t("detailGameplay"))+'</h3><p>'+esc(gameplay).replace(/\n/g,"<br>")+'</p>':'')+(game.terms?'<h3>'+esc(t("detailTerms"))+'</h3><p>'+esc(game.terms).replace(/\n/g,"<br>")+'</p>':'')+'<p class="security-note">'+esc(t("detailDisclosure"))+'</p></div><div class="form-actions"><button class="button button-outline" type="button" id="detailBack">'+esc(t("back"))+'</button>'+(promo?'<a class="button button-primary" href="'+esc(promo)+'" target="_blank" rel="noopener noreferrer sponsored">'+esc(t("claim"))+' ↗</a>':'')+'</div>';
 $("#adminModal .admin-panel").appendChild(view);
 $("#detailClose").onclick=closeModal; $("#detailBack").onclick=closeModal;
}
async function request(url, options={}) {
 const response=await fetch(url,{credentials:"same-origin",...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});
 let data={}; try{data=await response.json()}catch{}
 if(!response.ok) throw new Error(data.error||"Request failed");
 return data;
}
async function loadGames() {
 try { const data=await request("/api/games"); state.games=Array.isArray(data.games)?data.games:[]; }
 catch(error) { console.error(error); $("#gamesGrid").innerHTML='<p class="form-message">'+esc(t("loadFailed"))+'</p>'; state.games=[]; }
 renderFilters(); renderGames();
}
function openAdmin() {
 $("#adminModal").hidden=false; $("#loginView").hidden=state.isAdmin; $("#dashboardView").hidden=!state.isAdmin;
 const detailView=$("#detailView"); if(detailView) detailView.remove();
 if(state.isAdmin) refreshAdmin();
 else { $("#loginMessage").textContent=""; $("#adminPassword").focus(); }
}
function closeModal() { $("#adminModal").hidden=true; const detailView=$("#detailView"); if(detailView) detailView.remove(); }
function setMessage(selector,message,success=false) { const el=$(selector); el.textContent=message; el.classList.toggle("success",success); }
async function refreshAdmin() {
 try { const data=await request("/api/games?admin=1"); state.games=data.games||[]; renderAdminList(); renderFilters(); renderGames(); }
 catch { state.isAdmin=false; $("#loginView").hidden=false; $("#dashboardView").hidden=true; }
}
function renderAdminList() {
 const list=$("#adminGameList");
 if(!state.games.length){list.innerHTML='<p class="form-intro">'+esc(t("adminEmpty"))+'</p>';return;}
 list.innerHTML=state.games.map(g=>'<div class="admin-game-row"><div><strong>'+esc(state.lang==="zh"?(g.nameZh||g.nameEn):(g.nameEn||g.nameZh))+'</strong><small>'+esc(g.category)+' · '+esc(g.active?t("activeStatus"):t("hiddenStatus"))+'</small></div><div class="admin-row-actions"><button type="button" class="text-button" data-edit="'+esc(g.id)+'">'+esc(t("edit"))+'</button><button type="button" class="text-button danger" data-delete="'+esc(g.id)+'">'+esc(t("delete"))+'</button></div></div>').join("");
}
function formValues() {
 return {nameZh:$("#nameZh").value.trim(),nameEn:$("#nameEn").value.trim(),category:$("#category").value.trim(),platform:$("#platform").value.trim(),discount:$("#discount").value.trim(),summaryZh:$("#summaryZh").value.trim(),summaryEn:$("#summaryEn").value.trim(),gameplayZh:$("#gameplayZh").value.trim(),gameplayEn:$("#gameplayEn").value.trim(),terms:$("#terms").value.trim(),imageUrl:$("#imageUrl").value.trim(),promoUrl:$("#promoUrl").value.trim(),featured:$("#featured").checked,active:$("#active").checked};
}
function resetGameForm() { $("#gameForm").reset(); $("#gameId").value=""; $("#active").checked=true; $("#editorTitle").textContent=t("addGame"); setMessage("#gameMessage",""); }
function editGame(id) {
 const g=state.games.find(item=>item.id===id); if(!g)return;
 $("#gameId").value=g.id;
 ["nameZh","nameEn","category","platform","discount","summaryZh","summaryEn","gameplayZh","gameplayEn","terms","imageUrl","promoUrl"].forEach(key=>$("#"+key).value=g[key]||"");
 $("#featured").checked=!!g.featured; $("#active").checked=!!g.active;
 $("#editorTitle").textContent=(state.lang==="zh"?"编辑游戏":"Edit game")+": "+(g.nameZh||g.nameEn);
 $("#gameForm").scrollIntoView({behavior:"smooth",block:"start"});
}
$("#languageToggle").addEventListener("click",()=>{state.lang=state.lang==="zh"?"en":"zh";applyLanguage();});
$("#adminOpen").addEventListener("click",openAdmin);
$("#adminClose").addEventListener("click",closeModal);
$("#adminModal").addEventListener("click",e=>{if(e.target===$("#adminModal"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchInput").focus();}});
$("#searchInput").addEventListener("input",renderGames);
$("#filters").addEventListener("click",e=>{const button=e.target.closest("[data-category]");if(!button)return;state.category=button.dataset.category;renderFilters();renderGames();});
$("#gamesGrid").addEventListener("click",e=>{const button=e.target.closest("[data-details]");if(!button)return;const game=state.games.find(g=>g.id===button.dataset.details);if(game)detail(game);});
$("#loginForm").addEventListener("submit",async e=>{
 e.preventDefault();setMessage("#loginMessage","");
 try { await request("/api/admin/login",{method:"POST",body:JSON.stringify({password:$("#adminPassword").value})});state.isAdmin=true;$("#adminPassword").value="";$("#loginView").hidden=true;$("#dashboardView").hidden=false;await refreshAdmin(); }
 catch(error){setMessage("#loginMessage",t("loginFailed"));}
});
$("#logoutButton").addEventListener("click",async()=>{try{await request("/api/admin/logout",{method:"POST",body:"{}"});}catch{}state.isAdmin=false;$("#loginView").hidden=false;$("#dashboardView").hidden=true;setMessage("#loginMessage",t("loggedOut"),true);});
$("#adminGameList").addEventListener("click",async e=>{
 const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");
 if(edit){editGame(edit.dataset.edit);return;}
 if(del){const game=state.games.find(g=>g.id===del.dataset.delete);if(!game||!confirm(t("confirmDelete")))return;
  try{await request("/api/games",{method:"DELETE",body:JSON.stringify({id:game.id})});setMessage("#gameMessage",t("deleted"),true);await refreshAdmin();resetGameForm();}catch{setMessage("#gameMessage",t("saveFailed"));}
 }
});
$("#gameForm").addEventListener("submit",async e=>{
 e.preventDefault();setMessage("#gameMessage","");
 const id=$("#gameId").value;const body={...formValues(),...(id?{id}:{})};
 if(!safeUrl(body.promoUrl)){setMessage("#gameMessage",t("saveFailed"));return;}
 if(body.imageUrl&&!safeUrl(body.imageUrl)){setMessage("#gameMessage",t("saveFailed"));return;}
 try{await request("/api/games",{method:id?"PUT":"POST",body:JSON.stringify(body)});setMessage("#gameMessage",t("saved"),true);resetGameForm();await refreshAdmin();}
 catch(error){setMessage("#gameMessage",t("saveFailed"));}
});
$("#resetForm").addEventListener("click",resetGameForm);
applyLanguage();
loadGames();
