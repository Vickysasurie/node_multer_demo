const http =  require('http');
const app = require('./index');
//var db = require('./database');
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: "+port);