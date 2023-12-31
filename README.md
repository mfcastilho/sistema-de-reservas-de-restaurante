# Sistema de Reservas de Restaurante

Este é um sistema de reservas para um restaurante, desenvolvido como parte de um desafio técnico para a empresa Digiliza.

## Pré-Requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (normalmente instalado com o Node.js)
- [Git](https://git-scm.com/)

## Backend

Para o desenvolvimento do backend da aplicação, foi utilizado as seguintes tecnologias:

- **JavaScript** - Linguagem de programação principal.
- **Node.js** - Ambiente de tempo de execução JavaScript.
- **Express** - Framework Node.js para criação de APIs RESTful.
- **Sequelize** - ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.
- **PostgresSQL** - Banco de dados relacional utilizado para armazenamento de dados.
- **Joi** - Biblioteca de validação para validação de dados.
- **Bcrypt** - Biblioteca para criptografar senhas.
- **JWT (JSON Web Tokens)** - Para autenticação e autorização.
- **date-fns** - Para manipulação de datas.
- **uuid** - Para geração de identificadores únicos.
- **Jest** - Framework de testes para testes de integração.
- **SQLite** - Banco de dados em memória utilizado para testes com o Jest.
  
 Siga as etapas abaixo para configurar e executar o servidor backend:

1. Clone o repositório:

   ```
   git clone https://github.com/mfcastilho/teste-tecnico-digiliza
   
2. Navegue até a pasta do projeto:

```
cd seu-repositorio
```
3. Instale as dependências:

```
cd backend
npm install
```
4. Crie o banco de dados de desenvolvimento PostgreSQL:
 ```
npx sequelize db:create --env development

```
5. Execute as migrações do banco de dados:

```
npx sequelize-cli db:migrate --env development
```
6. Execute os seeds para popular o banco de dados:

```
npx sequelize-cli db:seed:all --env development
```
7. Inicie o servidor backend:

```
npm run dev
```
- O servidor backend estará em execução em http://localhost:3000.

## Frontend
Para o desenvolvimento do frontend da aplicação, foi utilizado as seguintes tecnologias:

- **JavaScript** - Linguagem de programação principal.
- **React** - Biblioteca de criação de interfaces de usuário.
- **React Router Dom** - Para roteamento de páginas no aplicativo React.
- **Bootstrap** - Framework de CSS para estilização.
- **Axios** - Cliente HTTP para fazer solicitações à API do backend.
- **SweetAlert** - Biblioteca para exibir pop-ups de notificação.
- **react-toastify** - Para exibir notificações de toasts.
- **react-icons** - Ícones populares como componentes React.
- **date-fns** - Para manipulação de datas no frontend.
- **jwt-decode** - Para decodificar tokens JWT no cliente. Siga as etapas abaixo para configurar e executar o frontend:

1. Navegue até a pasta do projeto (se ainda não estiver na pasta do projeto):

```
cd seu-repositorio
```
2. Navegue até a pasta do frontend:

```
cd frontend
```
3. Instale as dependências:

```
npm install
```

4. Inicie o servidor frontend:

```
npm run dev
```
- O servidor frontend estará em execução em http://localhost:5173.

## Testes
Os testes de integração foram desenvolvidos com Jest. Para executar os testes do backend, siga estas etapas:

1. Navegue até a pasta do projeto (se ainda não estiver na pasta do projeto):

```
cd seu-repositorio
```
2. Navegue até a pasta do backend:

```
cd backend
```
3. Execute os testes:

```
npm test
```
- Isso executará os testes de integração do backend.

## Endpoints
 - A seguir estão os endpoints da API:


- Obs: Lembre-se de que alguns endpoints podem exigir autenticação com token JWT, dependendo dos requisitos de acesso.


### CLIENTES

#### Endpoint de Registro de Cliente:
- **Método:** POST
- **Descrição:** Permite que os usuários se registrem no sistema.
- **Endpoint:** `/api/v1/register/client`
- **Função:** Criar um novo usuário no banco de dados com nome, email e senha.

#### Endpoint de Login de Usuário:
- **Método:** POST
- **Descrição:** Permite que os usuários(cliente ou admin) façam login no sistema.
- **Endpoint:** `/api/v1/login`
- **Função:** Verificar as credenciais do usuário (email e senha) e emitir um token JWT para autenticação subsequente.

### MESAS

#### Endpoint de Registro de Mesas:
- **Método:** POST
- **Descrição:** Permite cadastrar uma nova mesa no sistema.
- **Endpoint:** `/api/v1/table`
- **Função:** Recuperar as mesas do banco de dados.

#### Endpoint de Listagem de Mesas Disponíveis:
- **Método:** GET
- **Descrição:** Retorna a lista de mesas disponíveis no restaurante.
- **Endpoint:** `/api/v1/tables`
- **Função:** Recuperar as mesas do banco de dados.

### RESERVAS

#### Endpoint de Reservar Mesa:
- **Método:** POST
- **Descrição:** Permite que os usuários façam uma reserva de mesa.
- **Endpoint:** `/api/v1/reservation`
- **Função:** Verificar a disponibilidade da mesa, validar o horário da reserva e criar um registro de reserva no banco de dados.

### Endpoint de Listagem de Reservas do Usuário:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas feitas por um usuário.
- **Endpoint:** `/api/v1/reservations/user`
- **Função:** Recuperar as reservas associadas ao usuário com o ID especificado.

### Endpoint de Cancelar Reserva:
- **Método:** DELETE
- **Descrição:** Permite que os usuários cancelem uma reserva existente.
- **Endpoint:** `/api/v1/reservation/:id`
- **Função:** Verificar se o usuário tem permissão para cancelar a reserva e, se válido, excluir a reserva do banco de dados.


### ADMINISTRADOR

### Endpoint de Registro de Administrador:
- **Método:** POST
- **Descrição:** Permite registrar um Administrador no sistema.
- **Endpoint:** `/api/v1/register/admin`
- **Função:** Criar um novo admin no banco de dados com nome, email e senha.

### Endpoint de Login de Administrador:
- **Método:** POST
- **Descrição:** Permite que os usuários(cliente ou admin) façam login no sistema.
- **Endpoint:** `/api/v1/login`
- **Função:** Verificar as credenciais do usuário (email e senha) e emitir um token JWT para autenticação subsequente.

### Endpoint para Listar Todas as Reservas do Sistema (para o Painel Administrativo):
- **Método:** GET
- **Descrição:** Retorna a lista de todas as reservas feitas no sistema.
- **Endpoint:** `/api/v1/admin/all-reservations`
- **Função:** Recuperar todas as reservas registradas no sistema para exibição no painel administrativo, possivelmente em uma tabela.

### Endpoint para Excluir Reserva (para o Painel Administrativo):
- **Método:** DELETE
- **Descrição:** Permite que os administradores excluam uma reserva existente.
- **Endpoint:** `/api/v1/admin/reservation/:id`
- **Função:** Verificar se o administrador tem permissão para excluir a reserva e, se for válido, excluí-la do banco de dados.
