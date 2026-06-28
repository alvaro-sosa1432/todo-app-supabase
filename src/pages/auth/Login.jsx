import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { InputForm } from "../../components/Forms/inputForm";
import { QuestionForm } from "../../components/Forms/QuestionForm";
import { ButtonForm } from "../../components/Forms/ButtonForm";

import { UserIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { sileo, Toaster } from "sileo";
import { TitleForm } from "../../components/Forms/TitleForm";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    sileo.promise(login(email, password), {
      loading: { title: "Loging..." },
      success: () => {
        setLoading(false);
        navigate("/");
        return { title: "✅ See You Soon!" };
      },
      error: (err) => {
        setLoading(false);
        return {
          title: "Error",
          description: err.message || "Credenciales incorrectas",
        };
      },
    });
  };

  return (
    <div>
      <section>
        <TitleForm title={"the task"} />

        <article className="bg-zinc-950 sm:w-80 p-4 rounded-md mt-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputForm
              labelName="Email"
              typeForm="email"
              placeHolderValue="email"
              valueForm={email}
              accionForm={(e) => setEmail(e.target.value)}
            />

            <InputForm
              labelName="Password"
              typeForm="password"
              placeHolderValue="******"
              valueForm={password}
              accionForm={(e) => setPassword(e.target.value)}
            />

            <ButtonForm loadCodintion={loading} />
          </form>
        </article>
      </section>

      <QuestionForm
        question={"Don't have an account?"}
        linkTo={"/register"}
        linkQuestion={"Create an account"}
      />

      <Toaster
        position="top-center"
        options={{
          fill: "#000",
        }}
      />
    </div>
  );
}

export default Login;
