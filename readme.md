# README

## Run the project

Before start the project goto `docker-compose.yml` file and change your rdf's files location on line 27

`docker-compose up -d`

## Mongodb

All data will be saved to mongodb.

To look the collection open the link at your browser `http://localhost:8081/db/epub/rdfs`

You can see created indexes at the bottom of the page.

## Arena

There is a queue used at the project. You can look to a statistic page to let knoq how the process is going

Open the link at your browser `http://localhost:8082/Jobs/RDF`

## P.S.

The project is a simple example how to do the task. There are ways to improve it and make more stable and maintainable