# MySQL com Docker

## 1. Instalar o Docker

Instale o Docker Desktop ou Docker Engine no seu computador.

## 2. Subir o banco

Na pasta do projeto, execute:

```bash
docker compose up -d
```

Isso vai criar um container MySQL com:

- porta `3306`
- banco `smartnotes`
- usuário `root`
- senha `password`

## 3. Conferir se o container está rodando

```bash
docker compose ps
```

Se estiver saudável, o MySQL já pode receber conexões.

## 4. Rodar a migration do Prisma

```bash
npx prisma migrate dev --name init
```

## 5. Gerar o client do Prisma

```bash
npx prisma generate
```

## 6. Iniciar a API

```bash
npm run dev
```

## 7. Parar o banco

```bash
docker compose down
```

Se quiser parar e remover também o volume de dados:

```bash
docker compose down -v
```
