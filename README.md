# Description
A simple Warehouse PoC with LoopBack 4 Backend securired with JWT
[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# Some loopback project commands
## Clean loopback project
```
npm run clean
```

Build loopback project
```
npm run build
```

# Some docker commands
Create a latest mongodb version docker instance and expose defaul port 27017
```
docker run --name mongo -p 127.0.0.1:27017:27017 -d mongo:latest
```

Check all docker instances
```
docker ps -all
```

Remove a docker container instance
```
docker container rm <CONTAINER_ID>
```

Stop a docker container instance
```
docker container stop <CONTAINER_ID>
```

Start a docker container instance
```
docker container start <CONTAINER_ID>
```

# openapi-generator-cli
install openapi-generator-cli
```
npm install @openapitools/openapi-generator-cli -g
```

generate angular 2 services from openapi-generator-cli
```
openapi-generator generate -i swagger.json -g typescript-angular
```

# install openapi-to-graphql
```
npm install openapi-to-graphql -g
npm install openapi-to-graphql-cli --save
```

# start graphQL server
```
openapi-to-graphql --port=3001 http://localhost:3000/openapi.json
npx openapi-to-graphql --port=3001 http://localhost:3000/openapi.json
```

# Some swagger explorer queries
Get all pallet with stock products collection and pallet pallet type relation
```
{
  "include": [
    {
      "relation": "palletType"
    },
    {
      "relation": "stocks",
      "scope":
        {
          "include": [
             {
               "relation": "product"
             }
          ]
        }
    }
  ]
}
```
