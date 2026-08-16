# LexiConnect Frontend

Frontend application for **LexiConnect**, an AI-powered legal assistance platform that enables users to interact with a legal AI assistant, manage conversations, and access legal support through a modern and responsive web interface.

Built with modern web technologies, the application provides a seamless user experience for legal research, AI-powered legal guidance, and conversation management.

## Features

* AI-powered legal chatbot interface
* Real-time streaming responses
* User authentication and authorization
* Persistent conversation history
* Create and manage multiple conversations
* Responsive and modern user interface
* Advocate search and browsing
* Secure API integration with the LexiConnect Backend
* Fast and intuitive user experience

## Architecture

```text
User
  │
  ▼
React Frontend
  │
  ▼
API Layer
  │
  ▼
LexiConnect Backend
  │
  ├── Authentication
  ├── Legal RAG System
  ├── Conversations
  └── Advocate Database
```

## Core Functionality

### Authentication

Users can:

* Create an account
* Log in securely
* Maintain authenticated sessions
* Access protected features

### Legal AI Assistant

The frontend provides a chat-based interface that allows users to:

* Ask legal questions
* Receive AI-generated responses
* View streamed responses in real time
* Continue previous conversations
* Access conversation history

### Conversation Management

* Create new conversations
* Switch between conversations
* View previous chat history
* Store and retrieve messages from the backend

### Advocate Search

Users can browse and search advocates based on:

* Name
* City
* Legal specialization

## Tech Stack

* React
* TypeScript
* Vite
* Axios
* React Router
* Context API
* CSS
* FastAPI Backend Integration

## Project Structure

```text
LexiConnect-Frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── styles/
│   └── assets/
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Muhammad-Ibrahim4034/LexiConnect-Frontend.git
cd LexiConnect-Frontend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

Update the value according to your backend deployment URL.

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend Repository

This frontend works together with the LexiConnect Backend:

**Backend:**
https://github.com/Muhammad-Ibrahim4034/LexiConnect-Backend

## Future Improvements

* Voice-based legal assistance
* Multilingual support
* Enhanced legal document search
* Source citation display
* Mobile application support
* Dark mode
* Real-time notifications
* Advanced conversation organization

## Author

**Muhammad Hamza Nawaz**<br>
**Rameela Hassan**<br>
**Muhammad Ibrahim**

---

LexiConnect aims to make legal information more accessible through artificial intelligence, modern web technologies, and an intuitive user experience.
