import { useState } from "react";
import "../App.css";
import axios from "axios";


const CreateForm = ({ labels, setTodos, todos }) => {



  const [formData, setFormData] = useState({
    title: '',
    description: '',
    label_id: '', // デフォルトの選択肢を設定するか、選択可能な選択肢から選ぶ
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
        // サーバーの更新が成功したら、ローカルのToDoアイテムも更新
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
        setFormData({
          title: '',
          description: '',
          label_id: '',
          completed: false,
        });
      })
      .catch((error) => {
        console.log("ToDoの作成に失敗しました", error);
      });
  }

  return (
    <div>
      <form  onSubmit={(e) =>createTodo(e)} >
        <label>
          タイトル
          <input type="text" value={formData.title} onChange={handleChange} name="title" />
        </label>
        <label>
          詳細
          <input type="text" value={formData.description} onChange={handleChange} name="description" />
        </label>
        <label>
          ラベル
          <select value={formData.label_id} onChange={handleChange} name="label_id">
            {labels.map((label) => (
              <option key={label.id} value={label.id}>{label.label}</option>
            ))}
          </select>
        </label>
        <button type="submit">作成</button>
      </form>
    </div>
  )
};

export default CreateForm;