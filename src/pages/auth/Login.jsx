import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { inputForm } from "../../components/inputForm";

import { UserIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { sileo, Toaster } from "sileo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      sileo.error({
        description: error,
        duration: 5000,
        fill: "black",
        styles: {
          title: "text-white",
          description: "text-white/75",
        },
      });
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col gap-4 items-center text-center  ">
          <div className="bg-purple-400 text-zinc-900 p-2 rounded-md">
            <UserIcon size={32} />
          </div>
          <h2 className="text-3xl text-purple-400 uppercase font-semibold">
            the tasks
          </h2>
        </div>

        <article className="bg-zinc-950 w-80 h-80 p-4 rounded-md mt-4 ">
          <h1 className="text-xl text-gray-300 mb-4 ">Welcome back</h1>
          <form className="flex flex-col  gap-4 " onSubmit={handleSubmit}>
            <div className="flex flex-col text-purple-300">
              <label className="uppercase font-semibold">Email</label>
              <input
                className="p-2 bg-zinc-800 rounded-md"
                type={"email"}
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 text-purple-300 ">
              <label className="uppercase font-semibold">Password</label>
              <input
                className="p-2 bg-zinc-800 rounded-md"
                type={"password"}
                placeholder={"******"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className=" cursor-pointer bg-purple-400 py-2 rounded-2xl text-black flex justify-center items-center gap-4 border  hover:border-purple-400 hover:bg-zinc-950 hover:text-purple-400 transition-colors duration-150  "
              type="submit"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              <ArrowRightIcon />
            </button>
          </form>

          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
          <Toaster position="bottom-right" />
        </article>
      </section>
    </div>
  );
}

export default Login;
