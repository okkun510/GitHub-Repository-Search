# Claude Code Instructions

## README更新ルール

**設計が変わったり追加されたら、都度README.mdを更新すること。**

対象セクション:
- ディレクトリ構成: 構成の変更・追加とその理由
- 技術スタック: 新しい技術の採用・変更とその理由
- 状態管理: 状態管理の方針変更
- API設計: API設計の決定・変更
- テスト戦略: テスト方針の追加・変更

更新タイミング:
- 新しいディレクトリや層を追加したとき
- ライブラリを追加・変更したとき
- 設計方針を決定・変更したとき
- ユーザーと設計について議論して結論が出たとき

## プロジェクト構成

```
src/
├── app/                      # Next.js App Router
├── components/
│   ├── primitives/           # shadcn/ui, Radix UI
│   ├── ui/                   # Atomic Design
│   │   ├── atoms/            # 最小単位のUIパーツ
│   │   ├── molecules/        # atomsの組み合わせ（汎用）
│   │   └── organisms/        # プロダクト固有のUI
│   └── utils/                # UIユーティリティ (cn, etc.)
```

## コマンド

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - ビルド
- `pnpm storybook` - Storybookを起動
- `pnpm dlx shadcn@latest add <component>` - shadcnコンポーネント追加

## 技術スタック

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-based config)
- shadcn/ui + Radix UI
- Storybook 10 (`@storybook/nextjs-vite`)
- pnpm
- asdf (Node.js 20.19.0)

## 設計方針

- Server Componentsでデータ取得
- 検索クエリはURLパラメータに反映（ブックマーク・共有可能）
- PC優先のレスポンシブ設計
- atoms/moleculesは汎用、organismsはプロダクト固有

## コーディング規約

- **ファイル名は全てindex.tsで統一する**
  - `foo.ts` ではなく `foo/index.ts` にする
  - 例: `fetchers/repositories/getRepository/index.ts`

## テスト規約

- **テストは正常系と異常系でdescribeを分ける**
  ```typescript
  describe("対象", () => {
    describe("正常系", () => {
      it("...", () => {});
    });
    describe("異常系", () => {
      it("...", () => {});
    });
  });
  ```
