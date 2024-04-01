<p>営業活動における、リストとメンバーの成績を見れるようにしたアプリケーションです。<p>

<p><b>機能：</b><br>ログイン＆ログアウト、memberの追加、営業リストの追加・編集・削除、各メンバーがListをKeepできる、今月と先月のデータ（各メンバーのアポ取得数・アポ取得率）の表示</p>

## サービスの URL

https://sales-growth.vercel.app/

mail: test@mail.com<br/>
pass: test1111<br/>
でぜひ中身をのぞいてください。
<br />

## サービスへの想い(作成の背景)

私は現在、長期インターンシップで、法人営業を行っています。
私たち、インターン生の成長と組織全体の成績の把握のために、営業成績の計算を行うのですが、スプレッドシートのデータを名前・結果・日にち等で何回もフィルタリングし、手動で計算していたので、List に入力すれば、自動で各個人のデータを出すことはできないかなと思い、作成しました。

<img width="941" alt="スクリーンショット 2024-03-21 000406" src="https://github.com/iyoshi-rgb/sales_growth/assets/153269464/6885f041-50dd-436b-ab21-e07f460f220c">
<br>
<img width="943" alt="スクリーンショット 2024-03-21 000342" src="https://github.com/iyoshi-rgb/sales_growth/assets/153269464/6c18f201-88d0-4da5-957d-f6833ee7f9eb">

## 今後の展望

- 各個人が働いた時間を登録し、一時間当たりの荷電数・アポイント取得/時間等のデータを表示させるようにする。
- Member を削除すると、削除された Member が取得したアポイントメントデータも消されてしまうので残るようにする。（追加パターンも）
- 取得数を表す棒グラフの縦軸が、データの最大値によって変化しているので、固定にする
- layout.tsx の活用
<p><b>技術的な挑戦</b>：<br>初めて、Next.js,supabaseを使用したこと。</p>
<p><b>苦労したこと：</b><br>データをフェッチする場所。SSRとCSRの使い分け、ルーティング</p>
<p><b>よかったこと:</b> 以前作成した、Reactアプリケーションより、Component設計が理解できたかつ、効率的にUI設計できた。<br>実際に長期インターン先に、アプリケーションを見せに行き、何の機能が欲しいかをヒアリング＆実装できた。（MemberのList機能）</p>
<p><b>課題&これから：</b>各個人が働いた時間を登録し、一時間当たりの荷電数などのデータを表示させるようにする。<br>
Memberを削除すると、そのMemberが取得したアポイントメントデータも消えてしまうので、残るようにする。<br>
UI（現状シンプル過ぎる）・UXを考える。<br>
layout.tsxの活用</p>

<p><b>使用技術：</b>Next.js,supabase</p>
