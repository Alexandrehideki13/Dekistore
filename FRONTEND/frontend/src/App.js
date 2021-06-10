import React, { useState, useEffect } from 'react';

import api from './Components/services/api';

import './global.css';

import Products from './Components/products';

function App() {
    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ allProducts, setAllProducts ] = useState([]);
    const [ searchId, setSearchId ] = useState('');

    useEffect(() => {
        async function getAllProducts(){
            const response = await api.get('/api/products',)
        
            setAllProducts(response.data)
        }

        getAllProducts();
    }, [])

    async function getAllProducts(){
        const response = await api.get('/api/products',)
    
        setAllProducts(response.data)
    }

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/api/product', {
            id,
            name,
            price
        })

        setName('');
        setPrice('');

        setAllProducts([...allProducts, response.data]);
    }
    
    async function handleDelete(id) {
        try {
            const deletedProduct = await api.delete(`/api/product/${id}`);

            if(deletedProduct) {
                setAllProducts(allProducts.filter(product => product.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();

        const search = await api.get(`/api/product/${searchId}`, {
            id,
            name,
            price
        })

        if(search) {
            setAllProducts(allProducts.filter(product => product.id === searchId));
        }

        setSearchId('');

    }

    return ( 
        <div>
            <div id="title"><h1><strong>Dekistore</strong></h1></div>
            
            <div id="app">
                <aside>
                    <form>
                        <div id="title-adding-product"><h2>Adding a new product</h2></div>
                        <div className="input-block">
                            <label htmlFor="id">Product's id</label><br></br>
                            <input 
                                required
                                placeholder="Product's id"
                                maxLength="15"
                                value={id}
                                onChange={e => setId(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-block">
                            <label htmlFor="name" id="product-name">Product's name</label><br></br>
                            <input 
                                required
                                placeholder="Product's name"
                                maxLength="30"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="price" id="product-price">Product's price</label><br></br>
                            <input 
                                required
                                placeholder="Product's price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        
                        <button type="submit" id="submit" onClick={handleSubmit}>Add product</button>
                    </form>
                </aside>

                <div className="search">
                    <input 
                    required
                    placeholder="Search some product with ID" 
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                    />
                    <div>
                        <button type="submit" onClick={handleSearch}>Search</button>
                        <button type="submit" onClick={getAllProducts} id="button-search-back">Back</button>
                    </div>
                </div>

                <main>
                    <ul>
                        {allProducts.map(data => (
                            <Products 
                            key={data.id}
                            data={data}
                            handleDelete={handleDelete} />
                        ))}
                    </ul>
                </main>
            </div>
        </div>    
    )
}

export default App;