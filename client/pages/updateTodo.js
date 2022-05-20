import { useRouter } from "next/router";
import { useState } from "react";
import axios from "../utils/axios.util";

const UpdateTodo = () => {
  const router = useRouter();
  const { todo_id, todo_name, todo_description, todo_status, todo_date } =
    router.query;
  const [todoDateHtmlFormat] = todo_date.split(".");
  const [todo, setTodo] = useState(todo_name);
  const [todoDescription, setTodoDescription] = useState(todo_description);
  const [todoStatus, setTodoStatus] = useState(todo_status);
  const [todoDate, setTodoDate] = useState(todoDateHtmlFormat);

  const updateTodo = async (e) => {
    e.preventDefault();
    // Format datetime to YYYY-MM-DD HH-MM-SS format
    const [inputDate, inputTime] = todoDate.split("T");
    let [hr, min, sec] = inputTime.split(":");
    if (sec === undefined) {
      sec = "00";
    }
    const todoDateFormatted = `${inputDate} ${hr}:${min}:${sec}`;

    try {
      await axios.put(`/todos/${todo_id}`, {
        todo_name: todo,
        todo_description: todoDescription,
        todo_date: todoDateFormatted,
        todo_status: todoStatus,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="px-8 py-8 border border-black rounded-lg shadow-lg">
        <form
          className="w-full flex flex-col space-y-3 items-center justify-between  px-3 pb-5"
          onSubmit={(e) => updateTodo(e)}
        >
          <div className="w-full">
            <label>Todo name</label>
            <input
              className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a title to your todo"
            />
          </div>
          <div className="w-full">
            <label>Description</label>
            <input
              className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
              type="text"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              placeholder="Add a short description"
            />
          </div>
          <div className="w-full">
            <label>Todo Status</label>
            {todoStatus == true ? (
              <input
                className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
                type="checkbox"
                checked={true}
                onChange={() => setTodoStatus(!todoStatus)}
              />
            ) : (
              <input
                className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
                type="checkbox"
                checked={false}
                onChange={() => setTodoStatus(!todoStatus)}
              />
            )}
          </div>
          <div className="w-full mb-4">
            <label>Complete at:</label>
            <input
              className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
              type="datetime-local"
              value={todoDate}
              onChange={(e) => setTodoDate(e.target.value)}
            />
          </div>

          <button
            className="px-4 py-2 bg-green-400 rounded-md shadow-lg"
            type="submit"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;
