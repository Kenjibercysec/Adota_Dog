# Adota Dog

Aplicação web em Next.js focada em aproximação entre doadores de cães e adotantes. Todo o fluxo foi desenhado para funcionar 100% no cliente, persistindo dados em `localStorage`, o que torna o projeto ideal para prototipagem, demos ou MVPs sem backend.

## Visão Geral

- **Login/Cadastro**: autenticação básica com e-mail e senha, armazenada em localStorage.
- **Busca**: catálogo filtrável de cães com campos como raça, fase da vida e sexo.
- **Detalhes do cão**: perfil completo com fotos, características especiais, botões para chat e agendamento.
- **Chat**: diálogo assíncrono entre adotante e doador por cão.
- **Agendamento**: formulário que registra visitas e retorna feedback visual de sucesso.
- **Configurações**: gestão da conta, endereço/região e cães cadastrados (CRUD completo).
- **Cadastro/Edição de cães**: formulários ricos com atributos booleanos e texto livre.

## Stack e Convenções

| Categoria        | Tecnologia / Padrão                          |
|------------------|----------------------------------------------|
| Runtime          | Next.js 16 (App Router) + React 19           |
| Linguagem        | TypeScript                                   |
| UI               | Tailwind CSS + componentes shadcn/ui         |
| Estado           | Hooks locais (`useAuth`, `useDogs`)          |
| Persistência     | `lib/storage.ts` com `localStorage`          |
| Ícones           | `lucide-react`                               |

- O projeto roda em modo client-side; componentes críticos fazem `use client`.
- Hooks responsáveis por dados garantem inicialização via `initializeStorage()`.
- Todos os formulários usam componentes reutilizáveis (`Input`, `Button`, `Label`, etc.).

## Estrutura Principal

```
app/
  page.tsx                # Login
  cadastro/               # Criar novo usuário
  busca/                  # Lista de cães + filtros
  detalhes/[id]/          # Perfil do cão (chat/agendar)
  agendar/                # Agendamento de visita
  cadastrar-cachorro/     # Criar perfil para doação
  editar-cachorro/[id]/   # Editar perfil existente
  configuracoes/          # Menu principal e subpáginas
components/
  chat-dialog.tsx         # Modal de chat
  ui/                     # Biblioteca shadcn adaptada
hooks/
  use-auth.ts             # Contexto de usuário
  use-dogs.ts             # CRUD e busca de cães
lib/
  storage.ts              # Modelos, seeds e operações
```

## Fluxos de Dados

- `lib/storage.ts` define modelos `User`, `Dog`, `Visit` e `Message`, além de funções CRUD sincronizadas com `localStorage`.
- `useAuth()` expõe `user`, `loading` e métodos (`login`, `logout`, `register`, `updateProfile`).
- `useDogs()` oferece `dogs`, `loading`, `search`, `addDog`, `editDog`, `removeDog`, `getDog`, `reload`.
- `ChatDialog` consulta e envia mensagens por `dogId`.

## Guias de Uso

### Requisitos

- Node.js 20+
- npm (ou pnpm/yarn)

### Instalação e Execução

```bash
npm install          # instala dependências
npm run dev          # modo desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm start            # roda build produzido
```

Como o banco é `localStorage`, basta abrir o app no navegador para persistir dados localmente. Ao limpar dados do site ou usar outra máquina, os seeds são recriados automaticamente.

---

Qualquer dúvida ou sugestão, abra uma issue ou contribua via pull request!

