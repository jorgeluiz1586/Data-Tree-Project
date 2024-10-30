# Projeto de árvore de dados

Esse projeto cria um árvore de dados que pode ser feito o download em arquivo json e salvo na API que está no repositório https://github.com/jorgeluiz1586/Data-Tree-API-Project.

Esse repositório trata-se do front-end da aplicação feito em React, Typescript, Tailwind e foi usado o Bun.js como runtime, esse repositório há um arquivo docker-compose que pode ser usado porém é necessário subi primeiro o container da api, caso use o Bun.js ou Node.js mude no arquivo .env a váriável VITE_API_URL para http://localhost:5000

# Passo para rodar o projeto usando Docker (uma vez que tenha feito up no container da API)
- entre na raíz do projeto
- docker-compose up -d --build ou docker compose up -d --build
- sua aplicação vai funcionar na porta 3001 em localhost

# Passo para rodar o projeto usando Bun.js
- rode antes o back-end
- mude a variável VITE_API_URL no .env para http://localhost:5000
- Na raíz do projeto rode o comando "bun install"
- rode o comando "bun vite --port 3001"

# Passo para rodar o projeto usando Node.js
- rode antes o back-end
- mude a variável VITE_API_URL no .env para http://localhost:5000
- Na raíz do projeto rode o comando "npm install"
- rode o comando "npx vite --port 3001"


![Captura de tela de 2024-10-30 11-59-03](https://github.com/user-attachments/assets/10f1d40d-b9c7-4b47-9eed-97b8b304377c)

![Captura de tela de 2024-10-30 11-58-28](https://github.com/user-attachments/assets/c4ee3242-8fc3-4c42-8b50-24e49812fcb0)

Esse projeto é open source

Ao avaliador técnico esse projeto foi feito corrido porém encontra-se testado e funcionando, o repositório não ficou padrão com vários commit e branches apenas foi feito um único commit porque foi desenvolvido primeiro e o repositório criado posteriormente.
