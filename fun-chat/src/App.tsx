import './App.css';
import { AboutPage } from './pages/about/about.tsx';
import { Footer } from './components/footer/footer.tsx';
import { Header } from './components/header/header.tsx';

function App() {
  return (
    <>
      <div>
        <Header />
        <AboutPage />
        <p>heh</p>
        <Footer />
      </div>
    </>
  );
}

export default App;
