import React, { useState } from 'react';
import axios from 'axios';

const Ajout = () => {
    const [article, setArticle] = useState({
        name: '',
        category: '',
        brand: '',
        price: 5000,
        content: '',
        stock: 5,
        online: '',
        picture: {
            img: "",
            img1: "",
            img2: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Vérification des champs d'image pour mettre à jour uniquement l'objet `picture`
        if (name === "img" || name === "img1" || name === "img2") {
            setArticle(prevArticle => ({
                ...prevArticle,
                picture: { 
                    ...prevArticle.picture, 
                    [name]: value 
                }
            }));
        } else {
            // Mettre à jour les autres champs
            setArticle(prevArticle => ({
                ...prevArticle,
                [name]: value
            }));
        }

        console.log(article);  // Pour voir l'état actuel de l'article
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const AddArticle = async () => {
            try {
                const { data } = await axios.post("http://localhost:8000/api/article/add", {
                    name: article.name,
                    category: article.category,
                    brand: article.brand,
                    price: article.price,
                    content: article.content,
                    stock: article.stock,
                    online: article.online,
                    picture: article.picture  // Envoyer tout l'objet picture
                });
                console.log(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        AddArticle();
    };

    return (
        <div>
            <h1>Ajout d'un article</h1>
            <form onSubmit={handleSubmit}>
                <label>Nom:</label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Entrer le nom de l'article" 
                    onChange={handleChange} 
                    required 
                />
                
                <label>Catégorie:</label>
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Entrer la catégorie de l'article" 
                    onChange={handleChange} 
                />
                
                <label>Marque:</label>
                <input 
                    type="text" 
                    name="brand" 
                    placeholder="Entrer la marque de l'article" 
                    onChange={handleChange} 
                />
                
                <label>Prix</label>
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Entrer le prix de l'article" 
                    onChange={handleChange} 
                />
                
                <label>Contenu:</label>
                <input 
                    type="text" 
                    name="content" 
                    placeholder="Entrer la description de l'article" 
                    onChange={handleChange} 
                />
                
                <label>Stock</label>
                <input 
                    type="number" 
                    name="stock" 
                    onChange={handleChange} 
                />
                
                <label>Online:</label>
                <input 
                    type="text" 
                    name="online" 
                    onChange={handleChange} 
                />
                
                <label>Image principale:</label>
                <input 
                    type="text" 
                    name="img" 
                    placeholder="Entrer l'URL de l'image principale" 
                    onChange={handleChange} 
                    required 
                />

                <label>Image secondaire 1:</label>
                <input 
                    type="text" 
                    name="img1" 
                    onChange={handleChange} 
                />

                <label>Image secondaire 2:</label>
                <input 
                    type="text" 
                    name="img2" 
                    onChange={handleChange} 
                />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default Ajout;
