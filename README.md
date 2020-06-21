# wms-poc-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# recompile
npm run clean
npm run build

# mongodb docker container
docker run --name mongo -p 127.0.0.1:27017:27017 -d mongo

docker ps -all
docker container rm <CONTAINER_ID>
docker container stop <CONTAINER_ID>
docker container start <CONTAINER_ID>
