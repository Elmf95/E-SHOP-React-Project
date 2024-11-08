import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Update = () => {

    const [article,setArticle] = useState({
        name:'',
        category:'',
        brand:'',
        price:5000,
        content:'',
        stock:5,
        online:'',
        picture:[{
            img:"",
            img1:"",
            img2:""
        }]
    })
    
    const {idArticle} = useParams()
    
    console.log(idArticle);

    useEffect(() => {

        const fetchArticleById = async () => {
          try{
            const {data} = await axios.get(`http://localhost:8000/api/article/get/${idArticle}`)
            // console.log(data);
             setArticle(data)
          }catch(err){
            console.error(err.message);
          }
        }
        fetchArticleById()
      },[])

    const handleChange = (e) => {
        
        const { name, value } = e.target

        if(name === "img" || "img1" || "img2"){
            let image = name
            setArticle(prevArticle => ({...prevArticle, picture: [{...prevArticle.picture, [image]:value} ]}))
        }
        setArticle(prevarticle => ({...prevarticle, [name] :value}))

        console.log(article.picture);    
    }
    
    const handleSubmit = (e) => {
    
        e.preventDefault()

        const updateArticle = async (idArticle) => {
            try{
                const {data} = await axios.put(`http://localhost:8000/api/article/update/${idArticle}`,{
                    name: article.name,
                    category:article.category,
                    brand:article.brand,
                    price:article.price,
                    content:article.content,
                    stock:article.stock,
                    online:article.online,
                    picture:article.img
                })
                console.log(data)
            }catch(err){
                console.error(err.message);
            }
        }
        
        updateArticle()

    }





    return (
        <div>
        <h1>Mise à jour de l'article: </h1> 
        <form onSubmit={handleSubmit}> 
            <label>Nom:</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Entrer le nom de l'article" 
                onChange={handleChange} 
                value={article.name}
                required
            />
            <label>Catégorie:</label>
            <input 
                type="text" 
                id="category" 
                name="category" 
                placeholder="Entrer la catégorie de l'article" 
                value={article.category}
                onChange={handleChange} 
            />
            <label>Marque:</label>
            <input 
                type="text" 
                id="brand" 
                name="brand" 
                placeholder="Entrer la marque de l'article" 
                value={article.brand}
                onChange={handleChange} 
            />
            <label>Prix</label>
            <input 
                type="number" 
                id="price" 
                name="price" 
                placeholder="Entrer le prix de l'article" 
                value={article.price}
                onChange={handleChange} 
            />
            <label>Contenu:</label>
            <input 
                type="text" 
                id="content" 
                name="content" 
                placeholder="Entrer la description de l'article" 
                value={article.content}
                onChange={handleChange} 
            />
            <label>Stock</label>
            <input 
                type="number" 
                id="stock" 
                name="stock"  
                value={article.stock}
                onChange={handleChange} 
            />
            
            <label>Image principale:</label>
            <input type="text" id="img" name="img" placeholder="Entrer l'url de l'image " onChange={handleChange} required />

            <label>Image secondaire 1:</label>
            <input type="text" id="img1" name="img1" onChange={handleChange} />

            <label>Image secondaire 2:</label>
            <input type="text" id="img2" name="img2" onChange={handleChange} />

            <button type="submit">Ajouter</button>
        </form>
    </div>
  )
}

export default Update