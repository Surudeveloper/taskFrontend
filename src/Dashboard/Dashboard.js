// Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice'; 
import './Dashboard.css';
const token = localStorage.getItem('token');
const url = `http://localhost:8191`;


const Dashboard = () => {
  // const [product, setProduct] = useState([]);
  // const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.items);
  const totalProducts = products.length;
  const dispatch = useDispatch();
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
          // setProduct(data); 
          dispatch(setProducts(data));
        } else {
          // setProduct([]); 
          // setError('Something went wrong while fetching Products Data');
        }
      } catch (error) {
        console.error('Server Error:', error);
        // setError('Server Error: Unable to fetch products');
        // setProduct([]); 
      }
    };

    fetchProducts();
  });


  const categories = [...new Set(products.map((product) => product.category))];
  const categoryCount = categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));

  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-summary">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Categories</h3>
          <p>{categories.length}</p>
        </div>

        <div className="stat-card top-products">
          <h3>Top Products by Price</h3>
          <ul>
            {topProducts.map((product) => (
              <li key={product.id}>
                <span className="product-name">{product.name}</span> 
                <span className="product-price">₹ {product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="category-stats">
        <h3>Products by Category</h3>
        <ul>
          {categoryCount.map((item) => (
            <li key={item.category}>
              <span className="category-name">{item.category}</span>
              <span className="category-count">{item.count} products</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
