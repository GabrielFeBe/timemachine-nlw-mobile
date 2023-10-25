# Maquina do tempo - Mobile

## Configurações do projeto

- Projeto feito no bootcamp da Rocketseat Ignite, para criar um app mobile para o projeto de gerenciamento de tempo de estudo.

- Projeto feito usando Expo, Tail Wind,React Native, Axios, DayJS e usando Github como forma de autentificação para logar.

- Usando Babel para fazer o Tail Wind funcionar.

## Como rodar o projeto

- Para instalar o projeto, basta clonar o repositório e rodar o comando `npm install` para instalar as dependências.

- Para rodar o projeto, basta rodar o comando `npm run android` para rodar o projeto no android, `npm run ios` para rodar no ios e `npm run web` para rodar no navegador.

## Paginas

- `/` - Pagina inicial, onde o usuário pode logar com o Github, lembrando que a pagina inicial vai mudar se você estiver logado ou não, mostrando as memorias registradas para um usuario logado.
- `/memories/new` - Pagina onde o usuário pode criar uma nova memória, só acessivel a usuários autenticados.
- Não fiz todas as paginas, pois o emulador para Linux é muito lagado, então não consegui testar tudo.

## API

- Lembrando que esse projeto é conectado ou `Maquina do tempo - BE`, que é a API que sgerencia as memorias.
- A conexão é feita atraves do arquivo `src/lib/api.ts`, onde é definido a url base da API.
- A URL muda de acordo com a porta que o projeto esta rodando, se for em modo de desenvolvimento, a url base é `http://localhost:3333`, se for em produção a url depende do dominio que o projeto esta rodando, também é bom mencionar que ao rodar em produção temos que fazer a configuração do CORS no BE.

## Github

- Para configurar a autentificação no mobile, é necessario mudar o arquivo index.tsx, que fica em `app/index.tsx`, mudando o `clientId` para o id do cliente de autentificação do github, que é o mesmo que esta no BE.
- Também configurar o `const discovery` que está no `index.ts`.

```json
{
  "authorizationEndpoint": "https://github.com/login/oauth/authorize",
  "tokenEndpoint": "https://github.com/login/oauth/access_token",
  "revocationEndpoint": "https://github.com/settings/connections/applications/GITHUB_CLIENT_ID"
}
```
