import React from "react";
import { API_URL } from "../Variables";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            username: '',
            password: '',
            loginSuccess: null,
        };
    }

    handleOpenModal = () => {
        this.setState({ modalOpen: true });
    }

    handleCloseModal = () => {
        this.setState({ modalOpen: false });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${API_URL}/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        });
        const data = await response.json();
        this.setState({ loginSuccess: data });
        if (data) {
            alert('Login successful');
        } else {
            alert('Incorrect username or password');
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Login</button>
                {this.state.modalOpen && (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Username:
                                <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </label>
                        </form>
                        <br />
                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                        <button onClick={this.handleCloseModal}>Cancel</button>
                    </div>
                )}
            </div>
        );
    }
}

export default LoginModal;
