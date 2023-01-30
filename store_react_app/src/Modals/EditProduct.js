import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Variables';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: this.props.product.ID,
            Name: this.props.product.Name,
            Image: this.props.product.Image,
            Description: this.props.product.Description,
            Price: this.props.product.Price,
            ProductCategoryId: this.props.product.ProductCategoryId,
            modalOpen: false,
            productCategories: [],
            UpdateProduct: this.props.UpdateProduct
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
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


    
    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('ID', this.state.ID);
        formData.append('Name', this.state.Name);
        formData.append('Image', this.state.Image);
        formData.append('Description', this.state.Description);
        formData.append('Price', this.state.Price);
        formData.append('ProductCategoryId', this.state.ProductCategoryId);

        axios
            .put(`${API_URL}/Product/${this.state.ID}`, formData)
            .then((res) => {
                console.log(res);
                this.setState({ modalOpen: false });
                this.props.UpdateProduct(res.data);
            })
            .catch((err) => console.log(err));
        
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }







    
    render() {
        const { productCategories } = this.props;

        return (
            <div>
                <button onClick={this.openModal}>Edit</button>
                <Modal show={this.state.modalOpen} onClose={this.closeModal}>
                    <form onSubmit={this.handleSubmit}>
                        <label>ID:</label>
                        <input type="text" name="ID" value={this.state.ID} onChange={this.handleChange} disabled={true} />
                        <label>Name:</label>
                        <input type="text" name="Name" value={this.state.Name} onChange={this.handleChange} />
                        <label>Image:</label>
                        <input type="text" name="Image" value={this.state.Image} onChange={this.handleChange} />
                        <label>Description:</label>
                        <input type="text" name="Description" value={this.state.Description} onChange={this.handleChange} />
                        <label>Price:</label>
                        <input type="number" name="Price" value={this.state.Price} onChange={this.handleChange} />
                        <label>ProductCategoryId:</label>
                        <select value={this.state.ProductCategoryId || ''} onChange={this.handleChange} name="ProductCategoryId" required>
                            <option value="">Select a Category</option>
                            {productCategories ? productCategories.map(c => (
                                <option key={c.ID} value={c.ID}>{c.Name}</option>
                            )) : null}
                        </select>
                        <input type="submit" value="Submit" />
                        <button onClick={this.closeModal}>Close</button>
                    </form>
                </Modal>
            </div>
        );
    }


    
}

export default EditProduct;