import { createContext, useState } from "react";

export const Context = createContext(null);

const defaultToken = JSON.parse(localStorage.getItem("token")) || null;
const defaultUser = JSON.parse(localStorage.getItem("user")) || null;
function ContextProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [errors, setErrors] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [token, setToken] = useState(defaultToken);
  const [deleteTask, setDeleteTask] = useState(false);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        errors,
        setErrors,
        tasks,
        setTasks,
        token,
        setToken,
        deleteTask,
        setDeleteTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
