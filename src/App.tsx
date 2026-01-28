import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import HomeScreen from './Pages/Home/HomeScreen';

function App() {
  return (
    <div>
      <Header />
      <main>
        <HomeScreen />
      </main>
      <Footer />
    </div>
  );
}

export default App
