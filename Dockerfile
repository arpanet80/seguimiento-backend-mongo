FROM node:alpine AS base

FROM base AS build

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM base AS production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .

CMD ["sh", "-c", "npm run start:prod"]


# docker build -t arpanet80/seguim-mongo .

# docker run -d -it -p 3001:3000 --env MONGODB='mongodb+srv://arpanet80:Dante2011@clusterdespliegue.jmodcqi.mongodb.net/despliegueted' --env PORT=3000 arpanet80/seguim-mongo
