import { verifySession, json, readJson, validWebUrl } from "../_lib/auth.js";
const FIELDS=["nameZh","nameEn","category","platform","discount","summaryZh","summaryEn","gameplayZh","gameplayEn","terms","imageUrl","promoUrl","featured","active"];
function clean(body) {
 const out={};
 for(const key of FIELDS) out[key]=body[key]??(key==="featured"||key==="active"?false:"");
 for(const key of ["nameZh","nameEn","category","discount","summaryZh","summaryEn"]) out[key]=String(out[key]).trim();
 for(const key of ["platform","gameplayZh","gameplayEn","terms","imageUrl","promoUrl"]) out[key]=String(out[key]||"").trim();
 out.featured=!!out.featured;out.active=!!out.active;
 return out;
}
function validate(g) {
 const required=["nameZh","nameEn","category","discount","summaryZh","summaryEn"];
 if(required.some(k=>!g[k])||required.some(k=>g[k].length>1500))return "Please fill in all required fields";
 if(g.nameZh.length>100||g.nameEn.length>100||g.category.length>60||g.discount.length>120||g.summaryZh.length>500||g.summaryEn.length>500||g.gameplayZh.length>2000||g.gameplayEn.length>2000||g.terms.length>1500||g.platform.length>100)return "One or more fields are too long";
 if(!validWebUrl(g.promoUrl)||!validWebUrl(g.imageUrl,true))return "URLs must use http or https";
 return "";
}
function row(r) {return {...r,featured:!!r.featured,active:!!r.active};}
async function isAdmin(request,env) {return await verifySession(request,env.SESSION_SECRET);}
export async function onRequest({request,env}) {
 if(!env.DB) return json({error:"D1 database binding DB is not configured"},503);
 const method=request.method;
 if(method==="GET") {
  const admin=new URL(request.url).searchParams.get("admin")==="1"&&await isAdmin(request,env);
  const result=admin
   ? await env.DB.prepare("SELECT * FROM games ORDER BY featured DESC, updated_at DESC").all()
   : await env.DB.prepare("SELECT * FROM games WHERE active=1 ORDER BY featured DESC, updated_at DESC").all();
  return json({games:(result.results||[]).map(row)});
 }
 if(!await isAdmin(request,env))return json({error:"Unauthorized"},401);
 try {
  const body=await readJson(request);
  if(method==="POST") {
   const g=clean(body),error=validate(g);if(error)return json({error},400);
   const id=crypto.randomUUID(),now=new Date().toISOString();
   await env.DB.prepare("INSERT INTO games (id,nameZh,nameEn,category,platform,discount,summaryZh,summaryEn,gameplayZh,gameplayEn,terms,imageUrl,promoUrl,featured,active,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
    .bind(id,g.nameZh,g.nameEn,g.category,g.platform,g.discount,g.summaryZh,g.summaryEn,g.gameplayZh,g.gameplayEn,g.terms,g.imageUrl,g.promoUrl,g.featured?1:0,g.active?1:0,now,now).run();
   return json({ok:true,id},201);
  }
  if(method==="PUT") {
   const id=String(body.id||"");if(!id)return json({error:"Missing id"},400);
   const g=clean(body),error=validate(g);if(error)return json({error},400);
   const now=new Date().toISOString();
   const result=await env.DB.prepare("UPDATE games SET nameZh=?,nameEn=?,category=?,platform=?,discount=?,summaryZh=?,summaryEn=?,gameplayZh=?,gameplayEn=?,terms=?,imageUrl=?,promoUrl=?,featured=?,active=?,updated_at=? WHERE id=?")
    .bind(g.nameZh,g.nameEn,g.category,g.platform,g.discount,g.summaryZh,g.summaryEn,g.gameplayZh,g.gameplayEn,g.terms,g.imageUrl,g.promoUrl,g.featured?1:0,g.active?1:0,now,id).run();
   if(!result.meta?.changes)return json({error:"Game not found"},404);
   return json({ok:true,id});
  }
  if(method==="DELETE") {
   const id=String(body.id||"");if(!id)return json({error:"Missing id"},400);
   const result=await env.DB.prepare("DELETE FROM games WHERE id=?").bind(id).run();
   if(!result.meta?.changes)return json({error:"Game not found"},404);
   return json({ok:true,id});
  }
  return json({error:"Method not allowed"},405,{Allow:"GET, POST, PUT, DELETE"});
 } catch(error) {
  return json({error:error.message==="Request too large"?"Request too large":"Invalid request or database error"},400);
 }
}
