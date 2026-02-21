# Tropinha Flix

Aplicativo de filmes multiplataforma (iOS, Android e Web) construído com **Expo** e **React Native**. Permite explorar catálogo de filmes (via TMDB), ver detalhes, manter listas “Quero Assistir” e “Já Assistido” e abrir links para assistir.

---

## Descrição do projeto

O **Tropinha Flix** é um app de filmes que oferece:

- **Início**: banner e listas “Em cartaz”, “Populares” e “Mais votados” consumindo a API do [The Movie Database (TMDB)](https://www.themoviedb.org/).
- **Detalhes do filme**: sinopse, nota, data de lançamento, gêneros e ações para adicionar/remover das listas e abrir link externo.
- **Quero Assistir**: lista de favoritos persistida localmente.
- **Já Assistido**: lista de filmes já assistidos, também persistida localmente.

A navegação é feita por **drawer** (menu lateral) entre Início, Quero Assistir e Já Assistido, e por **stack** para tela de detalhes e de reprodução (WebView).

---

## Como rodar o projeto

### Pré-requisitos

- **Node.js** (versão compatível com o Expo 54)
- **npm** ou **yarn**
- Para mobile: **Expo Go** no celular ou emulador/simulador (Android Studio / Xcode)

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd tropinha-flix-app
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e defina a chave da API do TMDB:

```bash
cp .env.example .env
```

Edite o `.env` e preencha sua chave (obtida em [TMDB – API](https://www.themoviedb.org/settings/api)):

```env
EXPO_PUBLIC_API_KEY=sua_chave_aqui
```

> A variável `EXPO_PUBLIC_*` é exposta ao cliente; não coloque segredos além da chave de API do TMDB.

### 3. Iniciar o app

```bash
npx expo start
```

Na saída do terminal você pode:

- **Development build**: abrir em um build de desenvolvimento.
- **Android**: `npx expo start --android` ou abrir no emulador pelo menu.
- **iOS**: `npx expo start --ios` ou abrir no simulador pelo menu.
- **Web**: `npx expo start --web` ou abrir no navegador pelo menu.
- **Expo Go**: escanear o QR code com o app Expo Go no celular (ambiente limitado, mas útil para testes rápidos).

### Scripts disponíveis

| Comando            | Descrição                          |
|--------------------|------------------------------------|
| `npm start`        | Inicia o Expo (equivalente a `npx expo start`) |
| `npm run android`  | Inicia direto no Android           |
| `npm run ios`      | Inicia direto no iOS               |
| `npm run web`      | Inicia na Web                      |
| `npm run lint`     | Roda o ESLint                      |
| `npm run commit`   | Abre o Commitizen para commits padronizados    |

---

## Arquitetura

### Estrutura de pastas

```
tropinha-flix-app/
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx         # Layout raiz (Stack)
│   ├── (drawer)/           # Grupo com Drawer
│   │   ├── _layout.tsx     # Drawer (Início, Quero Assistir, Já Assistido)
│   │   ├── index.tsx       # Tela Início
│   │   ├── (movies)/       # Tela Quero Assistir
│   │   └── (watch)/        # Tela Já Assistido
│   ├── (details)/[id].tsx # Detalhes do filme (Stack)
│   └── (watch)/page.tsx    # Tela de assistir (WebView)
├── components/             # Componentes reutilizáveis
├── constants/              # Tema (cores, fontes)
├── hooks/                  # Hooks (useMovieStorage, tema, etc.)
├── lib/                    # Cliente HTTP (Axios + TMDB)
├── services/               # Regras de negócio
│   └── repositories/       # Acesso a dados (AsyncStorage)
├── utils/                  # Funções auxiliares (storage, movies)
└── @types/                 # Tipos TypeScript (Movie, Genre)
```

### Navegação

- **Root**: `Stack` com as telas `(drawer)`, `(details)/[id]` e, se usado, a tela de watch.
- **Drawer**: agrupa **Início**, **Quero Assistir** (movies) e **Já Assistido** (watch). Header do drawer customizado (título “Tropinha Flix”, estilo escuro).
- **Detalhes**: rota dinâmica `(details)/[id]` para exibir um filme por ID.
- **Path alias**: `@/*` aponta para a raiz do projeto (`tsconfig.json`).

### Camadas de dados

- **API (TMDB)**: `lib/api.ts` — instância do Axios com `baseURL` em `https://api.themoviedb.org/3`. A chave é lida de `process.env.EXPO_PUBLIC_API_KEY`.
- **Repositório**: `services/repositories/MovieRepository.ts` — lê/grava listas de favoritos e assistidos no **AsyncStorage** (`@tropinhaflix` e `@tropinhaflix_watched`).
- **Serviço**: `services/MovieService.ts` — orquestra regras (evitar duplicados, adicionar/remover favoritos e assistidos) usando o `MovieRepository`.
- **Hook**: `hooks/useMovieStorage.ts` — expõe as operações do `MovieService` para as telas (add/remove/is favorite e watched, get lists).

A pasta `utils/storage.ts` contém funções legadas de persistência; as telas novas preferem o fluxo **Service + Repository + useMovieStorage**.

---

## Decisões técnicas e arquiteturais

### Stack principal

- **Expo (SDK 54)** e **React Native**: desenvolvimento multiplataforma com uma base única (mobile + web).
- **TypeScript**: tipagem estática e melhor manutenção.
- **Expo Router (file-based)**: rotas baseadas na estrutura de pastas em `app/`, com suporte a grupos `(drawer)`, `(details)`, `(watch)` e rota dinâmica `[id]`.
- **React Navigation**: Drawer e Stack via `@react-navigation/drawer` e `expo-router`.

### Fonte de dados de filmes

- **The Movie Database (TMDB)** como única fonte de catálogo (em cartaz, populares, top rated, detalhes, imagens).
- Requisições com `language: 'pt_BR'` onde a API permite.
- Imagens via `https://image.tmdb.org/t/p/original/` (e variantes quando usado).

### Persistência local

- **AsyncStorage** para listas “Quero Assistir” e “Já Assistido”, sem backend próprio.
- Chaves fixas: `@tropinhaflix` (favoritos) e `@tropinhaflix_watched` (assistidos).
- Dados armazenados como JSON (array de objetos `Movie`).

### Arquitetura de domínio (listas de filmes)

- **Repository** abstrai o AsyncStorage; **Service** aplica regras (ex.: não duplicar filme na mesma lista).
- **useMovieStorage** centraliza o uso do `MovieService` nas telas, mantendo a UI desacoplada da implementação de persistência.
- Tipos compartilhados em `@types/movies.ts` (`Movie`, `Genre`).

### UI e tema

- Estilos com **StyleSheet** do React Native (arquivos `styles.ts`/`styles.tsx` por tela/componente).
- **constants/theme.ts**: paleta (cores claras/escuras, gray, secondary, etc.), tamanhos de fonte e fontes por plataforma (iOS, default, web).
- Drawer e telas seguem tema escuro (ex.: `Colors.gray_900`, `Colors.secondary_400` para destaque).
- **expo-status-bar**: `style="light"` nas telas principais.
- Ícones: **@expo/vector-icons** (Feather, FontAwesome, etc.).

### Qualidade e padrões

- **ESLint** com `eslint-config-expo`.
- **Commitizen** + `cz-conventional-changelog` para mensagens de commit padronizadas (`npm run commit`).
- **Expo**: New Architecture habilitada; experiências como `typedRoutes` e `reactCompiler` ativadas em `app.json`.

### Outras dependências relevantes

- **Axios**: chamadas à API do TMDB.
- **expo-image**: carregamento de imagens.
- **expo-web-browser** / **react-native-webview**: abrir links e tela “assistir”.
- **react-native-reanimated** e **react-native-gesture-handler**: animações e gestos (drawer, etc.).

---

## Tecnologias

| Área           | Tecnologias |
|----------------|-------------|
| Framework      | React Native, Expo (SDK 54) |
| Linguagem      | TypeScript |
| Roteamento     | Expo Router, React Navigation (Drawer, Stack) |
| HTTP           | Axios |
| Persistência   | @react-native-async-storage/async-storage |
| UI / Ícones    | @expo/vector-icons, expo-status-bar, expo-image |
| Qualidade      | ESLint (expo), Commitizen (cz-conventional-changelog) |

---

## Observações

- O arquivo `.env` não deve ser versionado; use `.env.example` como referência.
- Para produção, configure um build (EAS Build ou build nativo) em vez de depender só do Expo Go.
- A API do TMDB tem limites de uso; a chave é obrigatória para o app funcionar.
