import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Добро пожаловать в тестовый каталог продуктов
        </h1>
        <p className={styles.description}>
          Откройте для себя коллекцию лучших товаров с возможностью сохранять в избранное, добавлять и удалять.
        </p>
        <Link to="/products" className="primaryBtn">
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
};

export default Home;