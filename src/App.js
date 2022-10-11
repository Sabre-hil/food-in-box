import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Sort from './components/Sort/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import './scss/app.scss'
import './scss/_variables.scss'

function App() {
  return (
    <div className="App">
    <Header/>
    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px', alignItems: 'center'}} className='block'>
      <Categories/>
      <Sort/>
    </div>
    <PizzaBlock title='Пицца с солями' price='399'/>
    <PizzaBlock title='Кавказская пицца' price='599'/>
    <PizzaBlock title='Биг Пицца' price='899'/>
    <PizzaBlock title='Пицца с грибами' price='299'/>
    <PizzaBlock title='Мексиканская пицца' price='699'/>
    
     <Routes>
       <Route/>
     </Routes>
    </div>
  );
}

export default App;
