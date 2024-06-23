# POC

# Tecnologia

## FrontEnd
- Nextjs
- Typescript
- Tailwindcss
- Shadcnui
- Zod

## Backend
- Node
- Prisma
- Typescript
- Zod
- Mysql

## Instalação
para a instalar as dependecias do projeto voce pode usar seu gerenciador de pacotes favorito: ex npm, yarn, pnpm, bun!
```
npm install
```

## Iniciar Servidor
para inicar o servidor podemos rodar o comando:
```
npm run dev
```

## Configuração do banco de dados
Para ajustar seu banco de dados corretamente voce precisa do arquivo `.env`
```
DATABASE_URL="mysql://root:@localhost:3306/sportfy_poc"

Explicação
DATABASE_URL="DBA://user:password@localhost/name_database"
```

## Banco Estruturado
para visualizar o banco estruturado, voce pode rodar esse comando
```
npm run prisma studio
```


# Estrutura de Pastas
```
├─ 
│
├── app
│   ├── api
│   │   ├── modalidade
│   │   │   ├── [id]
│   │   │   │   ├── regras
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── regras
│   │   │   └── route.ts
│   │   ├── regra
│   │   │   └── [id]
│   │   │       └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── lib
│   └── utils.ts
├── prisma
│   ├── migrations
│   └── schema.prisma
├── components
│   └── ui
│       ├── route.ts
│       ├── route.ts
│       ├── route.ts
│       └── route.ts
│   ├── migrations
│   └── migrations
│   
├── node_modules
├── .env
├── tsconfig.json
├── package.json
├── next.config.js
└── ...
```

# Historia Usuario

Histórias de Usuário - HU21 (Gerenciar modalidades esportivas)
Sendo um administrador
Quero realizar operações CRUD em modalidades esportivas
Para gerenciar eficientemente as modalidades disponíveis na plataforma e garantir a precisão e relevância das informações relacionadas ao esporte

---

Critério de Aceitação 01 - HU21
Critério: Criação de modalidades esportivas
Dado que sou um administrador logado na plataforma
Quando desejo adicionar uma nova modalidade esportiva
Então devo ter a opção de criar uma nova modalidade, fornecendo os detalhes necessários, como imagem, nome, descrição, regras e metas esportivas.

---

Critério de Aceitação 02 - HU21
Critério: Leitura de modalidades esportivas
Dado que sou um administrador logado na plataforma
Quando desejo visualizar as modalidades esportivas existentes
Então devo ser capaz de ver uma lista de todas as modalidades cadastradas, com seus respectivos detalhes

---

Critério de Aceitação 03 - HU21
Critério: Atualização de modalidades esportivas
Dado que sou um administrador logado na plataforma
Quando desejo editar os detalhes de uma modalidade esportiva existente
Então devo ter a opção de modificar as informações da modalidade, como imagem, nome, descrição, regras e metas esportivas.

---

Critério de Aceitação 04 - HU21
Critério: Exclusão de modalidades esportivas
Dado que sou um administrador logado na plataforma
Quando desejo remover uma modalidade esportiva existente
Então devo ter a opção de excluir a modalidade, garantindo que ela seja removida completamente do sistema.

