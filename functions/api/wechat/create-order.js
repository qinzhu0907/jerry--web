export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const amount = Number(body.amount || 0);
    const quantity = Number(body.quantity || 1);
    const productName = body.productName || 'Jerry 智能水杯';
    const demoMode = body.demoMode === true || !env.WECHAT_APPID || !env.WECHAT_MCHID || !env.WECHAT_API_KEY;

    if (!amount || amount <= 0) {
      return Response.json(
        {
          ok: false,
          message: '支付金额无效。',
        },
        { status: 400 }
      );
    }

    const outTradeNo = `JERRY-${Date.now()}`;

    if (demoMode) {
      return Response.json({
        ok: true,
        demoMode: true,
        message:
          '当前为演示模式：未配置真实微信支付参数。请设置 WECHAT_APPID / WECHAT_MCHID / WECHAT_API_KEY 后启用真实支付。',
        outTradeNo,
        amount,
        productName,
        quantity,
        payUrl: `weixin://wxpay/bizpayurl?pr=${encodeURIComponent(outTradeNo)}`,
      });
    }

    // Real WeChat Pay JSAPI / H5 payment integration should be implemented here.
    // This project is designed for Cloudflare Pages. In production, you need to:
    // 1) Configure WXPay merchant settings in Cloudflare env vars.
    // 2) Sign the request using WeChat Pay certificate and private key.
    // 3) Return the final payment URL / prepay_id to the front-end.
    // This demo intentionally avoids forcing a real network call without merchant credentials.
    return Response.json({
      ok: true,
      demoMode: false,
      message: '真实微信支付接口已就绪，可在配置好商户信息后继续接通。',
      outTradeNo,
      amount,
      productName,
      quantity,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: '参数格式错误，请检查请求体。',
        error: error instanceof Error ? error.message : 'unknown-error',
      },
      { status: 400 }
    );
  }
}

export async function onRequest({ request, env }) {
  return onRequestPost({ request, env });
}
