import { Header } from '../components/header/header.tsx';
import { Footer } from '../components/footer/footer.tsx';

export default function AboutPage() {
  return (
    <main className={'flex flex-col items-center justify-center'}>
      <Header />
      <h1 className="text-2xl font-bold text-pink-600 p-3 text-center">About Page </h1>
      <p className={'text-gray-600 text-center p-5'}>
        Popik Chat is a real-time messaging web application built with WebSocket for instant
        communication.
      </p>
      <p className={'text-gray-600 text-center p-5'}>
        This project demonstrates modern frontend development skills, state management, and
        networking capabilities.
      </p>
      <Footer />
    </main>
  );
}
