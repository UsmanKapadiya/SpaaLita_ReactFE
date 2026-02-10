import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
import Header from './Component/Header/Header';
import HomeScreen from './Pages/Home/HomeScreen';
import ServicesPage from './Pages/Services/ServicesPage';
import Facials from './Pages/Services/Facials';
import ContactPage from './Pages/Contact/ContactPage';
import Massage from './Pages/Services/Massage';
import AcuPressure from './Pages/Services/Acupressure';
import Manicure from './Pages/Services/Manicure';
import BodyTreatment from './Pages/Services/BodyTreatment';
import Waxing from './Pages/Services/Waxing';
import Spaa from './Pages/Services/Spaa';
import Brows from './Pages/Services/Brows';
import Laser from './Pages/Services/Laser';
import GiftCard from './Pages/GiftCard/GiftCard';
import MonthlySpecial from './Pages/MonthlySpecial/MonthlySpecial';
import BookingPolicy from './Pages/BookingPolicy/BookingPolicy';
import Gallery from './Pages/Gallery/Gallery';
import Cart from './Pages/CartAndCheckout/Cart';
import Checkout from './Pages/CartAndCheckout/Checkout';
import Shop from './Pages/Shop/Shop';
import ProductDetails from './Pages/ProductsDetails/ProductDetails';
import MyAccount from './Pages/MyAccount/MyAccount';
import LostPassword from './Pages/MyAccount/LostPassword';

// NotFound Component
const NotFound: FC = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>404 - Page Not Found</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>The page you're looking for doesn't exist.</p>
  </div>
);

const App: FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
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
            <Route path="/spa-packages" element={<Spaa />} />
            <Route path="/giftcard" element={<GiftCard />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:itemName" element={<ProductDetails />} />
            <Route path="/monthly-specials" element={<MonthlySpecial />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/spa-policy/" element={<BookingPolicy />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account/*" element={<MyAccount />} />
            <Route path="/my-account/lost-password" element={<LostPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
