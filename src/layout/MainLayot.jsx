import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main className="bg-zinc-900 min-h-screen text-white flex flex-col">
      <h1>Lista de Tareas</h1>
      <Outlet />
    </main>
  );
};
