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

// Placeholder components for other routes
const GiftCardPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Gift Cards</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Gift card page coming soon!</p>
  </div>
);

const ShopPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Shop</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Online shop coming soon!</p>
  </div>
);

const SpecialsPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Monthly Specials</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Current specials and promotions coming soon!</p>
  </div>
);

const PolicyPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Booking Policy</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Booking policies and terms coming soon!</p>
  </div>
);

const GalleryPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Gallery</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Photo gallery coming soon!</p>
  </div>
);

const CartPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>Shopping Cart</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty. Shop our services and products!</p>
  </div>
);

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
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/specials" element={<SpecialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/cart" element={<CartPage />} />
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
