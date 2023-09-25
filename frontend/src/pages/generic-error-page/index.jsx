import './style.css';

const Error500 = () => {
  return (
    <div className="error500-container">
      <h1 className="error500-heading">Erro 500</h1>
      <p className="error500-message">
        Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.
      </p>
    </div>
  );
};

export default Error500;
