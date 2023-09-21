# ENDPOINTS - SISTEMA RESTAURANTE

## Endpoint de Registro de Cliente:
- **Método:** POST
- **Descrição:** Permite que os usuários se registrem no sistema.
- **Endpoint:** `/api/register/cliente`
- **Função:** Criar um novo usuário no banco de dados com nome, email e senha.

## Endpoint de Registro de Administrador:
- **Método:** POST
- **Descrição:** Permite que os usuários se registrem no sistema.
- **Endpoint:** `/api/register/admin`
- **Função:** Criar um novo usuário no banco de dados com nome, email e senha.

## Endpoint de Login de Usuário:
- **Método:** POST
- **Descrição:** Permite que os usuários façam login no sistema.
- **Endpoint:** `/api/login`
- **Função:** Verificar as credenciais do usuário (email e senha) e emitir um token JWT para autenticação subsequente.

## Endpoint de Listagem de Mesas Disponíveis:
- **Método:** GET
- **Descrição:** Retorna a lista de mesas disponíveis no restaurante.
- **Endpoint:** `/api/mesas`
- **Função:** Recuperar as mesas do banco de dados.

## Endpoint de Reservar Mesa:
- **Método:** POST
- **Descrição:** Permite que os usuários façam uma reserva de mesa.
- **Endpoint:** `/api/reservas`
- **Função:** Verificar a disponibilidade da mesa, validar o horário da reserva e criar um registro de reserva no banco de dados.

## Endpoint de Listagem de Reservas do Usuário:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas feitas por um usuário.
- **Endpoint:** `/api/reservas/usuario/:id`
- **Função:** Recuperar as reservas associadas ao usuário com o ID especificado.

## Endpoint de Cancelar Reserva:
- **Método:** DELETE
- **Descrição:** Permite que os usuários cancelem uma reserva existente.
- **Endpoint:** `/api/reservas/:id`
- **Função:** Verificar se o usuário tem permissão para cancelar a reserva e, se válido, excluir a reserva do banco de dados.

## Endpoint de Listagem de Reservas por Data:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas para um dia específico.
- **Endpoint:** `/api/reservas/data/:data`
- **Função:** Recuperar as reservas para a data especificada.

## Endpoint de Listagem de Reservas por Hora:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas para uma hora específica.
- **Endpoint:** `/api/reservas/hora/:hora`
- **Função:** Recuperar as reservas para a hora especificada.

## Endpoint de Listagem de Reservas por Dia e Hora:
- **Método:** GET
- **Descrição:** Retorna a lista de reservas para um dia e hora específicos.
- **Endpoint:** `/api/reservas/data/:data/hora/:hora`
- **Função:** Recuperar as reservas para a data e hora especificadas.
