ARG NODE_VERSION=18.13.0
ARG ALPINE_VERSION=3.17
ARG NGINX_VERSION=1.22.1


## Development image
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS development

WORKDIR /usr/src/app

ENV PROMPT="%B%F{cyan}%n%f@%m:%F{yellow}%~%f %F{%(?.green.red[%?] )}>%f %b"
ENV PATH="${PATH}:/app/node_modules/.bin"

ARG USER_ID=1000

RUN apk add \
        zsh

RUN if [ $USER_ID -ne 1000 ]; then \
        apk add --no-cache -t tmp shadow \
     && groupmod -g $USER_ID node \
     && usermod -u $USER_ID -g $USER_ID node \
     && apk del --purge tmp; \
    fi

USER node


## Builder image
FROM development AS builder

ENV NODE_ENV production
ENV SASS_PATH=node_modules:src

COPY . .

RUN npm ci \
 && npm run build


## Runtime image
FROM nginx:${NGINX_VERSION}-alpine AS runtime

WORKDIR /usr/share/nginx/html

COPY deployments/containers/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deployments/containers/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build .
