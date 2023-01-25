import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import LoginModal from './Modals/Login';
import Product from './Product';


class App extends Component {
    
    render() {
        return (
            <div>
                <h1>Store React App</h1>


                <LoginModal />


               

                <Product />

            </div>
        );
    }
}

export default App;
