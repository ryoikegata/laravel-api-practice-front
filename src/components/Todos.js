import React from 'react';
import axios from 'axios';
import Label from './Label';
const Todo = ({ todos, setTodos, labels }) => {

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
      const updatedTodo = response.data.todo;
    setTodos((prevTodos) => {
      // 前回の状態をもとに新しいToDoを生成
      return prevTodos.map((prevTodo) =>
      prevTodo.id === todo.id ? updatedTodo : prevTodo
    );
    });
    })
    .catch((error) => {
      console.error('ToDoの更新に失敗しました', error);
    });
  }
  return (
    <div className='flex justify-center w-full mt-20'>
      <div className=''>
          {todos.map((todo) => (
            <div className='flex gap-5 items-center' key={todo.id}>
        <div className='bg-white py-1 px-2 rounded-xl mt-5 flex justify-between w-96'>
          <div>
          <p className='text-xl font-bold'>{todo.title}</p>
          <p className='text-md text-gray-500'>{todo.description}</p>
          </div>
          <div className='flex justify-around w-2/5 mt-4'>
            <div  className={` w-16 flex justify-center text-white rounded ${todo.completed === 0 ? "bg-gray-500" : "bg-blue-500"} `}>
          <button onClick={() => completeClick(todo)}>{todo.completed === 0 ? "未完了" : "完了" }</button>
            </div>
            <div className='w-16 bg-red-500 flex justify-center items-center text-white rounded'>
          <button onClick={() => deleteTodo(todo)}>削除する</button>
          </div>
          </div>
        </div>
        <Label labels={labels} TodoLabelId={todo.label_id} />
        </div>
      ))}
      </div>
    </div>
  )

}

export default Todo;