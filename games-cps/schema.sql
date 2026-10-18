CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  nameZh TEXT NOT NULL,
  nameEn TEXT NOT NULL,
  category TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT '',
  discount TEXT NOT NULL,
  summaryZh TEXT NOT NULL,
  summaryEn TEXT NOT NULL,
  gameplayZh TEXT NOT NULL DEFAULT '',
  gameplayEn TEXT NOT NULL DEFAULT '',
  terms TEXT NOT NULL DEFAULT '',
  imageUrl TEXT NOT NULL DEFAULT '',
  promoUrl TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_games_active_featured_updated
ON games(active, featured DESC, updated_at DESC);
