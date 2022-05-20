import axios from "../utils/axios.util";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos("all");
  }, []);

  const fetchTodos = async (queryFilter) => {
    setLoading(true);
    try {
      const result = await axios.get(`/todos?filter=${queryFilter}`);
      console.log(result);
      setLoading(false);
      setTodos(result.data.data);
    } catch (err) {
      console.log(err.response.data);
      setTodos(err.response.data.data);
      setLoading(false);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (todo === "" || todoDescription === "" || todoDate === "") {
      alert("All the fields are required to create the todo");
      return;
    }
    setLoading(true);

    // Format datetime to YYYY-MM-DD HH-MM-SS format
    const [inputDate, inputTime] = todoDate.split("T");
    const todoDateFormatted = `${inputDate} ${inputTime}:00`;

    try {
      await axios.post("/todos", {
        todo_name: todo,
        todo_description: todoDescription,
        todo_date: todoDateFormatted,
      });
      setTodo("");
      setTodoDescription("");
      setTodoDate("");
      fetchTodos();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const updateTodo = async (todoId, todoStatus) => {
    setLoading(true);

    try {
      await axios.put(`/todos/${todoId}`, {
        completed: todoStatus,
      });
      fetchTodos();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteTodo = async (todoId) => {
    setLoading(true);
    try {
      await axios.delete(`/todos/${todoId}`);
      fetchTodos();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full  h-14 flex items-center justify-center">
        <p className="font-semibold text-3xl underline underline-offset-2">
          Todo app
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-4/5 p-4 border border-gray-400 rounded-md shadow-md">
          <div className="w-full text-center font-semibold text-xl underline underline-offset-1 mb-5">
            Add todo
          </div>
          <div className="w-full ">
            <form
              className="w-full flex flex-col space-y-3 items-center justify-between  px-3 pb-5"
              onSubmit={(e) => createTodo(e)}
            >
              <div>
                <label>Todo name</label>
                <input
                  className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Add a title to your todo"
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  className="ml-5 outline-none border border-gray-300 px-2 py-2 rounded-md"
                  type="text"
                  value={todoDescription}
                  onChange={(e) => setTodoDescription(e.target.value)}
                  placeholder="Add a short description"
                />
              </div>
              <div>
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
                Create
              </button>
            </form>
          </div>
          <div className="w-full text-center font-semibold text-xl underline underline-offset-1 mb-5">
            Todos
          </div>
          <div className="flex items-center justify-start space-x-7 font-semibold pb-4 border-b border-gray-500">
            <p className="font-normal">Filters:</p>
            <p className="cursor-pointer" onClick={() => fetchTodos("all")}>
              All
            </p>
            <p className="cursor-pointer" onClick={() => fetchTodos("done")}>
              Done
            </p>
            <p
              className="cursor-pointer"
              onClick={() => fetchTodos("upcoming")}
            >
              Upcoming
            </p>
          </div>

          {!loading && todos ? (
            todos.map((element) => {
              return (
                <div
                  key={element.todo_id}
                  className="w-full grid grid-cols-6 gap-4 px-3 py-3 divide-x-2 divide-gray-300 "
                >
                  <div className="col-span-2 flex flex-col justify-center items-start  ">
                    {element.todo_status ? (
                      <p className="line-through">{element.title}</p>
                    ) : (
                      <p className="font-semibold">{element.todo_name}</p>
                    )}
                    <p className="text-gray-500">{element.todo_description}</p>
                  </div>
                  <div className="col-span-2 flex justify-center items-center ">
                    <time
                      dateTime={element.todo_date}
                      className="font-semibold"
                    >
                      {element.todo_date}
                    </time>
                  </div>

                  <div className="col-span-1 flex justify-center items-center ">
                    {element.todo_status ? <p>Done✅</p> : <p>Incomplete❌</p>}
                  </div>
                  <div className="col-span-1 flex justify-center items-center space-x-2">
                    <Link
                      href={{
                        pathname: "/updateTodo",
                        query: {
                          todo_id: element.todo_id,
                          todo_name: element.todo_name,
                          todo_description: element.todo_description,
                          todo_status: element.todo_status,
                          todo_date: element.todo_date,
                        },
                      }}
                    >
                      <button className="px-2 py-2 bg-neutral-300 rounded-md">
                        Update
                      </button>
                    </Link>
                    <button
                      className="px-2 py-2 bg-red-400 rounded-md"
                      onClick={() => deleteTodo(element.todo_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="font-semibold text-lg text-center py-6">
              No todos yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
