# API CRUD - Documentação Completa

API RESTful para gerenciamento de recursos com operações CRUD completas, sistema de paginação, ordenação, validações e documentação interativa via Swagger.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura dos Dados](#estrutura-dos-dados)
- [Parâmetros de Consulta](#parâmetros-de-consulta)
- [Exemplos de Requisições](#exemplos-de-requisições)
- [Códigos de Resposta](#códigos-de-resposta)
- [Tratamento de Erros](#tratamento-de-erros)
- [Testes](#testes)
- [Documentação Swagger](#documentação-swagger)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Melhorias Futuras](#melhorias-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Sobre o Projeto

Esta API foi desenvolvida para demonstrar a implementação de um CRUD completo utilizando Node.js e Express. O projeto inclui todas as operações fundamentais de uma API RESTful, com foco em boas práticas de desenvolvimento, validação de dados e documentação clara.

O projeto utiliza um banco de dados em memória para facilitar os testes e demonstração, mas pode ser facilmente adaptado para qualquer banco de dados real.

## Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|------------|
| Node.js | 14+ | Ambiente de execução JavaScript |
| Express | 4.18.2 | Framework web para Node.js |
| Swagger UI Express | 5.0.0 | Interface de documentação interativa |
| Swagger JSDoc | 6.2.8 | Geração de documentação a partir de comentários |
| Helmet | 7.1.0 | Segurança de headers HTTP |
| CORS | 2.8.5 | Compartilhamento de recursos entre origens |
| Axios | 1.6.0 | Cliente HTTP para testes |

## Funcionalidades

- **CRUD Completo**: Create, Read, Update, Delete
- **Listagem Paginada**: Controle de página e limite de itens
- **Ordenação Dinâmica**: Ordenar por qualquer campo (asc/desc)
- **Validação de Dados**: Verificação de campos obrigatórios e tipos
- **Documentação Interativa**: Swagger UI para testes e consulta
- **Tratamento de Erros**: Respostas padronizadas para diferentes cenários
- **Segurança**: Headers protegidos com Helmet
- **CORS Habilitado**: Permite requisições de diferentes origens

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

## Instalação

### Clonando o repositório

```bash
git clone https://github.com/DevWillVasconcelos/api-crud.git
cd api-crud
Instalando as dependências
bash
npm install
Dependências que serão instaladas
json
{
  "express": "^4.18.2",
  "swagger-ui-express": "^5.0.0",
  "swagger-jsdoc": "^6.2.8",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "axios": "^1.6.0",
  "nodemon": "^3.0.1"
}
Configuração
Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

env
PORT=3000
NODE_ENV=development
Configuração do Servidor
O servidor está configurado para rodar na porta 3000 por padrão. Para alterar, modifique o arquivo server.js ou a variável de ambiente PORT.

Executando o Projeto
Modo Desenvolvimento (com auto-reload)
bash
npm run dev
Modo Produção
bash
npm start
Saída esperada
text
Server running on port 3000
Documentation available at http://localhost:3000/api-docs
Endpoints da API
Método	Endpoint	Descrição	Autenticação
GET	/api/items	Lista todos os registros (paginado)	Não
GET	/api/items/{id}	Busca registro por ID	Não
POST	/api/items	Cria novo registro	Não
PUT	/api/items/{id}	Atualiza registro completo	Não
PATCH	/api/items/{id}	Atualiza campo específico	Não
DELETE	/api/items/{id}	Remove registro	Não
Estrutura dos Dados
Schema do Registro
Campo	Tipo	Obrigatório	Descrição	Exemplo
id	integer	Sim (automático)	Identificador único	1
name	string	Sim	Nome do item	"Notebook"
description	string	Não	Descrição detalhada	"High performance laptop"
price	number	Sim	Preço do item	3500.00
category	string	Sim	Categoria do produto	"electronics"
createdAt	string	Sim (automático)	Data de criação	"2024-01-01T00:00:00.000Z"
Exemplo de Registro
json
{
  "id": 1,
  "name": "Notebook Dell XPS",
  "description": "Notebook de alta performance para desenvolvimento",
  "price": 5500.00,
  "category": "electronics",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
Parâmetros de Consulta
GET /api/items
Parâmetro	Tipo	Padrão	Valores Permitidos	Descrição
page	integer	1	>= 1	Número da página
limit	integer	10	1 - 100	Itens por página
sortBy	string	"id"	id, name, price, category, createdAt	Campo para ordenação
order	string	"asc"	asc, desc	Ordem crescente ou decrescente
Exemplo de uso
text
GET /api/items?page=2&limit=5&sortBy=price&order=desc
Exemplos de Requisições
1. Criar um novo item (POST)
bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse Gamer",
    "description": "Mouse com RGB e 6 botões",
    "price": 150.00,
    "category": "electronics"
  }'
Resposta (201 Created):

json
{
  "id": 4,
  "name": "Mouse Gamer",
  "description": "Mouse com RGB e 6 botões",
  "price": 150,
  "category": "electronics",
  "createdAt": "2024-01-20T14:25:30.123Z"
}
2. Listar itens com paginação (GET)
bash
curl "http://localhost:3000/api/items?page=1&limit=10&sortBy=name&order=asc"
Resposta (200 OK):

json
{
  "data": [
    {
      "id": 3,
      "name": "Desk Chair",
      "description": "Ergonomic office chair",
      "price": 800,
      "category": "furniture",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Coffee Mug",
      "description": "Ceramic coffee mug",
      "price": 25,
      "category": "kitchen",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 3,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
3. Buscar item por ID (GET)
bash
curl http://localhost:3000/api/items/1
Resposta (200 OK):

json
{
  "id": 1,
  "name": "Notebook",
  "description": "High performance laptop",
  "price": 3500,
  "category": "electronics",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
4. Atualizar item completo (PUT)
bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook Ultra",
    "description": "Notebook com processador i7",
    "price": 4500,
    "category": "electronics"
  }'
Resposta (200 OK):

json
{
  "id": 1,
  "name": "Notebook Ultra",
  "description": "Notebook com processador i7",
  "price": 4500,
  "category": "electronics",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
5. Atualizar campo específico (PATCH)
bash
curl -X PATCH http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 4200
  }'
Resposta (200 OK):

json
{
  "id": 1,
  "name": "Notebook Ultra",
  "description": "Notebook com processador i7",
  "price": 4200,
  "category": "electronics",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
6. Remover item (DELETE)
bash
curl -X DELETE http://localhost:3000/api/items/1
Resposta (204 No Content):

text
(sem corpo na resposta)
Códigos de Resposta
Código	Status	Descrição
200	OK	Requisição bem sucedida
201	Created	Registro criado com sucesso
204	No Content	Registro removido com sucesso
400	Bad Request	Erro de validação ou requisição inválida
404	Not Found	Registro não encontrado
500	Internal Server Error	Erro interno do servidor
Tratamento de Erros
Erro 400 - Validação
json
{
  "errors": [
    "Name is required and must be a non-empty string",
    "Price must be a positive number"
  ]
}
Erro 404 - Não Encontrado
json
{
  "error": "Item not found"
}
Erro 400 - ID Inválido
json
{
  "error": "Invalid ID format"
}
Erro 400 - Limite Excedido
json
{
  "error": "Limit cannot exceed 100 items per page"
}
Testes
Executando testes automatizados
bash
npm test
Cobertura dos testes
Os testes automatizados verificam:

Criação de itens válidos e inválidos

Listagem com e sem paginação

Busca por ID (existente e inexistente)

Atualização completa (PUT)

Atualização parcial (PATCH)

Remoção de itens

Validações de dados

Tratamento de erros

Exemplo de saída dos testes
text
Starting API Tests...
Base URL: http://localhost:3000

========== POST /api/items - Create Item ==========
Status: 201
Response: {
  "id": 4,
  "name": "Gaming Mouse",
  "price": 150,
  "category": "electronics"
}

TEST RESULTS SUMMARY
****************************************************************
PASSED: Create Item
PASSED: Create Item Validation
PASSED: Get All Items
PASSED: Get Items Paginated
PASSED: Get Item By ID
PASSED: Get Item By ID Not Found
PASSED: Update Entire Item
PASSED: Update Item Not Found
PASSED: Patch Single Field
PASSED: Patch Multiple Fields
PASSED: Patch Item Not Found
PASSED: Delete Item
PASSED: Delete Item Not Found
PASSED: Verify Deletion
****************************************************************
Total: 14/14 tests passed
SUCCESS: All tests passed!
****************************************************************
Documentação Swagger
Após iniciar o servidor, acesse a documentação interativa:

text
http://localhost:3000/api-docs
A documentação Swagger permite:

Visualizar todos os endpoints disponíveis

Ver os schemas de dados

Testar as requisições diretamente pela interface

Entender os parâmetros e respostas de cada endpoint

Estrutura do Projeto
text
api-crud/
│
├── server.js                 # Arquivo principal da aplicação
├── package.json              # Dependências e scripts
├── test-api.js              # Testes automatizados
├── .gitignore               # Arquivos ignorados pelo Git
├── .env                     # Variáveis de ambiente
│
├── routes/
│   └── itemRoutes.js        # Definição das rotas da API
│
├── controllers/
│   └── itemController.js    # Lógica de negócio dos endpoints
│
├── models/
│   └── Item.js              # Modelo e validações do item
│
├── database/
│   └── memoryDb.js          # Banco de dados em memória
│
└── swagger/
    └── swagger.js           # Configuração do Swagger
Descrição dos Diretórios
routes: Define as rotas e associa aos controllers

controllers: Implementa a lógica de cada endpoint

models: Define a estrutura dos dados e validações

database: Gerencia o armazenamento (em memória)

swagger: Configura a documentação interativa

Melhorias Futuras
Curto Prazo
Implementar banco de dados PostgreSQL

Adicionar autenticação JWT

Criar testes unitários com Jest

Implementar logging com Winston

Médio Prazo
Adicionar cache com Redis

Implementar rate limiting

Adicionar upload de arquivos

Criar versionamento da API (/v1, /v2)

Longo Prazo
Implementar WebSockets para atualizações em tempo real

Adicionar filas com Bull

Implementar CI/CD com GitHub Actions

Criar dashboard de monitoramento

Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

Padrões de Código
Use 2 espaços para indentação

Utilize nomes descritivos para variáveis e funções

Comente o código quando necessário

Mantenha as funções pequenas e focadas

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Contato
Desenvolvedor: Willian Vasconcelos

GitHub: @DevWillVasconcelos

Projeto: https://github.com/DevWillVasconcelos/api-crud

LinkedIn: https://www.linkedin.com/in/williams-vasconcelos-4b09a83b6/

Agradecimentos
Express.js - Framework web

Swagger - Documentação de APIs

Node.js - Ambiente de execução

GitHub - Hospedagem do código

