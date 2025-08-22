# my-unittest

Vitestを使用したユニットテストの学習プロジェクトです。
[https://github.com/frontend-testing-book/unittest](https://github.com/frontend-testing-book/unittest) の模写です

## 概要

このリポジトリは、Vitestフレームワークを使ってユニットテストの基本的な書き方を学習するためのサンプルコードを含んでいます。

## 技術スタック

- **テストフレームワーク**: [Vitest](https://vitest.dev/)
- **パッケージマネージャー**: pnpm
- **言語**: TypeScript

## セットアップ

```bash
pnpm install
```

## テスト実行

```bash
pnpm test
```

## プロジェクト構成

```
src/
└── 03/
    ├── 02/  # 基本的な四則演算のテスト
    ├── 04/  # 四則演算のテスト（上限・下限チェック付き）
    ├── 05/  # 四則演算のテスト（エラーハンドリング付き）
    ├── 06/  # 配列操作のテスト
    └── 07/  # より複雑な配列操作のテスト
```

各ディレクトリには以下のファイルが含まれます：
- `index.ts` - 実装ファイル
- `index.test.ts` - テストファイル

## 学習内容

- 基本的なテストの書き方
- `describe`と`test`の使い分け
- `expect`を使った期待値の検証
- エラーハンドリングのテスト
- 配列操作のテスト