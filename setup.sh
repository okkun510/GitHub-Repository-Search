#!/bin/sh

# 現在のディレクトリに移動
cd `dirname $0`

# Node.jsのバージョンを設定（asdf使用）
if command -v asdf > /dev/null 2>&1; then
  echo "🔧 Node.jsのバージョンを設定中..."
  asdf install
  echo "✅ Node.jsの設定が完了しました"
else
  echo "⚠️  asdfがインストールされていません"
  echo "   Node.js 20.19.0 を手動でインストールしてください"
fi

# パッケージをインストール
echo "📦 パッケージをインストール中..."
pnpm i
echo "✅ パッケージのインストールが完了しました"

# 環境変数ファイルを作成
if [ ! -f .env.local ]; then
  echo "🔧 環境変数ファイルを作成中..."
  cp .env.template .env.local
  echo "✅ .env.local を作成しました（必要に応じて編集してください）"
else
  echo "ℹ️  .env.local は既に存在します"
fi

echo ""
echo "✨ セットアップが完了しました！"
echo ""
echo "次のコマンドで開発サーバーを起動できます:"
echo "  pnpm dev"
