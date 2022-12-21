import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import NotFound from './components/pages/NotFound/NotFound';
import Home from './components/PizzaBlock/Home';
import FullPizza from './components/FullPizza.jsx/FullPizza';
const Basket = React.lazy(() => import(/*webpackChunkName: "Basket"*/ './components/pages/Basket/Basket')) ;
// import Basket from './components/pages/Basket/Basket';
import './scss/app.scss';
import './scss/_variables.scss';

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/basket" element={<Suspense fallback={<div>Загрузка...</div>}><Basket /></Suspense>}/>
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
