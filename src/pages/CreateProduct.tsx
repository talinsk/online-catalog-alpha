import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import type { TProduct } from '../utils/types';
import { addProduct } from '../features/products/productsSlice';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    manufacturer: '',
    thumbnail: ''
  });

  const [errors, setErrors] = useState({ title: '', manufacturer: '' });

  const validate = () => {
    const newErrors = { title: '', manufacturer: '' };
    if (formData.title.trim().length === 0) {
      newErrors.title = 'Укажите название товара';
    }
    if (formData.manufacturer.trim().length === 0) {
      newErrors.manufacturer = 'Укажите производителя';
    }
    setErrors(newErrors);
    return !newErrors.title && !newErrors.manufacturer;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const newProduct: TProduct = {
      id: Date.now(),
      title: formData.title,
      manufacturer: formData.manufacturer,
      thumbnail: formData.thumbnail,
      total_rating: 0,
      category_name: '',
      isFavorite: false
    };

    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <section className={styles.container}>
      <h1 className="header">Новый продукт</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Название продукта*</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={errors.title ? styles.errorInput : ''}
            placeholder="Например: Кетчуп 'Новый'"
          />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label>Производитель*</label>
          <input 
            type="text" 
            value={formData.manufacturer}
            onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
            className={errors.manufacturer ? styles.errorInput : ''}
            placeholder="Например: Calve"
          />
          {errors.manufacturer && <span className={styles.errorText}>{errors.manufacturer}</span>}
        </div>

        <div className={styles.field}>
          <label>URL изображения</label>
          <input 
            type="text" 
            value={formData.thumbnail}
            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
            placeholder="https://images.com"
          />
        </div>

        <button type="submit" className="primaryBtn">Добавить в каталог</button>
      </form>
    </section>
  );
};

export default CreateProduct;
