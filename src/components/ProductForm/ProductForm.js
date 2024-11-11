import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./ProductForm.css";
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/loader';
import Toaster from '../Toaster/Toaster';
const token = localStorage.getItem('token');
const url = 'http://localhost:8191'


const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [isShowLoader, setLoader] = useState(false); 
  const { productId } = useParams();
  const navigate = useNavigate();


  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === productId)
  );

  useEffect(() => {
    if (productId && product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setCategory(product.category || '');
    } else {
      setName('');
      setPrice('');
      setCategory('');
    }
  }, [productId, product]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (productId) {
      // Dispatch update product action
    } else {
      try {
        setLoader(true)
        const userData = { name, price, category };
        const Result = await fetch(`${url}/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });
        if (Result.ok) {
          await Result.json();
          navigate('/product-list');
        } else {
          setError('Something went wrong.');
        }
      } catch (err){
        console.error('Failed to create Product:', err);
      }finally{
        setName('');
        setPrice('');
        setCategory('');
        setLoader(false)
      }
    }
  };

  return (
    <div className="container">
      <h2>{productId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit">
          {productId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      {error && <Toaster message={error} onClose={() => setError('')} />}
      {isShowLoader && <Loader />}
    </div>
  );
};


export default ProductForm;
