import React from "react";


const Label = ({ labels, TodoLabelId }) => {

    const todoLabel = labels.find((label) => label.id === TodoLabelId);
  return (
      <div className='bg-green-500 px-2 rounded-xl mt-5 items-center text-white flex justify-between '>
        <div>
        <p className='text-xl font-bold'>{todoLabel.label
        }</p>
        </div>
      </div>
  )

}

export default Label;