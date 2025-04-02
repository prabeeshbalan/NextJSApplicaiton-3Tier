FROM node:22.11.0

WORKDIR /app

COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./

RUN npm install

ENV NEXT_PUBLIC_API_URL=http://backend:3001

COPY app/ ./app/
COPY public/ ./public/
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY next-env.d.ts ./

RUN npm run build

EXPOSE 3000

#CMD ["npm", "start"]

CMD ["sh", "-c", "PATH=$PATH:/app/node_modules/.bin; if [ -f .next/BUILD_ID ]; then next start; else npm run build && next start; fi"]