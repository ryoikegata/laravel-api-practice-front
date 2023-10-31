import { useEffect } from 'react';
import './App.css';
import 'axios';
import axios from 'axios';
import { useState } from 'react';
import CreateForm from './components/CreateForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [labels, setLabels] = useState([]);



  useEffect (() => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/api/todo_labels")
      .then((response) => setLabels(response.data))
      .catch((error) => console.log(error));
  }, [setTodos]);





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
      ...todo,
      completed: updatedComplete,
    })
    .then((response) => {
      const updatedTodo = response.data;
      console.log(updatedTodo);
    setTodos((prevTodos) => {
      // 前回の状態をもとに新しいToDoリストを生成
      return prevTodos.map((t) => {
        if (t.id === updatedTodo.id) {
          return updatedTodo;
        } else {
          return t;
        }
      });
    });
    })
    .catch((error) => {
      console.error('ToDoの更新に失敗しました', error);
    });
  }
  

  const clickEvent = () => {
    alert("hello");
  }
  return (
    <div className='bg-gray-300 w-full h-screen'>
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
    <div>
      <CreateForm labels={labels} setTodos={setTodos} todos={todos} />
    </div>
    <button onClick={clickEvent}>click</button>
    </div>
  );
}

export default App;
