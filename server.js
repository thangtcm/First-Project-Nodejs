const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors'); // Import the cors package
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: 'Success'})
});

app.get('/webhook', (req, res) => {
  // Xác minh Webhook từ Facebook
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.accessToken) {
    console.log('Webhook verified');
    console.dir("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    console.error('Failed verification. Make sure the verify token matches.');
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    try
    {
      body.entry.forEach((entry) => {
        const webhook_event = entry.messaging[0];
        console.log(webhook_event);
  
        // Xử lý sự kiện từ Messenger
        // Thêm logic xử lý tin nhắn ở đây
      });
      res.status(200).send("EVENT_RECEIVED");
    }catch(err) {
      res.sendStatus(404);
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
