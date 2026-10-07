# Hitokuchi

一口サイズの短文を気軽に投稿できる SNS。

---

## 主な機能

| 機能 | 概要 |
|---|---|
| ユーザー登録・ログイン | メールアドレスとパスワードで登録・JWT 認証 |
| タイムライン | 全体タイムライン・フォロー中ユーザーのタイムライン |
| 投稿 | テキスト（280 文字）と画像（1 枚）を投稿・編集・削除 |
| いいね | 投稿にいいね・取り消し・数の表示 |
| コメント | 投稿へのコメント追加・削除 |
| プロフィール | プロフィール表示・編集・フォロー / フォロー解除 |
| ユーザー検索 | ユーザー名で検索し、プロフィールへ遷移 |

---

## X/Twitter との違い

| 項目 | Hitokuchi | X/Twitter |
|---|---|---|
| インプレッション数 | **表示しない** | 表示する |
| リツイート | **なし** | あり |

「誰かに見られているか」ではなく「何を伝えたいか」に集中できる場を目指しています。

---

## 技術スタック

| 領域 | 技術 |
|---|---|
| フロントエンド | React 19 / TypeScript 5.x / Vite 8.x / MUI |
| バックエンド | Java 21（Microsoft OpenJDK）/ Spring Boot 4.0.0 / Gradle 8.14 |
| データベース | PostgreSQL 17 |
| インフラ | AWS（EC2・RDS・ALB・S3）/ Terraform 1.x |

---

## 設計書

| ドキュメント | 内容 |
|---|---|
| [要件定義書](docs/requirements.md) | プロジェクトの背景・目的・要件 |
| [機能一覧](docs/features.md) | 全機能の一覧とユースケース |
| [DB 設計書](docs/database-design.md) | テーブル定義・ER 図 |
| [画面設計書](docs/screen-design.md) | 画面一覧・ワイヤーフレーム・画面遷移図 |
| [インフラ構成書](docs/infrastructure.md) | AWS 構成・Terraform 管理方針 |
| [技術スタック](docs/tech-stack.md) | 採用技術の詳細と選定理由 |

### 機能別定義書

| ドキュメント | 内容 |
|---|---|
| [認証](docs/features/authentication.md) | ユーザー登録・ログイン・ログアウト |
| [投稿](docs/features/post.md) | 投稿作成・編集・削除 |
| [タイムライン](docs/features/timeline.md) | 全体・フォロー中タイムライン |
| [いいね](docs/features/like.md) | いいね機能 |
| [コメント](docs/features/comment.md) | コメント機能 |
| [プロフィール](docs/features/profile.md) | プロフィール・フォロー機能 |
| [ユーザー検索](docs/features/user-search.md) | ユーザー検索機能 |

---

## 開発状況

現在は**設計段階**です。実装はこれから開始します。

---

## スクリーンショット

> 実装後に追加予定
