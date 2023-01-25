import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './Variables';

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(API_URL);
            setProducts(result.data);
        }
        fetchData();
    }, []);

    const handleEdit = (id) => {
        // Use PutProduct to handle editing the product
    }

    const handleDelete = (id) => {
        // Use DeleteProduct to handle deleting the product
    }

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <div>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <button onClick={() => handleEdit(product.id)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Product;