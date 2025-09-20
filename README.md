ver ip wsl:
ip addr show eth0

# CRUD USERS

Aqui temos uma aplicação back-end com operações CRUD de usuários, você encontrará um sistema que permite aos usuários se cadastrarem, atualizarem suas informações, deletarem suas contas e visualizarem seus próprios perfis. Este projeto foi criado com o intuito de aprender mais sobre as tecnologias MongoDB e Prisma, além de servir como um experimento valioso de aprendizado.

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:CarlosX26/crud-users-mongodb.git
```

Entre no diretório do projeto

```bash
  cd crud-users-mongodb
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`SECRET_KEY`

## Documentação da API

#### Autenticação

```http
  POST /auth
```

#### body

```json
{
  "email": "carl@mail.com",
  "password": "1234aB"
}
```

#### response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODA1MjI1MTksImV4cCI6MTY4MDUyNjExOSwic3ViIjoiNjQyYWJhOWFkNjc2NmUwYzNlNTNmMzkzIn0.dA1DuWlnlA1pUyUKtNSI-URS7ieRCVt1piG1WYAalDQ"
}
```

#### Criação de usúarios

```http
  POST /users
```

#### body

```json
{
  "name": "Carlos Jr.",
  "age": 21,
  "email": "carl@mail.com",
  "password": "1234aB"
}
```

#### response

```json
{
  "name": "Carlos Jr.",
  "email": "carl@mail.com",
  "age": 21,
  "id": "642abd1a0d31372136eae7e0"
}
```

#### Listagem de usúarios

```http
  GET /users
```

#### response

```json
[
  {
    "name": "Carlos Jr.",
    "email": "carl@mail.com",
    "age": 21,
    "id": "642aba9ad6766e0c3e53f393"
  }
]
```

| Parâmetro      | Tipo     | Descrição        |
| :------------- | :------- | :--------------- |
| `Bearer token` | `string` | **Obrigatório**. |

#### Listagem de perfil do usúario

```http
  GET /users/profile
```

#### response

```json
{
  "name": "Carlos Jr.",
  "email": "carl@mail.com",
  "age": 21,
  "id": "642aba9ad6766e0c3e53f393"
}
```

| Parâmetro      | Tipo     | Descrição        |
| :------------- | :------- | :--------------- |
| `Bearer token` | `string` | **Obrigatório**. |

#### Atualizar perfil do usúario

```http
  PATCH /users/profile
```

#### body

```json
{
  "name": "Carlos J.S.F."
}
```

#### response

```json
{
  "name": "Carlos J.S.F.",
  "email": "carl@mail.com",
  "age": 21,
  "id": "642aba9ad6766e0c3e53f393"
}
```

| Parâmetro      | Tipo     | Descrição        |
| :------------- | :------- | :--------------- |
| `Bearer token` | `string` | **Obrigatório**. |

```http
  DELETE /users/profile
```

#### response status code 204

| Parâmetro      | Tipo     | Descrição        |
| :------------- | :------- | :--------------- |
| `Bearer token` | `string` | **Obrigatório**. |

## Stack utilizada

**Back-end:** Node, Express, Prisma e MongoDB.
# c-chat-back
