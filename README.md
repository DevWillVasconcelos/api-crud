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
