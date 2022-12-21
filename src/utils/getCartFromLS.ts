import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../redux/slices/cartSlice';
export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items =  data? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice: totalPrice
  }
}