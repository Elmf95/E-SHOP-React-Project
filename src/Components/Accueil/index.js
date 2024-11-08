import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Corbeille from '../Assets/supprimer.png'

const Home = () => {

    const [articleTab, setArticleTab] = useState([]) // State pour stocker l'ensemble des articles 

    useEffect(() => {

        const fetchArticle = async () => {
            try {
                const{data , status} = await axios.get('http://localhost:8000/api/article/get')
                // console.log(status)
                if(status === 200) setArticleTab(data)    
            }catch(err){
                console.error(err.message);
            }
        }
        fetchArticle()
    },[])
    // console.log(articleTab);

    const deleteArticle = async (idArticle) => {
        try{
            const data = await axios.delete(`http://localhost:8000/api/article/delete/${idArticle}`)
            console.log(data)
        }catch(err){
            console.error(err.message);
        }
    }

  return (
    <div>
        <h1>Bienvenue sur E-SHOP</h1>
        {
            articleTab.map(article => article.online && (
                <div key={article._id}>
                    <Link to={{pathname: `/detail/${article._id}`}}>
                      <img src ={article.picture.img} alt="article"/>
                    </Link>
                    <p>{article.name}</p>
                    <p>{article.price} €</p>
                    <Link to={{pathname: `/update/${article._id}`}}>
                      <button>Mettre à jour</button>
                    </Link>
                    <img src={Corbeille} width={20} alt= "corbeille" onClick={() => deleteArticle(article._id)} />
                </div>
            ))
        }

    </div>
  )
}

export default Home