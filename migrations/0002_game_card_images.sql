-- 在已经初始化的 Cloudflare D1 数据库中执行一次。
ALTER TABLE games ADD COLUMN iconUrl TEXT NOT NULL DEFAULT '';
ALTER TABLE games ADD COLUMN galleryUrls TEXT NOT NULL DEFAULT '';
