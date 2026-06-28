import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TitleForm } from "../../components/Forms/TitleForm";
import { InputForm } from "../../components/Forms/inputForm";
import { ButtonForm } from "../../components/Forms/ButtonForm";
import { QuestionForm } from "../../components/Forms/QuestionForm";
import { sileo, Toaster } from "sileo";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    sileo.promise(register(email, password, confirmPassword), {
      loading: { title: "Registering ..." },
      success: () => {
        setLoading(false);
        navigate("/");
        return { title: "Please confirm email" };
      },
      error: (err) => {
        setLoading(false);
        return {
          title: "Error",
          description: err.message,
        };
      },
    });
  };

  return (
    <div>
      <TitleForm title={"Register"} />

      <article className="bg-zinc-950 sm:w-80 p-4 rounded-md mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <InputForm
              labelName="Email"
              typeForm="email"
              placeHolderValue="email"
              valueForm={email}
              accionForm={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <InputForm
              labelName="Password"
              typeForm="Password"
              placeHolderValue="password"
              valueForm={password}
              accionForm={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <InputForm
              labelName="Password Confirmation"
              typeForm="password"
              placeHolderValue="password confirmation"
              valueForm={confirmPassword}
              accionForm={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <ButtonForm loadCondition={loading} />
        </form>
      </article>

      <QuestionForm
        question={"Already have account?"}
        linkTo={"/login"}
        linkQuestion={"sign In"}
      />

      <Toaster
        position="top-center"
        options={{
          fill: "#000",
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
