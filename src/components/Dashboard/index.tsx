import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/myProvider";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, setIdUser } = context;

  const handleLogout = () => {
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    setIdUser(null)
    navigate('/')
};

  return (
    <div>
        <h1>Bem vindo, {user?.name}! você fez seu login corretamente!</h1>
        <button onClick={handleLogout}>Deseja deslogar da sua sessão? Clique aqui</button>
    </div>
  );
};

export default Dashboard;
