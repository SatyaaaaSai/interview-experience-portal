import './App.css'
import Home from './pages/Home';
import UserExperience from './pages/UserExperience';
import MainPage from './pages/MainPage';
import WriteReview from './pages/WriteReview';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/view" element={<Home />} />
            <Route path="/write" element={<WriteReview />} />
            <Route path="/home/post/:id" element={<UserExperience />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
