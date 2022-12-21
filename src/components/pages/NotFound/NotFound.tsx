import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

 const NotFound: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1>Извините, но такой страницы не существует 😞</h1>
      <br />
      <button className={styles.button} type="button"><Link to="/">Вернуться на главную страницу</Link></button>
    </div>
  );
}

export default NotFound