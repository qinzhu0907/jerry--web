from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json

app = FastAPI(title="OmniDownloader API", version="1.0.0")

# 配置跨域支持
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats")
def get_stats():
    # 模拟或统计数据接口
    return {"total_downloads": 433902, "today_downloads": 116}

@app.post("/api/parse")
def parse_media(payload: dict):
    url = payload.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="请输入有效的媒体链接")
    
    try:
        # 调用 yt-dlp 获取媒体元数据及直链
        cmd = ["yt-dlp", "--dump-json", "--no-playlist", url]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=35)
        
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail="解析失败：无法获取该链接的媒体资源或链接受限")
        
        info = json.loads(result.stdout)
        
        # 提取关键字段
        formats = []
        for f in info.get("formats", []):
            if f.get("url") and f.get("vcodec") != "none":
                formats.append({
                    "format_id": f.get("format_id"),
                    "ext": f.get("ext"),
                    "resolution": f.get("resolution") or f.get("format_note", "Standard"),
                    "url": f.get("url")
                })

        return {
            "title": info.get("title", "未知标题"),
            "platform": info.get("extractor", "Web"),
            "thumbnail": info.get("thumbnail", ""),
            "duration": info.get("duration", 0),
            "formats": formats[:6] # 返回前6个清晰度选项供选择
        }
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="解析请求超时，请稍后重试")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
