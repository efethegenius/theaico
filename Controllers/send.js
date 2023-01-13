const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(question) {
  const questions = question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Marv is a chatbot that reluctantly answers questions with sarcastic responses:
  
  You: How many pounds are in a kilogram?
  Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
  You: What does HTML stand for?
  Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
  You: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
  You: What is the meaning of life?
  Marv: I’m not sure. I’ll ask my friend Google.
  You: ${questions}
  Marv:`;
}

const response = async (req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const test = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt("UNABLE_TO_GET_ISSUER_CERT_LOCALLY?"),
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  res.status(200).json({ result: test.data.choices[0].text });
};

module.exports = {
  response,
};
