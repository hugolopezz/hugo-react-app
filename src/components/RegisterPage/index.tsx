import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/myProvider";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessageRegister, setErrorRegister] = useState<string>("");

  const navigate = useNavigate();
  const context = useContext(MyContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { setIdUser } = context;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        const responseLogin = await axios.post(
          "http://localhost:3001/auth/login",
          {
            email,
            password,
          }
        );

        const { token, userId } = responseLogin.data;

        setIdUser(userId);
        navigate("/dashboard");
        localStorage.setItem("token", token);
        localStorage.setItem("idUser", userId);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorRegister(
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : "Erro desconhecido"
        );
        console.error("Erro ao registrar usuário:", error);
      }
    }
  };

  return (
    <>
      <h1>Registre sua conta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {errorMessageRegister && (
        <p className="errorMessage">{errorMessageRegister}</p>
      )}
      <button
        type="submit"
        className="m16 btnRedirect"
        onClick={() => navigate("/login")}
      >
        Já tenho conta
      </button>

    </>
  );
};

export default RegisterPage;
