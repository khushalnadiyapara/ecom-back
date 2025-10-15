FROM node:22-alpine

EXPOSE 3007

ENV NAME PGMS

RUN mkdir /${NAME}

WORKDIR /${NAME}

ADD . /${NAME}

RUN npm install

CMD ["node", "--trace-warnings", "--async-stack-traces", "./src/index.js"]
