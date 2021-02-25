FROM node:12.20.1-alpine as build
LABEL maintainer="dev@bpaulino.com"

RUN mkdir -p /app
WORKDIR /app
COPY . /app

# Install all dependencies
# generate production build and remove src files
# Running a single command generates a single docker image layer
# ending up on a smaller docker image
RUN cd /app/frontend \
    && yarn install \
    && yarn build \
    && mkdir -p /app/build \
    && cp -R /app/frontend/build/. /app/build \
    && rm -rf /app/frontend \
    && mkdir -p /app/frontend/build \
    && cp -R /app/build/. /app/frontend/build \
    && rm -rf /app/build \
    && cd /app/backend \
    && npm ci \
    && npm prune --production

# Using the build pattern to skip any temp files
# stored on the build image
FROM node:12.20.1-alpine

WORKDIR /app
COPY --from=build /app /app

CMD ["/app/entrypoint.sh"]