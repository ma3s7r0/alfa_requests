import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';

function App() {

  const [posts, setPosts] = useState([])

  // adress of JsonServer
  const port = "3001"
  const server = "localhost"
  const baseURL = `http://${server}:${port}`

  useEffect(() => {
    axios.get(`${baseURL}/posts`)
      .then((response) => {
        console.log(response.data)
        setPosts([...response.data])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  let addPost = () => {
    axios.post(`${baseURL}/posts`, { "title": "Tiddel", "author": "alle zusammen" })
      .then(response => {
        setPosts(prevState => [...prevState, response.data])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let deletePost = (id) => {
    axios.delete(`${baseURL}/posts/${id}/`)
      .then(response => {
        setPosts(prevState => prevState.filter(ele => ele.id !== id))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let updatePost = (id) => {
    axios.put(`${baseURL}/posts/${id}/`, { "title": "meine Lebensgeschichte", "author": "du" })
    .then(response => {
      const updatedPosts = posts.map(ele => (ele.id === id ? response.data : ele))
      setPosts([...updatedPosts])
    })
    .catch(error => {
      console.log(error)
    })
}

  return (
    <div>
      {
        posts.length > 0 &&
        <>
          <h3>Posts</h3>
          <button onClick={addPost}>Hinzufügen</button>
          {
            posts.map(ele => (<div key={ele.id}>{ele.title}, {ele.author},
              <span onClick={() => updatePost(ele.id)}>Ändern</span>,
              <span onClick={() => deletePost(ele.id)}>Löschen</span></div>))
          }
        </>
      }
    </div>
  );
}

export default App;
