import { Layout } from '../components/layout/layout.tsx';

export default function AboutPage() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-around max-w-screen">
        <h1 className="text-2xl font-bold text-pink-600 p-3 text-center max-[520px]:text-xl  transition-all duration-200 ease-in-out">
          About Page{' '}
        </h1>
        <p className="text-gray-600 text-center p-5 text-xl">
          Fun Chat is a real-time messaging web application built with WebSocket for instant
          communication.
        </p>
        <p className={'text-gray-600 text-center p-5 text-xl'}>
          This project demonstrates modern frontend development skills, state management, and
          networking capabilities.
        </p>
      </main>
    </Layout>
  );
}
