import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTask, EditTask } from "../Redux/TodoSlice/todoSlice";

const todo = {
  name: "",
};
const Todo = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(todo);
  const [isChecked, setIsChecked] = useState(true);
  const [edit, setEdit] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value)
    setInput({ ...input, [name]: value });
  };
  // Cheack box
  const handleOnChange = (e) => {
    console.log(e.target);
    // now working need for cheack box
    const cheackObj = {
      id: e.targe.id,
    };

    setIsChecked(!isChecked);
  };

  // add Items
  const add = () => {
    if (input.name === "") {
      alert("Enter some Todo in the Input");
      return;
    } else {
      dispatch(addTodo({ task: input }));
      setInput({ ...input, name: "" });
    }
  };

  // show Items
  const todos = useSelector((state) => {
    return state.tasks;
  });

  const { allTodo } = todos;

  // Delete Items
  const removeTask = (id) => {
    console.log("item id ", id);
    dispatch(
      deleteTask({
        id: id,
      })
    );
  };

  // Edit items

  const editTask = (item) => {
    const { id, name } = item;
    setInput({ ...input, name: name.name });
    setEdit(item);
  };
  // SaveEdit

  const saveEdit = () => {
    console.log("save Edit fun", edit);

    const obj = {
      id: edit.id,
      name: input,
    };
    dispatch(EditTask(obj));
    setInput({ ...input, name: "" });
  };
  return (
    <div>
      <div className="h-100 w-full  flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-slate-100 rounded shadow p-6 m-4 w-full md:w-[60%] border border-black">
          <div className="mb-4">
            <p className="text-center text-2xl">Todo List With Redux Toolkit</p>

            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              <button
                className="flex-no-shrink p-2 border-2 w-[20%] rounded text-teal border-teal hover:text-white hover:bg-green-800"
                onClick={add}
              >
                Add todo
              </button>
            </div>
            <button
              className="flex-no-shrink  mt-3 w-full p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-green-800"
              onClick={saveEdit}
            >
              Save Edit
            </button>
          </div>
          <div>
            {allTodo.map((item) => {
              // console.log("todo Items", item);
              return (
                <div className="flex mb-4 items-center">
                  <p key={item.id} className="w-full text-grey-darkest">
                    <input
                      type="checkbox"
                      id={item.id}
                      name="topping"
                      value={isChecked}
                      // checked={isChecked}
                      onClick={(e) => handleOnChange(e)}
                    />
                    {item.name.name}
                  </p>

                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500"
                    onClick={() => {
                      editTask(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500"
                    onClick={() => {
                      removeTask(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
