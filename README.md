# API CRUD

API RESTful completa para gerenciamento de recursos com operações CRUD, paginação, ordenação e documentação Swagger.

## Tecnologias

- Node.js
- Express.js
- Swagger/OpenAPI
- Helmet (Seguranca)
- CORS

## Funcionalidades

- Criar registro
- Listar registros com paginacao
- Buscar registro por ID
- Atualizar registro completo (PUT)
- Atualizar campo especifico (PATCH)
- Remover registro
- Ordenacao por qualquer campo
- Documentacao interativa Swagger
- Validacao de dados
- Testes automatizados

## Endpoints

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/items | Lista todos os registros (paginado) |
| GET | /api/items/{id} | Busca registro por ID |
| POST | /api/items | Cria novo registro |
| PUT | /api/items/{id} | Atualiza registro completo |
| PATCH | /api/items/{id} | Atualiza campo especifico |
| DELETE | /api/items/{id} | Remove registro |

## Estrutura do Registro

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| id | integer | Sim (automatico) | Identificador unico |
| name | string | Sim | Nome do item |
| description | string | Nao | Descricao detalhada |
| price | number | Sim | Preco do item |
| category | string | Sim | Categoria do produto |
| createdAt | string | Sim (automatico) | Data de criacao |

### Exemplo

```json
{
  "id": 1,
  "name": "Notebook",
  "description": "High performance laptop",
  "price": 3500,
  "category": "electronics",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
