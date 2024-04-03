![ロゴ　仮完成-7](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/1943a40a-8917-44be-86c8-e089ebbd5ca4)

<br/>

## サービスの URL

https://sales-growth.vercel.app/

mail: test@mail.com<br/>
pass: test1111<br/>
でぜひ中身をのぞいてください。

＊favicon がなぜか変更されない（お助けを）
<br />

## サービスへの想い(作成の背景)

私は現在、長期インターンシップで、法人営業を行っています。<br/>
私たち、インターン生の成長と組織全体の成績の把握のために、営業成績の計算を行うのですが、スプレッドシートのデータを名前・結果・日にち等で何回もフィルタリングし、手動で計算していたので、List に入力すれば、自動で各個人のデータを出すことはできないかなと思い、作成しました。

<br/>

## 機能一覧

| Top＆ログイン＆アカウント作成画画                                                                                                         | Home 画面                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2024-04-01 162034](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/c31aa52f-72c3-41a8-a8f2-9dd801448187) | ![スクリーンショット 2024-04-01 162131](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/00499c83-c808-4d1d-b37b-4f817df78c15) |
| Supabase の認証機能を用いて、ログイン、アカウント作成機能を実装しました。アカウント作成はメール認証です。                                 | 棒グラフによって、誰が何件アポイントメントを取得したかを表示しています。                                                                  |

| Home 画面 2                                                                                                                               | List 画面                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2024-04-01 173751](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/7c7071fa-d515-45e2-aab7-29dbdf747296) | ![スクリーンショット 2024-04-01 165730](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/c195d032-c8ca-4bf0-ab6a-6594925d821b)    |
| 各月の各メンバーの アポイントメント取得数/荷電数　を行い取得率を表示しています。                                                          | 左のアイコンから、編集、削除、電話番号の Copy、List への追加が出来ます。すでに誰かのリストに追加されてあるのは、一番右のアイコンが消えます。 |

| 各メンバーの List 画面                                                                                                                    | メンバー一覧&追加画面                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2024-04-01 162231](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/6dafc452-a800-402e-b6b0-471fb889c2e0) | ![スクリーンショット 2024-04-01 164206](https://github.com/iyoshi-rgb/sales_growth/assets/153269464/ddac521a-eaaa-4949-b2d4-a142f24aa9cd) |
| 各メンバーの List に追加されたデータだけを表示します。一番右のアイコンで各メンバーの List から外すことが出来ます                          | メンバー一覧の表示、メンバーの追加・削除を行えます。                                                                                      |

<br />

## 使用技術

| Category       | Technology Stack                                         |
| -------------- | -------------------------------------------------------- |
| Frontend       | TypeScript, Next.js , shadcn/ui, MUI(棒グラフ) ,tailwind |
| Backend        | Supabase                                                 |
| Infrastructure | Vercel                                                   |
| Database       | Supabase                                                 |
| Design         | Lucid                                                    |

<br/>

## 挑戦&苦労&GoodPoint

- 挑戦：初めて、Next.js と BaaS(Supabase)を使用したこと

- 苦労：データをフェッチする場所。CSR と SSR の使い分け

- よかったこと：以前作成した、React アプリケーションより、Component 設計が理解できたかつ、効率的に UI 設計できた。
- 実際に長期インターン先に、アプリケーションを見せに行き、何の機能が欲しいかをヒアリング＆実装できた。（メンバーの List 機能）
  <br/>

## 今後の展望(サービス＆個人)

- List ページへの画面遷移が遅い。
  フェッチするデータの量・タイミング等を考える&効率的(少ない等)な記述で書く。（CS 周りの勉強）

- 各個人が働いた時間を登録し、一時間当たりの荷電数・アポイント取得/時間等のデータを表示させるようにする。
- メンバーを削除すると、削除された メンバーが取得したアポイントメントデータも消されてしまうので残るようにする。（追加パターンも）
- 取得数を表す棒グラフの縦軸が、データの最大値によって変化しているので、固定にする
- layout.tsx の活用
