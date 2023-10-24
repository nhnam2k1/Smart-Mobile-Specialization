import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import ProductCardHorizontal from './Components/ProductCardHorizontal';
import "./SearchPage.css";

const API_KEY = process.env.REACT_APP_OPEN_AI;
const CHAT_GPT = "https://api.openai.com/v1/images/generations";

const SearchPage = () =>{
    const { state } = useLocation();
    const { labelAnnotations, logoAnnotations } = state;
    const logoName = logoAnnotations?.[0].description ?? "";
    const shortBrandname = logoName.split(' ')[0] ?? "";

    const [query, setQuery] = useState(logoName);
    const [items, setItems] = useState([]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    }

    useEffect(() =>{
        let results = labelAnnotations?.map(async labelAnnotation => {
            let keyItem = labelAnnotation.mid;
            let description = labelAnnotation.description;
            let name = `${shortBrandname}'s ${description}`;

            let prompt = `${logoName}'s ${description}`;
            let body = {
                "prompt": prompt,
                "size": "512x512"
            };

            let response = await fetch(CHAT_GPT, { 
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            let result = await response.json();
            let url = result.data[0].url;
            let item = <ProductCardHorizontal  name={name} description={description} imgLink={url}/>
            let state = {logoName, description, name, url};
            return <Link key={keyItem} to="../product/detail" state={state}>{item}</Link>
        });

        Promise.all(results)
        .then(results => {
            console.log(results);
            setItems(results);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return(
        <div className="search-page">
            <div className="nav-bar">
                <div className="navbar-text">
                    Healthy Choices
                </div>
            </div>
            <div className="search-input">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    className="search-input__input"
                    placeholder="Search..."
                />
                <button
                    className="search-input__button"
                    onClick={() => console.log(`Searching for "${query}"...`)}
                >
                    Search
                </button>
            </div>
            <div className="product-cards">
                {items}
            </div>
        </div>
    );
}

export default SearchPage;