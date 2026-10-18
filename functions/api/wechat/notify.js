export async function onRequestPost({ request, env }) {
  const data = await request.formData().catch(() => null);
  const raw = data ? Object.fromEntries(data.entries()) : {};

  return Response.json({
    ok: true,
    mode: 'notify',
    message: '微信支付回调已接收（演示回调），请在真实商户环境中验证签名与支付状态。',
    received: {
      ...raw,
      appName: env.APP_NAME || 'Jerry Web Demo',
    },
  });
}

export async function onRequest({ request, env }) {
  return onRequestPost({ request, env });
}
