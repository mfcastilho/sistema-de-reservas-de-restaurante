# REGRAS DE NEGÓCIO – SISTEMA RESTAURANTE

## Regras de Autenticação:
- **Sistema de Login:** Os usuários devem ser capazes de criar contas e fazer login no sistema. A autenticação baseada em tokens JWT.
- **Restrições de Acesso:** Apenas usuários autenticados devem ter acesso às funcionalidades de reserva.

## Regras de Reserva:
- **Horário de Reserva:** As reservas devem ser permitidas apenas das 18:00 às 23:59, exceto aos domingos.
- **Validação de Horários Conflituosos:** O sistema deve validar se a mesa está disponível no horário desejado e evitar que duas reservas conflitem no mesmo horário para a mesma mesa.
- **Capacidade das Mesas(EXTRA):** Certificar de que a reserva não exceda a capacidade da mesa.

## Regras de Dados:
- **Banco de Dados Relacional:** Usar um banco de dados relacional para armazenar informações sobre mesas e reservas.
- **População do Banco de Dados:** Popular o banco de dados com informações de teste, incluindo detalhes sobre mesas e horários disponíveis.

## Regras Opcionais (Bônus):
- **Painel Administrativo:** Implementar  um painel administrativo, que deve permitir a visualização de reservas feitas, identificando quem fez a reserva e os horários reservados.

## Regras Gerais:
- **Tratamento de Erros:** Implemente um tratamento de erros adequado para lidar com exceções e erros de forma elegante.
- **Documentação:** Forneça documentação clara sobre como usar as APIs e os endpoints do sistema.
- **Testes Unitários e de Integração:** Desenvolva testes unitários e de integração para garantir que a funcionalidade esteja correta e que as regras de negócio sejam cumpridas.
