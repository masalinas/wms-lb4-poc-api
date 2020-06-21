# Description
A simple Warehouse PoC with LoopBack 4 Backend
[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# Some loopback project commands
Clean loopback project
npm run clean

Build loopback project
npm run build

# Some docker commands
Create a mongodb docker instance and expose defaul port 27017
docker run --name mongo -p 127.0.0.1:27017:27017 -d mongo:latest

Check all docker instances
docker ps -all

Remove a docker instance
docker container rm <CONTAINER_ID>

Stop a docker instance
docker container stop <CONTAINER_ID>

Start a docker instance
docker container start <CONTAINER_ID>

# Some swagger explorer queries
Get all pallet with stock products collection and pallet pallet type relation
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

# generate angular 2 services from Open API swagger.json file
java -jar swagger-codegen-cli-3.0.20.jar generate -i swagger.json -l typescript-angular
