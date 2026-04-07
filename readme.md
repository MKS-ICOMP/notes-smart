# Trabalho Prático: SmartNotes API
**Disciplina:** Desenvolvimento Web e Frameworks Web

## 1. Descrição
O **SmartNotes** é uma aplicação de notas pessoais onde cada usuário gerencia suas próprias notas com total privacidade. O trabalho foca no desenvolvimento da **API** em Node.js que servirá ao frontend já existente.

## 2. Stack Obrigatória
A API deve ser construída utilizando as seguintes tecnologias:

| Camada | Tecnologia |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Linguagem** | TypeScript |
| **ORM** | Prisma |
| **Banco de dados** | MySQL |
| **Validação** | Joi |
| **Autenticação** | express-session |
| **Hash de senha** | bcryptjs |

## 3. Modelo de Dados
O aluno deve criar o schema Prisma contendo duas entidades principais:

### User
* **id:** String (UUID, chave primária)
* **email:** String (Único, máx. 100 caracteres)
* **fullname:** String (Máx. 100 caracteres)
* **password:** String (60 caracteres para o hash bcrypt)
* **createdAt / updatedAt:** DateTime (Gerados automaticamente)

### Note
* **id:** String (UUID, chave primária)
* **userId:** String (Chave estrangeira vinculada a User)
* **title:** String (Máx. 100 caracteres)
* **content:** String (Texto longo)
* **createdAt / updatedAt:** DateTime (Gerados automaticamente)

## 4. Endpoints (Prefixo `/v1`)

### 4.1 Autenticação (`/v1/auth`)
* **POST /signup:** Cria conta. Retorna 201 (Sucesso), 400 (E-mail duplicado) ou 422 (Erro de validação).
* **POST /login:** Autentica e inicia sessão (Cookie). Retorna 200 (Sucesso), 401 (Inválido) ou 422 (Erro de validação).
* **POST /logout:** Encerra sessão (Rota protegida). Retorna 200 ou 401.

### 4.2 Notas (`/v1/notes`)
*Todas as rotas abaixo requerem sessão ativa e limitam-se aos dados do usuário autenticado*

* **GET /:** Lista todas as notas do usuário.
* **POST /:** Cria nova nota.
* **GET /:id:** Detalhes de uma nota específica.
* **PUT /:id:** Atualiza uma nota.
* **DELETE /:id:** Remove uma nota.

## 5. Regras de Validação
* **Senha:** Mínimo 8 caracteres, maiúsculas, minúsculas, números e caracteres especiais.
* **Título:** Entre 3 e 100 caracteres.
* **Conteúdo:** Mínimo 1 caractere.

## 6. Requisitos de Segurança (Obrigatórios) 
* **Segredos:** Uso obrigatório de arquivo `.env`.
* **Hash:** Senhas via bcryptjs.
* **Sessão:** Configurar `httpOnly: true`, `secure: true` (em prod), `sameSite: "lax"` e `saveUninitialized: false`.
* **IDOR:** Se uma nota não pertencer ao usuário, a API deve retornar **404**, nunca 403, para não revelar a existência do recurso.
* **Rate Limiting:** Global (100 req/15min) e Auth (10 req/15min).
* **CORS & Helmet:** Configurar origem permitida e cabeçalhos de segurança básicos.
* **Timing Attack:** O login deve executar o bcrypt mesmo se o e-mail não existir.

## 7. Estrutura de Arquivos
```text
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.ts
│   ├── router/
│   │   ├── index.ts
│   │   └── v1Router.ts
│   ├── middlewares/
│   │   ├── isAuth.ts
│   │   └── validateBody.ts
│   └── resources/
│       ├── auth/
│       │   ├── auth.controller.ts
│       │   ├── auth.router.ts
│       │   └── auth.service.ts (etc.)
│       └── note/
│           ├── note.controller.ts
│           └── note.service.ts (etc.)
├── .env
└── package.json
```

## 8. Execução do Frontend
A API deve rodar na porta **3333** para se comunicar com o frontend (que roda na porta 3001).

## 9. Critérios de Avaliação
* **Endpoints:** 30%
* **Autenticação por sessão:** 15%
* **Autorização (IDOR):** 15%
* **Hash & Segredos:** 10%
* **Validações (Joi):** 10%
* **Rate Limiting, CORS, Timing Attack, Helmet:** 5% cada.