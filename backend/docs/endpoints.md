# ENDPOINTS - SISTEMA RESTAURANTE


## CLIENTES

### Endpoint de Registro de Cliente:
- **Método:** POST
- **Descrição:** Permite que os usuários se registrem no sistema.
- **Endpoint:** `/api/register/client`
- **Função:** Criar um novo usuário no banco de dados com nome, email e senha.

### Endpoint de Login de Usuário:
- **Método:** POST
- **Descrição:** Permite que os usuários façam login no sistema.
- **Endpoint:** `/api/login`
- **Função:** Verificar as credenciais do usuário (email e senha) e emitir um token JWT para autenticação subsequente.

### Endpoint de Listagem de Mesas Disponíveis:
- **Método:** GET
- **Descrição:** Retorna a lista de mesas disponíveis no restaurante.
- **Endpoint:** `/api/tables`
- **Função:** Recuperar as mesas do banco de dados.

### Endpoint de Reservar Mesa:
- **Método:** POST
- **Descrição:** Permite que os usuários façam uma reserva de mesa.
- **Endpoint:** `/api/reservation`
- **Função:** Verificar a disponibilidade da mesa, validar o horário da reserva e criar um registro de reserva no banco de dados.

### Endpoint de Listagem de Reservas do Usuário:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas feitas por um usuário.
- **Endpoint:** `/api/reservations/user`
- **Função:** Recuperar as reservas associadas ao usuário com o ID especificado.

### Endpoint de Cancelar Reserva:
- **Método:** DELETE
- **Descrição:** Permite que os usuários cancelem uma reserva existente.
- **Endpoint:** `/api/reservation/:id`
- **Função:** Verificar se o usuário tem permissão para cancelar a reserva e, se válido, excluir a reserva do banco de dados.


## ADMINISTRADOR

### Endpoint de Registro de Administrador:
- **Método:** POST
- **Descrição:** Permite que os usuários se registrem no sistema.
- **Endpoint:** `/api/register/admin`
- **Função:** Criar um novo usuário no banco de dados com nome, email e senha.

### Endpoint de Login de Usuário:
- **Método:** POST
- **Descrição:** Permite que os usuários façam login no sistema.
- **Endpoint:** `/api/login`
- **Função:** Verificar as credenciais do usuário (email e senha) e emitir um token JWT para autenticação subsequente.

### Endpoint para Listar Todas as Reservas do Sistema (para o Painel Administrativo):
- **Método:** GET
- **Descrição:** Retorna a lista de todas as reservas feitas no sistema.
- **Endpoint:** `/api/all-reservations`
- **Função:** Recuperar todas as reservas registradas no sistema para exibição no painel administrativo, possivelmente em uma tabela.

### Endpoint de Listagem de Reservas por Hora:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas para uma hora específica.
- **Endpoint:** `/api/reservas/hora/:hora`
- **Função:** Recuperar as reservas para a hora especificada.

### Endpoint para Excluir Reserva (para o Painel Administrativo):
- **Método:** DELETE
- **Descrição:** Permite que os administradores excluam uma reserva existente.
- **Endpoint:** `/api/admin/reservation/:id`
- **Função:** Verificar se o administrador tem permissão para excluir a reserva e, se for válido, excluí-la do banco de dados.
