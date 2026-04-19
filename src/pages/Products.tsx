import { useEffect, useState } from 'react';
import styles from './Products.module.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/actions';
import { deleteProduct, toggleFavorite } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

const Products = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
  
  const { items, isLoading } = useAppSelector((state) => state.products);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, isLoading]);
  
  if (isLoading) return <div>Загрузка товаров...</div>;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить товар?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  const displayedItems = items
    .filter(item => (filter === 'favorites' ? item.isFavorite : true))
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <section className={styles.catalog}>
        <h1 className="header">Каталог продуктов</h1>
        <div className={styles.topBar}>
          <div className={styles.filterControls}>
            <button 
              className={`${styles.filterLink} ${filter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setFilter('all')}
            >
              Все товары
            </button>
            <button 
              className={`${styles.filterLink} ${filter === 'favorites' ? styles.filterActive : ''}`}
              onClick={() => setFilter('favorites')}
            >
              Избранное ({items.filter(i => i.isFavorite).length})
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Поиск по названию"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
          <button 
            className="primaryBtn" 
            onClick={() => navigate('/create-product')}
          >
            + Добавить товар
          </button>
        </div>
        <div className={styles.list}>
          {displayedItems.map((product) => (
            <article key={product.id} className={styles.card} onClick={() => handleProductClick(product.id)}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className={styles.image} 
                />
              </div>
              <h3 className={styles.title} title={product.title}>{product.title}</h3>
              <p><strong>{product.id}</strong></p>
              <div className={styles.actions}>
              <button 
                className={`${styles.iconBtn} ${styles.iconHeartBtn} ${product.isFavorite ? styles.iconHeartBtnActive : ''}`}
                onClick={(e) => handleFavorite(e, product.id)}
              >
              </button>
              
              <button 
                className={`${styles.iconBtn} ${styles.iconTrashBtn}`} 
                onClick={(e) => handleDelete(e, product.id)}
              >
              </button>
            </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;