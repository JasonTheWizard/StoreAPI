import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './Variables';
import EditProduct from './Modals/EditProduct';
// import DeleteProduct from './DeleteProduct';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get(`${API_URL}/Product`)
            .then(res => {
                this.setState({ products: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
    


    
    render() {
        const { products } = this.state;
        
        // set the image field to the product name if it is empty
        products.map(product => {
            if (product.Image === null || product.Image === "") {
                product.Image = product.Name;
            }
        });
        
        return (
            <div>
                {products.map(product => (
                    <div key={product.ID} className="card">
                        <h2>{product.Name}</h2>
                        <img src={product.Image} alt={product.Name} />
                        <p>{product.Description}</p>
                        <p>Price: R {product.Price}</p>
                        <p>Product Category ID: {product.ProductCategoryID}</p>
                        < EditProduct product={product} />
                        
                    </div>
                ))}
            </div>
        );
    }
}

export default Product;
