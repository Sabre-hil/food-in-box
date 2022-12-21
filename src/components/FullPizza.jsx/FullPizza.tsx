import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
    rating: number
  }>({
    imageUrl: '',
    title: '',
    price: 0,
    rating: 0
  });
  const { id } = useParams();

  useEffect(() => {
    async function PizzaRender() {
      try {
        const { data } = await axios.get(`https://634954060b382d796c8383ef.mockapi.io/pizzas/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка');
        navigate('/');
      }
    }
    PizzaRender();
  }, []);


  return (
    <>
    {pizza.imageUrl !== '' ? (
      <div className={styles.block}>
      <div>
        <img className={styles.image} src={pizza.imageUrl} alt="pizza" />
      </div>
      <div className={styles.blockDescription}>
        <h2>{pizza.title}</h2>
        <div className={styles.propBlock}>
          <span className={styles.price}>
            {pizza.price}
            {' '}
            ₽
            {' '}
          </span>
          <span className={styles.rating}>
            Рейтинг
            {' '}
            {pizza.rating}
          </span>
        </div>
      </div>
    </div>
    ) : (<h1 className={styles.download}>Download....</h1>)}
    </>
  );
}

export default FullPizza
