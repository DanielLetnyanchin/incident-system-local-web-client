FROM nginx:alpine
LABEL author="Daniil Letnianchyn"
COPY ./dist /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["ngix","-g","daemon off;"]
