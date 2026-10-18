import { clearSessionCookie, json } from "../../_lib/auth.js";
export async function onRequestPost({request}) {
 return json({ok:true},{status:200,headers:{"Set-Cookie":clearSessionCookie(request),"Cache-Control":"no-store"}});
}
