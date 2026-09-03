import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-black">
        <Navbar />
        <CartDrawer />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection title="All Collection" />} />
            <Route path="/men" element={<Collection category="Men" title="Men Collection" />} />
            <Route path="/women" element={<Collection category="Women" title="Women Collection" />} />
            <Route path="/new" element={<Collection title="New Arrivals" />} />
            <Route path="/bestsellers" element={<Collection title="Bestsellers" />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
