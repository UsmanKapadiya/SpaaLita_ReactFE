import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header/Header';
import HomeScreen from './Pages/Home/HomeScreen';
import ServicesPage from './Pages/Services/ServicesPage';
import Facials from './Pages/Services/facials';
import BookPage from './Pages/Book/BookPage';
import ContactPage from './Pages/Contact/ContactPage';
import FontTest from './FontTest'; // Temporary for font testing
import Massage from './Pages/Services/massage';
import AcuPressure from './Pages/Services/acupressure';
import Manicure from './Pages/Services/manicure';
import BodyTreatment from './Pages/Services/bodyTreatment';
import Waxing from './Pages/Services/waxing';
import Spaa from './Pages/Services/spaa';
import Brows from './Pages/Services/brows';
import Laser from './Pages/Services/laser';
import GiftCard from './Pages/GiftCard/giftCard';
import MonthlySpecial from './Pages/MonthlySpecial/MonthlySpecial';
import BookingPolicy from './Pages/BookingPolicy/BookingPolicy';
import Gallery from './Pages/Gallery/Gallery';
import Cart from './Pages/CartAndCheckout/Cart';
import Checkout from './Pages/CartAndCheckout/Checkout'
import Shop from './Pages/Shop/Shop';
import ProductDetails from './Pages/ProductsDetails/ProductDetails';

// Placeholder components for other routes


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/facials" element={<Facials />} />
            <Route path="/facials" element={<Facials />} />
            <Route path="/massages" element={<Massage />} />
            <Route path="/acupressure" element={<AcuPressure />} />
            <Route path="/manicures-and-pedicures" element={<Manicure />} />
            <Route path="/body-treatments" element={<BodyTreatment />} />
            <Route path="/waxing" element={<Waxing />} />
            <Route path="/laser-hair-removal" element={<Laser />} />
            <Route path="/brows-and-lashes" element={<Brows />} />
            <Route path="/spa-packages" element={<Spaa/>} />
            <Route path="/giftcard" element={<GiftCard />} />
             <Route path="/shop" element={<Shop />} />
            <Route path="/product/:itemName" element={<ProductDetails />} />
            <Route path="/monthly-specials" element={<MonthlySpecial />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/spa-policy/" element={<BookingPolicy />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<Cart/>} />
             <Route path="/checkout" element={<Checkout/>} />
            <Route path="/font-test" element={<FontTest />} /> {/* Temporary for font testing */}
            {/* Catch all route for 404 */}
            <Route path="*" element={
              <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
                <h1 style={{ color: '#667eea' }}>404 - Page Not Found</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
