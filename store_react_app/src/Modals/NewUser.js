import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { API_URL } from '../Variables';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            password: '',
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, password } = this.state;
        const user = { name, password };
        fetch('${API_URL}/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.handleClose();
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add User
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formUserName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formUserPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default NewUser;
