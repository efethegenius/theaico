const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const qrcode = require("qrcode-terminal");
const { Configuration, OpenAIApi } = require("openai");
const { Client } = require("whatsapp-web.js");
const client = new Client();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const send = require("./Routes/send.routes");
app.use("/send", send);
let port = process.env.PORT || 5001;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

function generatePrompt(question) {
  const questions = question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Efe 2.0 is a chatbot created by Efe Samuel, it reluctantly answers questions with sarcastic responses:
  
  You: How many pounds are in a kilogram?
  Efe 2.0: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
  You: What does HTML stand for?
  Efe 2.0: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
  You: When did the first airplane fly?
  Efe 2.0: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
  You: What is the meaning of life?
  Efe 2.0: I’m not sure. I’ll ask my friend Google.
  You: ${questions}
  Efe 2.0:`;
}

client.on("message", async (message) => {
  if (message.body) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const test = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(message.body),
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    console.log(test);

    message.reply(test && test.data.choices[0].text);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
