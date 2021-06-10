import React from 'react';

function Products({ data, handleDelete }) {

    async function updateProduct() {
        document.getElementById("title-adding-product").innerHTML = "<h2>Updating a product</h2>"
        document.getElementById("product-name").innerHTML = "New product's name"
        document.getElementById("product-price").innerHTML = "New product's price"
        document.getElementById("submit").innerHTML = "Update product"
    }

    return (
        <>
            <li className="products">
                <div>
                    <strong >{ data.name }</strong> 
                </div>
                <div className="img-product">
                    <img src="https://cdn.leroymerlin.com.br/categories/geladeiras_1e03_300x300.jpg"></img>
                </div>
                <div className="price-product">
                    <h3>R$ { data.price }</h3>
                </div>
                <div className="buttons-product">
                    <div className="setProduct">
                        <button type="submit" onClick={updateProduct}>set</button>
                    </div>
                    <div className="delete-product">
                        <button type="submit" onClick={() => handleDelete(data.id)}>delete</button>
                    </div>
                </div>  
            </li>
        </>
    )
}

export default Products;