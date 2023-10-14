FROM node:18.17.1-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# --

FROM base AS build
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build

# --

FROM base

RUN npm i --quiet --no-progress -g pm2

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

CMD [ "pnpm", "start" ]
