import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/productSlice'; 
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const token = localStorage.getItem('token');
const url = `http://localhost:8191`;

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
      filterProducts();
    }, [searchTerm, selectedCategory, products]);
  const categories = [...new Set(products.map((product) => product.category))]; // Get unique categories
  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const result = await fetch(`${url}/product`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (result.ok) {
          const data = await result.json();
          setProduct(data); 
          dispatch(setProducts(data));
        } else {
          setProduct([]); 
          setError('Something went wrong while fetching Products Data');
        }
      } catch (error) {
        console.error('Server Error:', error);
        setError('Server Error: Unable to fetch products');
        setProduct([]); 
      }
    };

    fetchProducts();
  }); 

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const navigate = useNavigate();
  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    // Add logic to edit the product
    navigate('/product-form')
  };

  const handleDelete = async (productId) => {
    try {
      const result = await fetch(`${url}/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data= await result.json()
      if (result.ok) {
        setProducts(data);
        // setProducts(products.filter((product) => product.id !== productId));
      } else {
        setError('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Server Error: Unable to delete product');
    }
  };

  return (
    <div className="page-container">
      <div className="table-container">
        <h2>Products</h2>
        <div className="table-wrapper">
          {error && <p>{error}</p>} 
          <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
          {/* <table className="table"> */}
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Category</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td className="actions-column">
                      <div className="action-icons">
                        <FaEdit className="edit-icon" 
                          onClick={() => handleEdit(product.id)}
                          title="Edit"/>

                        <FaTrash className="delete-icon" 
                          onClick={() => handleDelete(product.id)}
                          title="Delete"/>
                          
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
