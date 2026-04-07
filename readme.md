# SmartNotes API

API backend desenvolvida como trabalho prático da disciplina **Desenvolvimento Web e Frameworks Web**.

O frontend da aplicação já está implementado e disponível em repositório do Github. 

https://github.com/dbfernandes/smartnotes-frontend

O trabalho consiste em implementar a API que o frontend consome.

O projeto implementa uma API REST para gerenciamento de notas pessoais, com autenticação baseada em sessão, persistência em MySQL e isolamento de dados por usuário.

## Objetivo

Permitir que cada usuário:

- crie sua própria conta
- faça login com sessão via cookie
- gerencie apenas as suas próprias notas

## Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| Runtime | Node.js |
| Framework | Express.js |
| Linguagem | TypeScript |
| ORM | Prisma |
| Banco de dados | MySQL |
| Validação | Joi |
| Sessão | express-session |
| Hash de senha | bcryptjs |
| Segurança | Helmet, CORS, express-rate-limit |
| Ambiente local | Docker Compose |

## Funcionalidades Implementadas

### Autenticação

- `POST /v1/auth/signup`
- `POST /v1/auth/login`
- `POST /v1/auth/logout`

### Notas

- `GET /v1/notes`
- `POST /v1/notes`
- `GET /v1/notes/:id`
- `PUT /v1/notes/:id`
- `DELETE /v1/notes/:id`

### Regras atendidas

- autenticação por sessão com cookie
- hash de senha com `bcryptjs`
- validação de entrada com `Joi`
- proteção de rotas com middleware de autenticação
- controle de acesso por usuário
- proteção contra IDOR com retorno `404`
- rate limiting global e para autenticação
- uso de variáveis de ambiente com `.env`
- `helmet` e `cors` configurados
- execução do `bcrypt` mesmo quando o e-mail não existe no login

## Modelo de Dados

### User

- `id`: UUID
- `email`: único, até 100 caracteres
- `fullname`: até 100 caracteres
- `password`: hash bcrypt com 60 caracteres
- `createdAt`
- `updatedAt`

### Note

- `id`: UUID
- `userId`: chave estrangeira para `User`
- `title`: até 100 caracteres
- `content`: texto longo
- `createdAt`
- `updatedAt`

## Estrutura do Projeto

```text
smartnotes-backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── docs/
│   └── docker-mysql.md
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── database/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── isAuth.ts
│   │   ├── rateLimit.ts
│   │   └── validateBody.ts
│   ├── resources/
│   │   ├── auth/
│   │   └── note/
│   ├── router/
│   │   ├── index.ts
│   │   └── v1Router.ts
│   ├── types/
│   │   └── session.d.ts
│   └── index.ts
├── .env.example
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Como Executar o Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Use o arquivo `.env.example` como base para criar o `.env`.

Exemplo:

```env
DATABASE_URL="mysql://root:password@localhost:3306/smartnotes"
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=smartnotes
NODE_ENV=development
PORT=3333
FRONTEND_ORIGIN="http://localhost:3001"
SESSION_SECRET="troque_este_valor"
```

### 3. Subir o banco de dados com Docker

```bash
docker compose up -d
```

### 4. Aplicar migration

```bash
npx prisma migrate dev --name init
```

### 5. Gerar client do Prisma

```bash
npx prisma generate
```

### 6. Executar a API

```bash
npm run dev
```

A aplicação será iniciada em:

```text
http://localhost:3333
```

## Scripts Disponíveis

```bash
npm run dev
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

## Endpoints

### Health Check

- `GET /v1/health`

### Auth

- `POST /v1/auth/signup`
- `POST /v1/auth/login`
- `POST /v1/auth/logout`

### Notes

- `GET /v1/notes`
- `POST /v1/notes`
- `GET /v1/notes/:id`
- `PUT /v1/notes/:id`
- `DELETE /v1/notes/:id`

## Exemplos de Requisição

### Cadastro

```bash
curl -i -X POST http://localhost:3333/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","fullname":"Teste User","password":"Senha@123"}'
```

### Login

```bash
curl -i -X POST http://localhost:3333/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"teste@teste.com","password":"Senha@123"}'
```

### Criar nota autenticada

```bash
curl -i -X POST http://localhost:3333/v1/notes \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Minha nota","content":"Conteudo da nota"}'
```

## Segurança Implementada

- `SESSION_SECRET` via variável de ambiente
- cookies com `httpOnly: true`
- `sameSite: "lax"`
- `secure: true` em produção
- `saveUninitialized: false`
- `helmet` para cabeçalhos de segurança
- `cors` com origem permitida configurada
- rate limiting global: `100 req / 15 min`
- rate limiting de autenticação: `10 req / 15 min`
- proteção contra enumeração de recursos com retorno `404`
- comparação de senha com bcrypt também quando o e-mail não existe

## Observações

- O frontend esperado pelo enunciado deve se comunicar com a API pela porta `3333`.
- O projeto foi preparado para uso local com Docker no banco MySQL.
- O arquivo `.env` não deve ser versionado.

## Aluno

- Marckson Monteiro da Silva
