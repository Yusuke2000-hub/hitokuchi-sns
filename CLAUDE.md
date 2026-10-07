# CLAUDE.md - Claude Code ルール設定

## プロジェクト概要
RaiseTech AI講座・短文投稿型SNS「Hitokuchi」

## 基本ルール

### 言語
- 返答は必ず日本語で行う
- コードコメントは日本語で書く
- クラス名・メソッド名・変数名などの識別子は英語で書く

### Gitブランチ運用
- mainブランチへの直接pushは禁止
- 作業は必ずfeatureブランチで行う
- ブランチ名はIssue番号と連動させる
  例：feature/1-user-authentication
- マージ後はブランチを削除する
- PR作成時は本文に `Closes #{issue番号}` を含め、マージ時に自動クローズさせる
- モノレポ構成のため、`git add` 時はファイルを明示的に指定し、フロントエンド/バックエンド/インフラの変更を混在させない

### コーディングルール
- レイヤードアーキテクチャを厳守する
  Controller → Service → Repository → DB
- ControllerはRepositoryを直接呼ばない
- 1メソッド1責務で書く
- バックエンド: Spotless（google-java-format）でフォーマット統一。コミット前に spotlessApply を実行
- フロントエンド: ESLintでチェック。npm run lint をエラー・警告ゼロで通過させること
- 例外処理: orElseThrow を用い、GlobalExceptionHandler（@RestControllerAdvice）で一元管理する

### 技術スタック
- Java 21（Microsoft OpenJDK）
- Spring Boot 4.0.0
- PostgreSQL 17
- Gradle 8.14
- フロントエンド: React 19, TypeScript 5.x, Vite 8.x
- インフラ: Terraform 1.x / AWS（EC2・RDS・ALB・S3）

### セキュリティ
- パスワード・APIキー・IPアドレス・.env の中身などの秘密情報をコミットやコードに直接書かない
- 設定値は環境変数で渡す

### 作業前の確認事項
- JAVA_HOME が設定されているか確認する
- bootRun終了時は必ずCtrl+Cで停止する
- npm run dev終了時も必ずCtrl+Cで停止する

## 設計書

- `docs/` 配下の設計書を仕様の正とする
- 実装前に該当する `docs/features/` の機能定義書と `docs/database-design.md`・`docs/screen-design.md` を読む
- 実装が設計と異なる場合は、実装を進める前にユーザーに確認し、合意後に docs も更新する

## 作業スタイル

- 変更は一度に大きくまとめず、1件ずつ確認しながら進める（planモードでの手動承認を前提とする）
- 変更理由（なぜその修正が必要か）を明確にしてから実装する

## ポート管理ルール
- バックエンド：localhost:8080（変更禁止）
- フロントエンド：localhost:5173（変更禁止）
- ポート競合が発生した場合は別ポートで起動せず、必ず指定ポートで解決する
