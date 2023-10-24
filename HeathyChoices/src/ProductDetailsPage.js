import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./ProductDetailsPage.css";

import ProgressBar from "./Components/ProgressBar";

const API_KEY = process.env.REACT_APP_OPEN_AI;
const CHAT_GPT = "https://api.openai.com/v1/chat/completions";

const ProductDetailsPage = () => {
    const [ advice, setAdvice ] = useState("");
    const { state } = useLocation();
    const { logoName, description, name, url } = state;
    const metrics = ["Sustainability", "Fair Trade", "Carbon footprint", "Transparency", "Social impact"];

    const message = `Can you give the feedback of Sustainability, Fair Trade, 
                    Carbon footprint, Transparency and Social impact of ${description} from ${logoName},
                    without "As an AI language model.." in the response ?`;
    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": message}],
        "max_tokens": 2048
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    }

    useEffect(() => {
        fetch(CHAT_GPT, { 
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(result => {
            let message = result.choices[0].message.content;
            setAdvice(message);
        })
        .catch(err => {
            console.error(err);
            alert(err.message);
        });
    }, []);

    return(
        <div className="page">
            <div className="nav-bar">
                <div className="navbar-text">
                    {name}
                </div>
            </div>
            <div className="main-frame">
                <div className="image-product">
                    <img src={url} alt="" className="img-cover"/>
                </div>
                <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
                <div className="metric-summary">
                    <div className="summary-label">
                        Ethics and Sustainability Summary
                        {metrics.map(metric =>{
                            let percentage = Math.random() * 100;
                            percentage = Math.round(percentage);
                            return <ProgressBar key={metric} name={metric} percentage={percentage}/>
                        })}
                    </div>
                </div>
                <div className="metric-advice">
                    <div className="advice-label">
                        Advice
                    </div>
                    <div className="advice-detail">
                        {advice}
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default ProductDetailsPage;