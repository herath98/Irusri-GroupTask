import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (editIndex >= 0) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditIndex(-1);
    } else {
      setTodos([...todos, { ...newTodo, completed: false }]);
    }
    setNewTodo({ title: "", description: "" });
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setNewTodo(todos[index]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Todo List </h1>


      <div className="mb-6 max-w-xl mx-auto">
        <input
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <textarea
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <button
          onClick={addTodo}
          className={`w-full py-2 text-white rounded ${editIndex >= 0 ? "bg-yellow-500" : "bg-green-500"
            }`}
        >
          {editIndex >= 0 ? (<div className="flex justify-center">Update Todo <CiEdit width={25} height={25} size={25} className="ml-2 my-auto" /></div>) : (<div className="flex justify-center">Add Todo <IoMdAddCircleOutline width={25} height={25} size={25} className="ml-2 my-auto" /></div>)}
        </button>
      </div>


      <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-gray-100 p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3
                className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {todo.title}
              </h3>
              <p className="text-gray-600">{todo.description}</p>
              <button
                onClick={() => toggleCompletion(index)}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => editTodo(index)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                <div className="flex justify-center">Edit <CiEdit width={25} height={25} size={25} className="ml-2 my-auto" /></div>
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                <div className="flex justify-center">Delete <MdDelete width={25} height={25} size={25} className="ml-2 my-auto" /></div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
