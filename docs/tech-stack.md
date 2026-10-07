# Hitokuchi 技術スタック

関連ドキュメント：[要件定義](./requirements.md) | [インフラ構成](./infrastructure.md)

---

## 概要

タスク管理アプリと同じ技術スタックを使用します。フロントエンドは React 19 + TypeScript + Vite + MUI、バックエンドは Java 21 + Spring Boot 4.0.0 + Gradle 8.14、データベースは PostgreSQL 17 です。

---

## 技術スタック一覧

### フロントエンド

| 技術 | バージョン | 用途 |
|---|---|---|
| React | 19 | UI フレームワーク |
| TypeScript | 5.x | 型安全な JavaScript |
| Vite | 8.x | ビルドツール・開発サーバー |
| MUI (Material UI) | 7.x | UI コンポーネントライブラリ |
| React Router | 7.x | クライアントサイドルーティング |
| Axios | 1.x | HTTP クライアント |

---

### バックエンド

| 技術 | バージョン | 用途 |
|---|---|---|
| Java (Microsoft OpenJDK) | 21 | 実行環境 |
| Spring Boot | 4.0.0 | アプリケーションフレームワーク |
| Spring Security | 6.x | 認証・認可 |
| Spring Data JPA | 3.x | ORM・データアクセス |
| jjwt | 0.12.x | JWT 生成・検証 |
| Gradle | 8.14 | ビルドツール |
| Spotless (google-java-format) | - | コードフォーマッター |

---

### データベース

| 技術 | バージョン | 用途 |
|---|---|---|
| PostgreSQL | 17 | リレーショナルデータベース |

---

### インフラ・クラウド

| 技術 | バージョン | 用途 |
|---|---|---|
| AWS EC2 | - | アプリケーションサーバー |
| AWS RDS | - | マネージドデータベース（PostgreSQL 17） |
| AWS ALB | - | ロードバランサー |
| AWS S3 | - | 画像ストレージ |
| Terraform | 1.x | インフラのコード管理（IaC） |
| Nginx | 1.x | リバースプロキシ・静的ファイル配信 |

---

### 認証

| 技術 | バージョン | 用途 |
|---|---|---|
| JWT (JSON Web Token) | - | ステートレス認証トークン |
| bcrypt | - | パスワードハッシュ化 |

---

### 開発ツール

| ツール | 用途 |
|---|---|
| Git | バージョン管理 |
| GitHub | リモートリポジトリ・PR 管理 |

---

## 選定理由

| 技術 | 選定理由 |
|---|---|
| React + TypeScript + Vite | タスク管理アプリとの統一。型安全性と高速なビルドが得られる |
| MUI | 豊富な UI コンポーネントで SNS らしい画面を素早く構築できる |
| Spring Boot 4.0.0 | タスク管理アプリとの統一。Java 21 の仮想スレッドに対応し高いスループットを実現 |
| PostgreSQL 17 | RaiseTech 講義での使用例に合わせたバージョン |
| AWS S3 | 画像ストレージをアプリサーバーから分離し、スケーラビリティと耐久性を確保 |
| Terraform | インフラをコードで管理し、環境の再現性を確保 |
| JWT | ステートレスな認証によりサーバー側のセッション管理が不要 |
