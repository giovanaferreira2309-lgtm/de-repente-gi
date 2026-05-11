# de-repente-gi

Plataforma da Giovana para o desafio de 21 dias "Do Zero ao Viver de Internet" — uma comunidade de aprendizado sobre monetização e marca pessoal. Produto real com usuários reais.

## Stack

- **Frontend**: React 19 + Vite + TailwindCSS + React Router v7
- **Backend (futuro)**: Supabase (auth + PostgreSQL + storage)
- **Deploy**: Vercel

## Comandos

```bash
npm run dev      # dev server (localhost:5173)
npm run build    # build produção
npm run lint     # ESLint
npm run preview  # preview do build
```

## Estrutura

```
src/
  pages/       # Rotas principais
  components/  # Componentes reutilizáveis (Navbar, Avatar, Badge)
  data/        # mockData.js — dados temporários até integrar Supabase
```

## Rotas

| Rota | Página |
|------|--------|
| `/` | Home — hero e preview do desafio |
| `/comunidade` | Feed social com posts e reações |
| `/perfil/:userId` | Perfil individual do usuário |
| `/ranking` | Leaderboard de participantes |
| `/biblioteca` | Links e vídeos de apoio |

## Design System

Paleta definida em `tailwind.config.js`:
- **Lilac**: cor primária (tons 50–900)
- **Coral**: cor secundária/acento (tons 50–900)

Animações customizadas: `fade-in`, `slide-up`, `float`, `pulse-slow`

Componentes base:
- `Avatar` — foto com fallback em iniciais
- `Badge` — variantes: `lilac`, `coral`, `green`, `gray`, `gold`

## Convenções

- Componentes em `PascalCase`, arquivos `.jsx`
- Tailwind direto no JSX — sem CSS modules separados
- JavaScript puro — sem TypeScript por enquanto
- Comentários só quando o **porquê** não é óbvio

## Estado Atual

Todo o dado vem de `src/data/mockData.js`. Funcionalidades implementadas:
- Feed social com reações e comentários
- Ranking com medalhas
- Perfis com progresso e conquistas
- Biblioteca de recursos e vídeos
- Notificações (mock)
- Sistema de conquistas (12 badges)

## Roadmap

1. **Supabase** — substituir mock data por auth + banco real
2. **Pagamento** — acesso ao desafio via assinatura
3. **Gamificação** — novos desafios e conquistas dinâmicas

## Fluxo de Trabalho

> Estas instruções assumem que você é uma pessoa de marketing sem experiência prévia com desenvolvimento de software. Siga os passos abaixo — Claude vai cuidar dos detalhes técnicos.

### Começando uma nova funcionalidade

Antes de qualquer alteração, Claude deve:
1. Criar uma nova branch com o prefixo `feat/` (ex: `feat/pagina-de-pagamento`)
2. Todas as mudanças devem ser feitas **nessa branch**, nunca diretamente na `main`

Você não precisa saber o que é uma branch — pense nela como um rascunho separado do projeto. O site ao vivo não é afetado enquanto trabalhamos no rascunho.

### Finalizando um bloco de trabalho

Ao concluir uma sessão de alterações, Claude deve **sempre perguntar**:

> "As alterações estão prontas. Deseja publicar essa funcionalidade? Posso abrir um Pull Request da branch `feat/...` para a `main`, o que vai iniciar o processo de deploy no Vercel."

Só abrir o Pull Request (PR) **se a resposta for sim**. Um PR é como pedir uma revisão antes de publicar — você aprova, e o site é atualizado automaticamente via Vercel.

### Resumo do ciclo

```
Nova feature pedida
      ↓
Claude cria feat/nome-da-feature
      ↓
Alterações feitas e commitadas na branch
      ↓
Claude pergunta se quer fazer deploy
      ↓
Se sim → abre PR feat/* → main → Vercel publica
```

## Filosofia

Simples e direto. Não abstrair antes de precisar. Iterar rápido sem preparar para hipotéticos.
