import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Detail = () => {

  const {idArticle} = useParams()
  // console.log(idArticle);
  
  

  const [article,setArticle]= useState({})

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
  // console.log(article);
  return (
    // <div></div>
    <div key={article._id}>
      <img src ={article.picture} alt="article"/>
      <p>{article.name}</p>
      <p>{article.price} €</p>
    </div>
  )
}

export default Detail