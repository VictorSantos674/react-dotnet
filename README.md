# 🚀 Sistema de Gerenciamento de Produtos - React + .NET

![Status](https://img.shields.io/badge/Status-Fase%202%20Concluída-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![.NET](https://img.shields.io/badge/.NET-9.0-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

Sistema completo de gerenciamento de produtos com autenticação JWT, interface responsiva e experiência de usuário premium.

## ✨ Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação**
- Login e registro de usuários
- Autenticação JWT segura
- Logout automático
- Proteção de rotas

### 📦 **Gestão de Produtos**
- CRUD completo de produtos
- Paginação inteligente
- Busca em tempo real
- Upload de imagens (pronto para implementar)

### 🎨 **Experiência do Usuário**
- Interface responsiva (Desktop, Tablet, Mobile)
- Tema claro/escuro
- Animações suaves CSS
- Loading states elegantes
- Notificações toast profissionais

### ⚡ **Performance**
- Otimização com React.memo
- Code splitting automático
- Cache inteligente com RTK Query
- Carregamento lazy de componentes

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** + TypeScript
- **Redux Toolkit** + RTK Query
- **Ant Design** UI Components
- **React Hook Form** + Zod Validation
- **React Router v6**

### Backend
- **.NET 9** + ASP.NET Core
- **Entity Framework Core**
- **JWT Authentication**
- **SQL Server**
- **Swagger/OpenAPI**

### DevOps
- **Docker** ready
- **GitHub Actions** CI/CD
- **Environment-based** configuration

## 📦 Estrutura do Projeto

```
react-dotnet/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # APIs e serviços
│   │   ├── store/           # Gerenciamento de estado
│   │   ├── types/           # Definições TypeScript
│   │   ├── hooks/           # Custom hooks
│   │   └── styles/          # Estilos e animações
│   └── package.json
│
├── backend/                 # API .NET
│   ├── WebApis/            # Controllers
│   ├── Domain/             # Lógica de negócio
│   ├── Infrastructure/     # Data access
│   ├── Entities/           # Modelos de dados
│   └── Program.cs
│
├── docker/                 # Configuração Docker
└── docs/                  # Documentação
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- .NET 9 SDK
- SQL Server
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/VictorSantos674/react-dotnet.git
cd react-dotnet
```

### 2. Backend
```bash
cd backend
dotnet restore
dotnet run
```
API estará disponível em: `http://localhost:5000`
Swagger: `http://localhost:5000/swagger`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend estará disponível em: `http://localhost:5173`

### 4. Credenciais de Teste
**Usuário:** `admin` | **Senha:** `123456`
**Usuário:** `victor` | **Senha:** `senha123`

## 🎨 Funcionalidades de UX Implementadas

### ✨ Loading States
- Skeletons elegantes durante carregamento
- Animações de pulsação suaves
- Feedback visual imediato

### 🔔 Sistema de Notificações
- Toasts positionáveis
- Múltiplos tipos (success, error, warning, info)
- Duração customizável
- Animações de entrada/saída

### 📱 Responsividade
- Design mobile-first
- Breakpoints inteligentes
- Layout adaptativo
- Touch-friendly interfaces

### 🎭 Animações
- Transições CSS suaves
- Efeitos hover elegantes
- Carregamento progressivo
- Feedback visual de ações

## 🔧 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário

### Produtos
- `GET /api/produto` - Listar produtos (com paginação)
- `GET /api/produto/{id}` - Obter produto por ID
- `POST /api/produto` - Criar novo produto
- `PUT /api/produto/{id}` - Atualizar produto
- `DELETE /api/produto/{id}` - Deletar produto
- `GET /api/produto/buscar-por-nome/{nome}` - Buscar produtos

## 🚀 Scripts Disponíveis

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test         # Executar testes
```

### Backend
```bash
dotnet run           # Executar aplicação
dotnet test          # Executar testes
dotnet watch         # Hot reload development
```

## 📊 Status do Projeto

### ✅ Fase 1 - Concluída
- Arquitetura em camadas
- Autenticação JWT segura
- CRUD completo de produtos
- Integração frontend-backend

### ✅ Fase 2 - Concluída  
- Experiência do usuário premium
- Interface responsiva
- Animações e micro-interactions
- Sistema de notificações

### 🔄 Fase 3 - Em Breve
- Otimização de performance
- Testes automatizados
- PWA capabilities
- Monitoramento

## 🐛 Reportar Problemas

Encontrou um bug? [Abra uma issue](https://github.com/VictorSantos674/react-dotnet/issues) no GitHub.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Victor Souza** - [GitHub](https://github.com/VictorSantos674) | [LinkedIn](https://linkedin.com/in/victorsouzadev)

---

**✨ Destaques Técnicos:**
- ✅ 100% TypeScript
- ✅ Arquitetura escalável
- ✅ Code splitting automático
- ✅ Cache inteligente com RTK Query
- ✅ Design system consistente
- ✅ Performance otimizada
- ✅ SEO friendly
- ✅ Acessibilidade

**🚀 Próximas Features:**
- Upload de imagens para produtos
- Dashboard analítico
- Exportação de dados (PDF/Excel)
- Notificações em tempo real
- Multi-idioma (i18n)
- Tema customizável

---

⭐ **Se este projeto te ajudou, deixe uma star no GitHub!**