import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './Variables';
import EditProduct from './Modals/EditProduct';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productCategories: [],
            sortType: 'ascending',
            sortBy: ''
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
        axios.get(`${API_URL}/ProductCategory`)
            .then(res => {
                this.setState({ productCategories: res.data });
            })
    }

    handleDelete = (id) => {
        axios.delete(`${API_URL}/Product/${id}`)
            .then(res => {
                const updatedProducts = this.state.products.filter(product => product.ID !== id);
                this.setState({ products: updatedProducts });
            })
            .catch(err => {
                console.log(err);
            });
    }



    sortProducts = (sortBy) => {
        const { products, sortType } = this.state;
        let sortedProducts;
        if (sortBy === 'price') {
            if (sortType === 'ascending') {
                sortedProducts = products.sort((a, b) => a.Price - b.Price);
                this.setState({ products: sortedProducts, sortType: 'descending' });
            } else {
                sortedProducts = products.sort((a, b) => b.Price - a.Price);
                this.setState({ products: sortedProducts, sortType: 'ascending' });
            }
        } else if (sortBy === 'productCategoryID') {
            if (sortType === 'ascending') {
                sortedProducts = products.sort((a, b) => a.ProductCategoryID - b.ProductCategoryID);
                this.setState({ products: sortedProducts, sortType: 'descending' });
            } else {
                sortedProducts = products.sort((a, b) => b.ProductCategoryID - a.ProductCategoryID);
                this.setState({ products: sortedProducts, sortType: 'ascending' });
            }
        }
    }

    UpdateProduct = (product) => {
        const updatedProducts = this.state.products.map(p => {
            if (p.ID === product.ID) {
                return product;
            }
            return p;
        });
        this.setState({ products: updatedProducts });
    }

    render() {
        const { products, productCategories } = this.state;

        products.map(product => {
            if (product.Image === null || product.Image === "") {
                product.Image = product.Name;
            }

            if (product.ProductCategoryID === null || product.ProductCategoryID === 0) {
                product.ProductCategoryID = 1;
            }
            product.ProductCategoryName = productCategories.find(
                category => category.ID === product.ProductCategoryID
            ).Name;
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                                
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Price
                                <button onClick={() => this.sortProducts('price')}>Sort</button>
                            </th>
                            <th>
                                Product Category
                                <button onClick={() => this.sortProducts('productCategoryID')}>Sort</button>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.ID}>
                                <td>{product.Name}</td>
                                <td>{product.Description}</td>
                                <td>R {product.Price}</td>
                                <td>{product.ProductCategoryName}</td>
                                <td>
                                    <EditProduct product={product} productCategories={productCategories} UpdateProduct={this.UpdateProduct} />
                                    <button onClick={() => this.handleDelete(product.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Product;