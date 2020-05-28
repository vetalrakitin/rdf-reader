const Arena = require('bull-arena');

const Qconfig = require('./config');
 
const express = require('express');
const app = express();

const arenaOptions = {
  // Make the arena dashboard become available at {my-site.com}/arena.
  basePath: process.env.BASE_URL,
 
  // Let express handle the listening.
  disableListen: true
};
 
const arena = Arena(Qconfig,arenaOptions);

app.use('/', arena);

app.listen(process.env.PORT, (error) => {
    console.error(error);
});