import { Layout } from '../components/layout/layout.tsx';

export function ErrorPage() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          Error Page
        </h1>
        <p className="text-xl">🥲 Page Not Found 🥲</p>
        <img src={'/sasa.jpg'} alt={'error page '} />
      </main>
    </Layout>
  );
}
