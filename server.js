const express = require('express');
const app = express();

const { connection } = require('./connection-db');
const { factoresPrimos } = require('./primos');

class MiniServer {
    constructor(){
        this.port = 3000;
        this.dbconnection = connection;
        this.app = express();
        this.checkDB();
        this.middleware();
        this.routes();
    }

    checkDB(){
        if (connection.state === 'disconnected') {
        console.error('No se pudo conectar a la base de datos');
        } else {
        console.log('Conexión establecida con éxito a la base de datos');
        }
    }
    
    middleware() {
        this.app.use(express.json());
    }

    routes(){
        this.app.get('/factorPrimo/:num', (req, res) => {
            res.json({factores: factoresPrimos(req.params.num)});
        });
        this.app.get('/station/:id',  (req, res) => {
            this.dbconnection.query(`SELECT * FROM stations WHERE cre_id = "PL/${req.params.id}/EXP/ES/2015"`, function(err, rows) {
                if (err) {
                  console.error('Error al realizar la consulta: ' + err.stack);
                  res.json({result:null})
                  return;
                }
                console.log('Resultado de la consulta: ', rows);
                res.json({name: rows[0].name})
              });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
          console.log("Server running in port: " + this.port);
        });
    }
}

const server = new MiniServer();
server.listen();