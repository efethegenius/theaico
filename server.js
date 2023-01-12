const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const qrcode = require('qrcode-terminal');
// const client = new Client();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const send = require("./Routes/send.routes");
app.use("/send", send);
let port = process.env.PORT || 5001;


// client.initialize();

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });

// client.on('message', (message) => {
//     if (message.body === 'hello') {
//       message.reply('Hiiiii');
//     }
//   });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
