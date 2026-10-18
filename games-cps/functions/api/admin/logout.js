import { clearSessionCookie, json } from "../../_lib/auth.js";
export async function onRequestPost({request}) {
 return json({ok:true},200,{"Set-Cookie":clearSessionCookie(request),"Cache-Control":"no-store"});
}
