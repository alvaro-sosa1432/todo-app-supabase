import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main className="bg-zinc-900 min-h-screen text-white flex flex-col justify-center  ">
      <section className="md:max-w-2xl mx-auto">
        <Outlet />
      </section>
    </main>
  );
};
