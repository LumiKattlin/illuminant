FROM node:20-alpine AS builder
WORKDIR /app
COPY . /app
COPY ./prisma/blog.db /app/prisma/blog.db
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG ORIGIN
ENV ORIGIN=${ORIGIN}

RUN npm ci
RUN npx prisma migrate dev --name init
RUN npx prisma db push
RUN npm run build

# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/build build/
# COPY --from=builder /app/node_modules node_modules/
# COPY --from=builder /app/src/lib/server/prisma/ src/lib/server/prisma
# COPY package.json .
EXPOSE 3000
# ENV NODE_ENV=production
CMD [ "node", "build" ]