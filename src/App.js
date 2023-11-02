import { useEffect } from 'react';
import './App.css';
import 'axios';
import axios from 'axios';
import { useState } from 'react';
import CreateForm from './components/CreateForm';
import Todos from './components/Todos';
import CreateLabelForm from './components/CreateLabelForm';

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


  return (
    <div className='bg-gray-300 w-full h-full'>
      <div className='flex w-full justify-center'>
      <h1 className='font-bold text-5xl'>TodoList</h1>
      </div>
      <Todos todos={todos} setTodos={setTodos} labels={labels} />
      <CreateForm labels={labels} setTodos={setTodos} todos={todos} />
    <CreateLabelForm labels={labels} setLabels={setLabels} />
    </div>
  );
}

export default App;
