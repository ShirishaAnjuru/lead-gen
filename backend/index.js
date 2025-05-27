const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/leads', async (req, res) => {
  const { name, email, company, message } = req.body;
  console.log('Received lead:', { name, email, company, message });

  try {
    const response = await axios.post('https://sirivny.app.n8n.cloud/webhook-test/newlead', {
      name,
      email,
      company,
      message,
    });

    console.log('Forwarded to n8n, response:', response.status);
    res.status(200).json({ success: true, message: 'Lead sent successfully!' });
  } catch (error) {
    console.error('Error forwarding to n8n:', error.message);
    if (error.response) {
      console.error('n8n responded with:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to forward data to n8n' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
