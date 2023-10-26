import { useEffect } from 'react';
import './App.css';
import 'axios';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect (() => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);


  console.log(todos);
  return (
    <>
    <div>
      <h1>TodoList</h1>
    </div>
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
