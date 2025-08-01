# react-dotnet

# Meus Estudos: React + .NET

Este repositório contém o progresso dos meus estudos sobre **desenvolvimento front-end com [React (TypeScript)](https://reactjs.org/)** e **back-end com [ASP.NET Core (.NET 9)](https://dotnet.microsoft.com/)**.

---
## Tecnologias

### Frontend:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [RTK Query (Redux Toolkit)](https://redux-toolkit.js.org/rtk-query/overview)
- [Ant Design](https://ant.design/)
- [Zod](https://zod.dev/) – Validação de formulários
- [React Hook Form](https://react-hook-form.com/)
- [React Router DOM](https://reactrouter.com/)

### Backend:
- [.NET 9](https://dotnet.microsoft.com/)
- [ASP.NET Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-9.0)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- Arquitetura em camadas (Domain, Infrastructure, WebAPI)

---
## Estrutura

📁 frontend/
┣ 📁 src/
┃ ┣ 📁 components/           # Componentes reutilizáveis (ex: ProductForm)
┃ ┣ 📁 pages/                # Páginas principais (Produto.tsx, EditarProduto.tsx)
┃ ┣ 📁 routes/               # Definição das rotas
┃ ┣ 📁 services/
┃ ┃ ┗ 📁 api/endpoints/      # Arquivos RTK Query
┃ ┣ 📁 types/                # Tipagens (Product.ts)
┃ ┣ 📁 validations/          # Schemas de validação (Zod)
┃ ┗ 📄 store.ts              # Configuração do Redux

📁 backend/
┣ 📁 WebApis/Controllers/
┣ 📁 Domain/
┃ ┣ 📁 Interfaces/
┃ ┗ 📁 Services/
┣ 📁 Infraestructure/
┃ ┗ 📁 Repository/
┣ 📁 Entities/Entities/
┗ 📄 Program.cs

📁 docs/

---
## Funcionalidades

### Frontend:
✅ Formulário de criação de produto com validação e feedback visual

✅ Edição de produto em tela separada

✅ Listagem de produtos com paginação e feedback de loading/erro

✅ Exclusão com confirmação

✅ Integração com API usando RTK Query

✅ Estilização com Ant Design

✅ Reaproveitamento de componentes (formulário)

### Backend:
✅ API REST em .NET 9 com endpoints:

-GET /api/products
-GET /api/products/{id}
-POST /api/products
-PUT /api/products/{id}
-DELETE /api/products/{id}

✅ Separação por camadas (Controller, Services, Repository)

✅ Validação básica e suporte a erros

✅ Estrutura pronta para expansão (ex: autenticação)

---
## Como Rodar o Projeto
✅ Backend (.NET)

cd backend
dotnet restore
dotnet build
dotnet run

✅ Frontend (React + Vite)

cd frontend
npm install
npm run dev

---

## 📌 Próximos Passos
---

## 👨‍💻 Autor
Desenvolvido por [Victor Souza](https://github.com/VictorSantos674) 👋
Projeto pessoal com foco em aprendizado e boas práticas de desenvolvimento frontend + backend.
---

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
---