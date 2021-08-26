// const chalk = require("chalk");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const _ = require("lodash");
const axios = require("axios");
const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        const { first, last } = response.data.results[0].name;
        const id = uuidv4().slice(0, 6);
        const tiempo = moment().format("MMMM Do YYYY, h:mm:ss a");
        res.write(`Nombre: ${first} - Apellido: ${last} - ID: ${id} - Timestamp: ${tiempo}`);
        console.log(moment().format());
        res.end();
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .listen(8080, () => console.log("Escuchando el puerto 8080"));
