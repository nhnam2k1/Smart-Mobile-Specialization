import React, { useState } from 'react';
import "./ProductCardHorizontal.css";

const ProductCardHorizontal = ({name, description, imgLink}) => {
    return(
        <div className="Product-card-horizontal">
            <div className="product-card">
                <div className="item-name">{name}</div>
                <div className="description">{description}</div>
                <div className="favorite">
                    <i className="fa fa-heart"></i>
                </div>
                <div className="image-product-1">
                    <img src={imgLink} alt="" className="img-cover"/>
                </div>
                <div className="shop-button-group">
                    <button className="shop-button">Shop</button>
                </div>
                <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
            </div>
        </div>
    );
}

export default ProductCardHorizontal;