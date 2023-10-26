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
  }, [todos]);


  console.log(todos);


  function deleteTodo (todo) {
    fetch(`http://localhost:8080/api/todos/${todo.id}`,
    {method: 'DELETE',})
    .then((response) => {
      if (response.ok) {
        // 削除が成功した場合、削除されたToDoをローカルのステートから削除
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
      } else {
        console.error('ToDoの削除に失敗しました');
      }
    });


  }

  function completeClick(todo) {
    // todo.completed の値を切り替える
    const updatedComplete = todo.completed === 0 ? 1 : 0;
  
    // サーバーに更新を送信
    axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
      completed: updatedComplete,
    })
    .then((response) => {
      // サーバーの更新が成功したら、ローカルのToDoアイテムも更新
      todo.completed = updatedComplete;
    })
    .catch((error) => {
      console.error('ToDoの更新に失敗しました', error);
    });
  }
  
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
          <button onClick={() => completeClick(todo)}>{todo.completed === 0 ? "完了" : "未完了" }</button>
          <button onClick={() => deleteTodo(todo)}>削除する</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
