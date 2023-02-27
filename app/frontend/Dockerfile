FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

# Usar a imagem node:16.14-alpine como base

# Mudar para o diretório de trabalho /app-frontend

# Copiar os package.json e package-lock.json para o container

# Instalar as dependências Node

# Copiar o restante dos arquivos da aplicação para o container

# Sinalize que aplicação expõe a porta 3000

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações