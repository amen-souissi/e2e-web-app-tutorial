FROM node:10.16.0
LABEL maintainer="Amen SOUISSI <amen.souissi@decathlon.com>"

COPY . /root/project

WORKDIR /root/project/front
RUN npm install
RUN npm run build

COPY start.bash /start
RUN chmod +x /start
CMD ["/start"]
