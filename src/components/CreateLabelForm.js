import axios from 'axios';
import React from 'react';
import { useState } from "react";

const CreateLabelForm = ({ labels, setLabels }) => {
  const [formData, setFormData] = useState({
    label: '',
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };


  const CreateLabel = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:8080/api/todo_labels", formData)
    .then((response) => {
      setFormData({
        label: '',
      });
      console.log(response);
      const newLabel = response.data.label;
      console.log(newLabel);
      setLabels((prevLabels) => [...prevLabels, newLabel]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
    <div className='w-1/2 h-40 fixed right-0 bottom-0 bg-white'>
      <div className='w-full flex justify-center'>
      <h2 className='font-bold text-2xl'>Create Label</h2>
      </div>
      <form className='flex flex-col w-full mt-5' onSubmit={(e) =>CreateLabel(e)}>
        <div className='w-full flex justify-center'>
        <label>
          <input className='bg-gray-300 p-4' onChange={handleChange} name='label' type="text" />
        </label>
        </div>
        <div className='flex justify-center my-5'>
        <button className='bg-blue-500 px-6 text-white '>Create!</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default CreateLabelForm;