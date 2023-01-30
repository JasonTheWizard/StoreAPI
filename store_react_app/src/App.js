import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import LoginModal from './Modals/Login';
import Product from './Product';
import NewProduct from './Modals/NewProduct';
import NewProductCategory from './Modals/NewProductCategory';
import NewUser from './Modals/NewUser';


class App extends Component {
    
    render() {
        return (
            <div>
                <h1>Store React App</h1>


                <LoginModal />

                <NewUser />

                <NewProduct />

                <NewProductCategory />


                
                <div>
                    <Product />
                </div>
                

            </div>
            
        );
    }
}

export default App;
