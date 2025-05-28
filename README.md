# Lead Generation System
This is a full-stack lead generation system that collects user input via a React frontend, stores or processes it through a Node.js/Express backend, and sends email notifications using an `n8n` workflow.

---
## Project structure
lead-gen-system/
├── backend/ # Express backend API
│ └── server.js
├── frontend/ # React frontend
│ └── App.js
└── n8n/ # n8n workflow configuration
### Prerequisites

- Node.js (v16+)
- n8n (Cloud or Self-hosted)
- A mail provider (e.g., Gmail, Mailgun, Outlook) for n8n email node
- CORS browser extension if needed (for local development)

---
## Backend setup(Node.js)
1. Go to the backend directory:
cd backend
2. Install dependencies:
npm install
3. Start the server
node server.js

The backend will run on: http://localhost:5000
## Frontend setup(React)
1. Go to the frontend directory:
cd frontend
2. Install dependencies:
npm install
3. Start the react app
npm start
The frontend runs at: http://localhost:3000

## n8n setup
1. Open your n8n instance.

2. Create a Webhook node:

 Method: POST

 URL: /webhook/leads

3. Add a Send Email node:

 Connect it after the Webhook.
 Use the following expression to populate the email content:
   Name: {{$json.body.name}}
   Email: {{$json.body.email}}
   Company: {{$json.body.company}}
   Message: {{$json.body.message}}
4. Set SMTP settings (for Gmail, Mailgun, etc.).
5. Save and activate the workflow.

## Example Email Output
New Lead Submission:

Name: Esty Dise
Email: esty@gamil.com
Company: kelly
Message: Hello, I'm interested in your services.
