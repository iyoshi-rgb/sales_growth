<p>営業活動における、リストとメンバーの成績を見れるようにしたアプリケーションです。<p>

<p><b>機能：</b><br>ログイン＆ログアウト、memberの追加、営業リストの追加・編集・削除、各メンバーがListをKeepできる、今月と先月のデータ（各メンバーのアポ取得数・アポ取得率）の表示</p>

<a href="https://sales-growth.vercel.app/">https://sales-growth.vercel.app/</a>

<span>mail:test@mail.com pass:test1111 で是非中身をのぞいてください。</span>
<br>
<img width="941" alt="スクリーンショット 2024-03-21 000406" src="https://github.com/iyoshi-rgb/sales_growth/assets/153269464/6885f041-50dd-436b-ab21-e07f460f220c">
<br>
<img width="943" alt="スクリーンショット 2024-03-21 000342" src="https://github.com/iyoshi-rgb/sales_growth/assets/153269464/6c18f201-88d0-4da5-957d-f6833ee7f9eb">

<p><b>作成の経緯</b>：<br>営業を行う長期インターンシップに参加しているのですが、営業成績を計算する際、スプレッドシートのデータを何回もフィルタリングし、手動で計算していたので、一度に行う事が出来ないかなと思い、作成しました。</p>

<p><b>技術的な挑戦</b>：<br>初めて、Next.js,supabaseを使用したこと。</p>
<p><b>苦労したこと：</b><br>データをフェッチする場所。SSRとCSRの使い分け、ルーティング</p>
<p><b>よかったこと:</b> 以前作成した、Reactアプリケーションより、Component設計が理解できたかつ、効率的にUI設計できた。<br>実際に長期インターン先に、アプリケーションを見せに行き、何の機能が欲しいかをヒアリング＆実装できた。（MemberのList機能）</p>
<p><b>課題&これから：</b>各個人が働いた時間を登録し、一時間当たりの荷電数などのデータを表示させるようにする。<br>
Memberを削除すると、そのMemberが取得したアポイントメントデータも消えてしまうので、残るようにする。<br>
UI（現状シンプル過ぎる）・UXを考える。<br>
layout.tsxの活用</p>

<p><b>使用技術：</b>Next.js,supabase</p>
