# Hitokuchi 技術スタック

関連ドキュメント：[要件定義](./requirements.md) | [インフラ構成](./infrastructure.md)

---

## 概要

タスク管理アプリと同じ技術スタックを使用します。フロントエンドは React 19 + TypeScript + Vite + MUI、バックエンドは Java 21 + Spring Boot 4.0.0 + Gradle 8.14、データベースは PostgreSQL 18 です。

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
| Spring Security | Spring Boot 4.0.0 が管理 | 認証・認可 |
| JWT ライブラリ | 未決定 | JWT 生成・検証 |
| mybatis-spring-boot-starter | 4.0.1 | SQL マッパー・データアクセス |
| Flyway | Spring Boot 4.0.0 が管理 | DB マイグレーション |
| Gradle | 8.14 | ビルドツール |
| Spotless (google-java-format) | - | コードフォーマッター |

> **JWT ライブラリ候補:**
> - **jjwt** 0.13.0 — Jackson 3 との競合あり（`jjwt-gson` で回避可能。Boot 4 BOM 非管理）
> - **nimbus-jose-jwt** 10.10 — Spring Security 7 が内部利用。Security 経由なら個別バージョン指定不要
> - **auth0/java-jwt** 4.6.2 — Jackson 非依存で Jackson 3 競合リスクが低い（Boot 4 BOM 非管理）

---

### データベース

| 技術 | バージョン | 用途 |
|---|---|---|
| PostgreSQL | 18 | リレーショナルデータベース |

---

### インフラ・クラウド

| 技術 | バージョン | 用途 |
|---|---|---|
| AWS EC2 | - | アプリケーションサーバー |
| AWS RDS | - | マネージドデータベース（PostgreSQL 18） |
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
| PostgreSQL 18 | RaiseTech 講義での使用例に合わせたバージョン |
| AWS S3 | 画像ストレージをアプリサーバーから分離し、スケーラビリティと耐久性を確保 |
| Terraform | インフラをコードで管理し、環境の再現性を確保 |
| JWT | ステートレスな認証によりサーバー側のセッション管理が不要 |
| MyBatis | 講義カリキュラムに準拠。SQL を明示的に記述するため学習目的での可読性が高い |
| Flyway | DB スキーマの変更をバージョン管理し、環境間の再現性を確保する |

---

## バックエンド開発環境設定（確定値）

| 項目 | 値 | 備考 |
|---|---|---|
| パッケージ名 | `com.hitokuchi` | |
| プロジェクト名 | `hitokuchi` | |
| ローカル開発用プロファイル | `local` | |
| ローカル接続設定ファイル | `backend/src/main/resources/application-local.yml` | gitignore 対象・手動作成 |
| テスト用 DB | H2（インメモリ） | 環境変数なしで `gradlew build` を通すため。本番・ローカル起動では PostgreSQL を使用 |
