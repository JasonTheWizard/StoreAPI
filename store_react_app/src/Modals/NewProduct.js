import React, { useState, useEffect } from 'react';
import { API_URL } from '../Variables';

const NewProduct = () => {
    const [visible, setVisible] = useState(false);
    const [productCategories, setProductCategories] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Image: '',
        Description: '',
        Price: '',
        ProductCategoryID: ''
    });

    useEffect(() => {
        fetch(`${API_URL}/ProductCategory`)
            .then(response => response.json())
            .then(data => {
                setProductCategories(data);
            });
    }, []);

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        fetch(`${API_URL}/Product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setVisible(false);
            });
    };

    return (
        <div>
            <button onClick={() => setVisible(true)}>Add New Product</button>
            {visible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Name">Name:</label>
                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Image">Image:</label>
                        <input
                            type="text"
                            id="Image"
                            name="Image"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Description">Description:</label>
                        <input
                            type="text"
                            id="Description"
                            name="Description"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Price">Price:</label>
                        <input
                            type="number"
                            id="Price"
                            name="Price"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ProductCategoryID">Product Category:</label>
                        <select
                            id="ProductCategoryID"
                            name="ProductCategoryID"
                            required
                            onChange={handleInputChange}
                        >
                            <option value="">Select a product category</option>
                            {productCategories.map(category => (
                                <option key={category.ID} value={category.ID}>
                                    {category.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Save</button>
                    <button onClick={() => setVisible(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
}




export default NewProduct;