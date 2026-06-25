import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error cargando tareas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva tarea
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            user_id: user.id,
            task: newTask,
            completed: false,
          },
        ])
        .select();

      if (error) throw error;

      setTasks([data[0], ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Error creando tarea:", error.message);
    }
  };

  // Marcar tarea como completada/incompleta
  const toggleTask = async (taskId, currentStatus) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !currentStatus })
        .eq("id", taskId)
        .eq("user_id", user.id);

      if (error) throw error;

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !currentStatus } : task,
        ),
      );
    } catch (error) {
      console.error("Error actualizando tarea:", error.message);
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", taskId)
        .eq("user_id", user.id);

      if (error) throw error;

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error eliminando tarea:", error.message);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error.message);
    }
  };

  return (
    <div>
      <div>
        <h2>Bienvenido, {user?.email}</h2>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      {/* Formulario para nueva tarea */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      {/* Lista de tareas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No tienes tareas pendientes</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.task}
              </span>

              <button onClick={() => toggleTask(task.id, task.completed)}>
                {task.completed ? "Desmarcar" : "Completar"}
              </button>

              <button onClick={() => deleteTask(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
