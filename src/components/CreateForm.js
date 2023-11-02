import { useState } from "react";
import "../App.css";
import axios from "axios";


const CreateForm = ({ labels, setTodos, todos }) => {



  const [formData, setFormData] = useState({
    title: '',
    description: '',
    label_id: 1, // デフォルトの選択肢を設定するか、選択可能な選択肢から選ぶ
    completed: false,
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const  createTodo =  (e) => {
      e.preventDefault();
    axios
      .post("http://localhost:8080/api/todos", formData)
      .then((response) => {
        setFormData({
          title: '',
          description: '',
          label_id: 1,
          completed: false,
        });
        const newTodo = response.data.todo;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch((error) => {
        console.log("ToDoの作成に失敗しました", error);
      });
  }

  return (
    <div className="fixed w-1/2 h-40 bottom-0 left-0 bg-white flex justify-center items-center">
      <form  onSubmit={(e) =>createTodo(e)} >
        <div className="w-full">
        <label  className="w-full flex gap-2 justify-between font-bold items-center">
          <p>
          タイトル
          </p>
          <input className="bg-gray-300 p-1" type="text" value={formData.title} onChange={handleChange} name="title" />
        </label>
        </div>
        <div>
        <label className="w-full flex gap-2 justify-between font-bold items-center mt-2">
          <p>
          詳細
          </p>
          <input className="bg-gray-300 p-1" type="text" value={formData.description} onChange={handleChange} name="description" />
        </label>
        </div>
        <div>
        <label className="w-full flex gap-2 justify-between font-bold items-center mt-2">
          <p>
          ラベル
          </p>
          <select className="bg-gray-300 p-1" value={formData.label_id} onChange={handleChange} name="label_id">
            {labels.map((label) => (
              <option key={label.id} value={label.id}>{label.label}</option>
            ))}
          </select>
        </label>
        </div>
        <div className="flex justify-center">
        <button className="bg-blue-500 py-1 px-5 text-white rounded mt-2" type="submit">作成</button>
        </div>
      </form>
    </div>
  )
};

export default CreateForm;