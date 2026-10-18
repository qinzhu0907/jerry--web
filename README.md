# Jerry Web Demo

这是一个适合 Cloudflare Pages 的微信支付学习演示页面，商品为「Jerry 智能水杯」。

特点：
- 纯前端商品页 + 支付入口
- Cloudflare Pages Functions 作为支付接口入口
- 支持演示模式和真实微信支付配置入口
- 可直接在仓库中部署到 Cloudflare Pages

## 一、目录结构

- `index.html`：商品页和支付入口
- `styles.css`：页面样式
- `app.js`：前端交互和订单请求
- `functions/api/wechat/create-order.js`：创建支付订单 API
- `functions/api/wechat/notify.js`：微信支付回调接口（演示）
- `wrangler.toml`：Cloudflare Pages 配置
- `.env.example`：微信支付相关环境变量示例

## 二、演示方式

### 本地运行

```bash
npm install
npm run dev
```

然后访问本地地址：

```text
http://localhost:8788
```

## 三、真实微信支付接入说明

要切换到真实微信支付，需要准备以下信息：

- `WECHAT_APPID`
- `WECHAT_MCHID`
- `WECHAT_API_KEY`
- `WECHAT_CERT_SERIAL_NO`
- `WECHAT_NOTIFY_URL`
- `PLATFORM_DOMAIN`

配置方式：

1. 在 Cloudflare Pages 项目中设置环境变量
2. 根据真实微信支付商户信息填入 `.env.example` 中的值
3. 在 `functions/api/wechat/create-order.js` 中，把演示模式替换成正式签名请求逻辑

注意：
- 真实微信支付需要真实商户号、私钥、证书及回调地址
- 如果没有商户和证书，这里仅能运行演示模式，不可直接上线收款

## 四、Cloudflare Pages 部署

在 Cloudflare Dashboard 中：

1. 选择 `Workers & Pages`
2. 创建 `Pages` 项目
3. 连接此 GitHub 仓库
4. 选择 `main` 分支
5. 构建命令留空或设置为：`npm install && npm run deploy`
6. 生产路径：`/`

如果你使用的是 Pages 直接部署，则无需额外配置，只需在项目设置中绑定环境变量即可。

## 五、说明

本项目仅用于学习和演示，适合自学微信支付对接逻辑、Cloudflare Pages 部署流程以及前端支付页面设计。

如果你愿意，我下一步可以继续帮你：
- 把它升级成 React / Next.js 版本
- 补充微信支付真实签名代码
- 增加成功页、订单页和后台管理页
