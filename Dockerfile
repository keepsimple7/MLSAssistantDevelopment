FROM node:20.5.0-buster
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_APP_URL=https://mlsassistant.app

RUN npm install
RUN npm run build
EXPOSE 4000
CMD ["npm", "run","start"]