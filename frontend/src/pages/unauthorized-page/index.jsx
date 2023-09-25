import './style.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-heading">Não autorizado</h1>
      <p className="unauthorized-message">
        Você não tem permissão para acessar esta página.
      </p>
    </div>
  );
};

export default Unauthorized;
