import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-5 flex flex-col gap-4 max-w-[1120px] mx-auto my-0">
      <section>
        <h1 className="font-bold text-3xl py-4">Kitchen Log</h1>
        <p>
          レシピ、献立、買い物リストを簡単に管理できる、日常の料理に役立つアプリです。
        </p>
      </section>

      <section>
        <h2 className="font-semibold">主な機能</h2>
        <ul className="list-disc list-inside">
          <li>レシピ・献立・買い物リストを管理できます。</li>
          <li>レシピや献立から買い物リストを自動生成します。</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">使用技術</h2>
        <ul className="list-disc list-inside">
          <li>Tailwind</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Next.js</li>
          <li>Supabase</li>
          <li>Vercel</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">工夫した点</h2>
        <ul className="list-disc list-inside">
          <li>3色配色のバランスルール</li>
          <li>モバイルファーストで設計</li>
          <li>登録材料から買い物リストへの自動変換</li>
          <li>TailwindでUIを統一</li>
          <li>Next.jsでSSR対応</li>
          <li>必要な機能を厳選</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">制作の背景</h2>
        <ul className="list-disc list-inside">
          <li>
            家族とレシピを共有したり、スムーズに買い物できる仕組みがほしいと感じ、自分の生活に役立つアプリとして制作しました。
          </li>
          <li>Next.js と TypeScript の学習・実践の場として取り組みました。</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">使い方</h2>
        <p>下記のテスト用メールアドレスとパスワードでログインしてください。</p>
        <ul className="list-disc list-inside">
          <li>メールアドレス: test@gmail.com</li>
          <li>パスワード: testtest</li>
        </ul>

        <Link
          href={'/dashboard'}
          className="text-center block mx-auto mt-6 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
        >
          使用してみる
        </Link>
      </section>
    </main>
  );
}
