import React, { useContext, useState } from "react";
import { MyContext } from "../../context/myProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const context = useContext(MyContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { isLoading, setIdUser } = context;

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { token, userId } = response.data;

      setIdUser(userId);
      navigate("/dashboard");
      localStorage.setItem("token", token);
      localStorage.setItem("idUser", userId);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <h1>Logue na sua conta</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "300px", margin: "auto" }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <button
        type="submit"
        className="m16 btnRedirect"
        onClick={() => navigate("/register")}
      >
        Registrar
      </button>

    </>
  );
};

export default LoginPage;
