FROM node:15.11.0-alpine3.10

WORKDIR /app

COPY . .

RUN npm install && cd client npm install

EXPOSE 3000

CMD [ "/bin/sh" , "/app/setup.sh" ]

