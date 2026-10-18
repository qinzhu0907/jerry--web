# OmniDownloader

这个项目包含一个简单的后端（基于 FastAPI）和单文件前端（纯 HTML + Tailwind CDN），用于演示如何使用 yt-dlp 解析媒体链接并展示可下载的直链。

目录结构

```
omni-downloader/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   └── index.html
└── README.md
```

快速开始

1. 克隆仓库并切换到新增分支（如果需要）：

   git clone https://github.com/qinzhu0907/jerry--web.git
   cd jerry--web
   git checkout add-omni-downloader

2. 进入后端并创建虚拟环境：

   python -m venv .venv
   source .venv/bin/activate  # macOS / Linux
   .\.venv\Scripts\activate   # Windows (PowerShell)

3. 安装依赖：

   pip install -r omni-downloader/backend/requirements.txt

4. 启动后端服务：

   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

5. 打开前端：

   - 直接在浏览器打开 `omni-downloader/frontend/index.html`（部分浏览器可能限制本地文件 fetch），或
   - 用简单静态服务器：
     python -m http.server --directory omni-downloader/frontend 8080
     然后访问 http://localhost:8080

注意事项

- yt-dlp 解析某些站点可能还需要系统层面的依赖（如 ffmpeg）以便处理转码或提取流媒体。请根据需要安装。
- 本项目仅用于学习与研究，请遵守各平台版权与服务条款，勿用于下载受版权保护或受限内容。
