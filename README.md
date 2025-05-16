# Projeto Fullstack de Autenticação e CRUD de Usuários

Projeto desenvolvido com NestJS (backend) e ReactJS (frontend) usando TypeScript. Implementa autenticação JWT, rotas protegidas, CRUD de usuários e estilização com TailwindCSS.

---

## Sumário

- [Descrição](#descrição)  
- [Tecnologias](#tecnologias)  
- [Funcionalidades](#funcionalidades)  
- [Como Rodar](#como-rodar)  
- [Decisões de Design e Arquitetura](#decisões-de-design-e-arquitetura)  
- [Testes](#testes)  
- [Documentação da API](#documentação-da-api)  
- [Demonstração](#demonstração)  
- [Considerações Finais](#considerações-finais)  
- [Autor](#autor)  

---

## Descrição

Este projeto fullstack tem como objetivo fornecer uma aplicação de autenticação com JWT, cadastro de usuários e acesso protegido por rotas privadas.

O backend é construído com NestJS e o frontend com ReactJS, ambos em TypeScript. A estilização do frontend é feita com TailwindCSS para rapidez e consistência visual.

---

## Tecnologias

- **Backend:** NestJS, TypeScript  
- **Frontend:** ReactJS, TypeScript, TailwindCSS  
- **Estado:** React Context API (autenticação)  
- **Autenticação:** JWT armazenado em localStorage  
- **Testes:** Jest (backend), React Testing Library (frontend)  

---

## Funcionalidades

- Cadastro e login de usuários  
- Autenticação com JWT e gerenciamento global de sessão via React Context  
- Rotas privadas protegidas no frontend  
- CRUD básico de usuários (a ser implementado)  
- Validação básica de formulário no frontend  

---

## Como Rodar

### Pré-requisitos

- Node.js instalado (versão 16+ recomendada)  
- (Opcional) Banco de dados PostgreSQL configurado para o backend  

### Passos para executar

1. Backend

```bash
cd backend
npm install
npm run start

2. Frontend

```bash
cd frontend
npm install
npm run start
