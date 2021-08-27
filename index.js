const chalk = require("chalk");
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
        _.each(response.data.results, function (value, i) {
          console.log(value.name);
        });

        _.each(response.data.results, function (value, i) {
          const { first: nombre, last: apellido } = value.name;
          const id = uuidv4().slice(0, 6);
          const tiempo = moment().format("MMMM Do YYYY, h:mm:ss a");
          const datoUsuario = `${i + 1}.- Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${tiempo}\n`;
          //console.log(chalk.bgWhite.blue.bold(datoUsuario));
          res.write(datoUsuario);
          fs.appendFile("./registro.txt", datoUsuario, { encoding: "utf8", flag: "a" }, (error) => {
            if (error) throw error;
          });
        });

        res.end();
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .listen(8080, () => console.log("Escuchando el puerto 8080"));
