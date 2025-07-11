FROM nginx:alpine

# Remove o site padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do frontend para o diretório padrão do nginx
COPY . /usr/share/nginx/html

EXPOSE 80
