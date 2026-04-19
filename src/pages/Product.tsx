import { Link, useParams } from 'react-router-dom';
import styles from './Product.module.css';
import { useAppSelector } from '../app/hooks';
import { getProductById } from '../features/products/productsSlice';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const numId = (id && !isNaN(Number(id))) ? Number(id) : null;

  const product = useAppSelector((state) => 
    numId !== null ? getProductById(state, numId) : null
  );

  if (!product) {
    return <h2>Товар не найден</h2>;
  }
  return (
    <section>
      <Link to="/products" className={styles.backlink}>
        ← Назад к списку продуктов
      </Link>
    
      <div className="product-details">
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>ID товара: {product.id}</p>
        <p>Производитель: {product.manufacturer}</p>
        <p>Рейтинг: {product.total_rating}</p>
      </div>
      
      <Link to="/products" className={styles.backlink}>
        ← Назад к списку продуктов
      </Link>
    </section>
  );
};

export default ProductPage;
