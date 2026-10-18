import { issueSession, sessionCookie, json, readJson } from "../../_lib/auth.js";
export async function onRequestPost({request,env}) {
 if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET) return json({error:"Admin secrets are not configured"},503);
 try {
  const body=await readJson(request);
  if(typeof body.password!=="string"||body.password.length>300||body.password!==env.ADMIN_PASSWORD) {
   await new Promise(resolve=>setTimeout(resolve,250));
   return json({error:"Invalid credentials"},401);
  }
  const token=await issueSession(env.SESSION_SECRET);
  return json({ok:true},{status:200,headers:{"Set-Cookie":sessionCookie(token,request),"Cache-Control":"no-store"}});
 } catch {return json({error:"Invalid request"},400);}
}
