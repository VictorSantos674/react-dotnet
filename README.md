🚀 Sistema de Gerenciamento de Produtos - React + .NET
Uma aplicação full-stack moderna para gerenciamento de produtos, desenvolvida com React no frontend e .NET no backend. Este projeto de nível profissional inclui autenticação JWT, design responsivo, gerenciamento de estado avançado e operações CRUD completas, demonstrando o uso de tecnologias e práticas de mercado.

✨ Funcionalidades
🔐 Autenticação JWT: Login e registro de usuários de forma segura.

📱 Design Responsivo: Interface adaptável a diferentes dispositivos, construída com Ant Design.

🚀 Gerenciamento de Estado: Utiliza RTK Query para busca e cache eficientes de dados.

📊 Gerenciamento de Produtos: CRUD completo (criar, ler, atualizar, deletar) com paginação e busca em tempo real.

🎨 Suporte a Temas: Alternância entre modos claro e escuro.

🔍 Busca Avançada: Pesquisa de produtos em tempo real.

🛡️ Validação de Formulários: Validação robusta de dados de entrada com Zod.

📈 Paginação: Carregamento eficiente de dados.

🎯 Type Safety: Cobertura completa com TypeScript para um código mais seguro.

🛠️ Stack Tecnológica
Frontend
React 18 + TypeScript: Biblioteca principal com tipagem estática.

Redux Toolkit & RTK Query: Gerenciamento de estado e requisições de API.

Ant Design: Biblioteca de componentes de UI.

React Hook Form + Zod: Gerenciamento e validação de formulários.

React Router v6: Roteamento da aplicação.

Axios: Cliente HTTP para o backend.

Backend
.NET 9 + ASP.NET Core: Framework para a API RESTful.

Entity Framework Core: ORM para acesso ao banco de dados SQL Server.

Autenticação JWT Bearer: Padrão de segurança para APIs.

Repository Pattern & Dependency Injection: Padrões de projeto para código organizado.

Swagger/OpenAPI: Geração de documentação interativa da API.

xUnit: Framework para testes unitários.

DevOps
Docker: Conteinerização da aplicação.

GitHub Actions: Pipelines de Integração Contínua e Entrega Contínua (CI/CD).

Configuração baseada em ambiente: Gerenciamento de variáveis de ambiente.

📦 Estrutura do Projeto
react-dotnet/
├── .github/              # Workflows do GitHub Actions
├── backend/              # Aplicação .NET Web API
│   ├── Controllers/      # Endpoints da API
│   ├── Entities/         # Entidades do banco de dados
│   ├── Infrastructure/   # Repositórios e persistência
│   └── Program.cs
│
├── frontend/             # Aplicação React + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes UI reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # API + RTK Query
│   │   ├── store/        # Redux store
│   │   └── types/        # Definições TypeScript
│   └── package.json
│
├── docker/               # Arquivos de configuração Docker
└── README.md


🚀 Como Executar
Pré-requisitos
Node.js 18+

.NET 9 SDK

SQL Server (ou Docker)

Git

Instalação e Execução
Primeiro, clone o repositório e navegue até a pasta do projeto:

git clone https://github.com/VictorSantos674/react-dotnet.git
cd react-dotnet


🔹 Backend
cd backend
dotnet restore
dotnet build
dotnet run


🔹 Frontend
cd frontend
npm install
npm run dev


🔹 Configuração de Ambiente
Crie arquivos .env na raiz das pastas backend e frontend para configurar as variáveis de ambiente:

backend/.env

Jwt__Key=SuaChaveSuperSecretaAquiCom32Caracteres
Jwt__Issuer=SuaApp
Jwt__Audience=SeusUsuarios


frontend/.env

VITE_API_BASE_URL=http://localhost:5000


🔹 Docker
Você também pode subir a aplicação usando Docker Compose:

docker-compose up -d


📚 Documentação da API
A documentação da API pode ser acessada em http://localhost:5000/swagger após a execução do backend.

Endpoints Principais
Método

Endpoint

Descrição

POST

/api/auth/login

Login de usuário

POST

/api/auth/register

Registro de novo usuário

GET

/api/produtos

Lista produtos (paginado)

GET

/api/produtos/{id}

Obtém produto por ID

POST

/api/produtos

Cria um novo produto

PUT

/api/produtos/{id}

Atualiza um produto existente

DELETE

/api/produtos/{id}

Deleta um produto

GET

/api/produtos/buscar-por-nome/{nome}

Busca produtos por nome

🧪 Testes
Frontend
cd frontend
npm test                 # Executa os testes unitários
npm run test:coverage    # Gera relatório de cobertura de testes
npm run test:e2e         # Executa os testes de ponta a ponta


Backend
cd backend
dotnet test
dotnet test --filter "Category=Unit" # Executa apenas testes unitários


🚀 Deploy
Build de Produção
# Frontend
cd frontend
npm run build

# Backend
cd backend
dotnet publish -c Release


Opções de Deploy
Frontend: Vercel, Netlify

Backend: Azure App Service, AWS Elastic Beanstalk

Infra: Docker / Kubernetes

🤝 Como Contribuir
Faça um fork do projeto.

Crie uma nova branch para sua feature:

git checkout -b feature/MinhaFeature


Commit suas mudanças:

git commit -m "Adiciona MinhaFeature"


Faça o push para a branch:

git push origin feature/MinhaFeature


Abra um Pull Request 🎉

📝 Padrões de Código
Frontend: Utiliza TypeScript em modo estrito, ESLint e Prettier para padronização. A arquitetura é componentizada e segue as melhores práticas do Redux Toolkit.

Backend: Adota o padrão de Clean Architecture e Repository Pattern, com injeção de dependência e tratamento de erros robusto.

🐛 Solução de Problemas
Erro de conexão com o banco de dados: Verifique se sua string de conexão está correta e se o SQL Server está em execução.

Problema com autenticação JWT: Confirme se as chaves, issuer e audience estão configuradas corretamente no arquivo .env.

Erro de CORS: Certifique-se de que a URL do frontend está permitida nas configurações do backend.

📄 Licença
Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Victor Souza
[GitHub]()
[LinkedIn]()