FROM node:12.20.0-slim
LABEL maintainer="dev@bpaulino.com"

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN cd /app/frontend \
    && yarn install \
    && yarn build \
    && cd /app/backend \
    && npm ci

CMD ["/app/entrypoint.sh"]