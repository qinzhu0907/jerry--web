const COOKIE_NAME = "pp_admin";
const encoder = new TextEncoder();
function base64url(bytes) {
 let binary = "";
 for (const byte of bytes) binary += String.fromCharCode(byte);
 return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function fromBase64url(value) {
 const normalized=value.replace(/-/g,"+").replace(/_/g,"/");
 const binary=atob(normalized+"=".repeat((4-normalized.length%4)%4));
 return Uint8Array.from(binary,c=>c.charCodeAt(0));
}
async function sign(payload, secret) {
 const key=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 return base64url(new Uint8Array(await crypto.subtle.sign("HMAC",key,encoder.encode(payload))));
}
export async function issueSession(secret) {
 const payload=base64url(encoder.encode(JSON.stringify({role:"admin",exp:Date.now()+8*60*60*1000,nonce:crypto.randomUUID()})));
 return payload+"."+await sign(payload,secret);
}
export async function verifySession(request, secret) {
 if(!secret) return false;
 const cookie=(request.headers.get("Cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith(COOKIE_NAME+"="));
 if(!cookie) return false;
 const token=decodeURIComponent(cookie.slice(COOKIE_NAME.length+1));
 const parts=token.split(".");
 if(parts.length!==2) return false;
 const expected=await sign(parts[0],secret);
 if(expected.length!==parts[1].length) return false;
 let mismatch=0;for(let i=0;i<expected.length;i++)mismatch|=expected.charCodeAt(i)^parts[1].charCodeAt(i);
 if(mismatch!==0)return false;
 try {const data=JSON.parse(new TextDecoder().decode(fromBase64url(parts[0])));return data.role==="admin"&&Number(data.exp)>Date.now();}catch{return false;}
}
export function sessionCookie(token, request) {
 const secure=new URL(request.url).protocol==="https:"?"; Secure":"";
 return COOKIE_NAME+"="+encodeURIComponent(token)+"; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800"+secure;
}
export function clearSessionCookie(request) {
 const secure=new URL(request.url).protocol==="https:"?"; Secure":"";
 return COOKIE_NAME+"=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"+secure;
}
export function json(data,status=200,headers={}) {
 return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...headers}});
}
export async function readJson(request) {
 const length=Number(request.headers.get("Content-Length")||0);
 if(length>40000) throw new Error("Request too large");
 return await request.json();
}
export function validWebUrl(value, optional=false) {
 if(optional&&!value)return true;
 try {const url=new URL(value);return ["https:","http:"].includes(url.protocol);}catch{return false;}
}
