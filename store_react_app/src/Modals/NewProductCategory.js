import React, { useState } from 'react';
import { API_URL } from '../Variables';
import { Button, Modal, Form } from 'react-bootstrap';

class NewProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: ''
        };
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/ProductCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: this.state.name
                })
            });
            const data = await response.json();
            console.log(data);
            this.setState({ showModal: false, name: '' });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <>
                <button onClick={() => this.setState({ showModal: true })}>
                    Add New Category
                </button>
                {this.state.showModal && (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={() => this.setState({ showModal: false })}>
                            Close
                        </button>
                    </div>
                )}
            </>
        );
    }
}

export default NewProductCategory;
