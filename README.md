# BC Labs Interview Project

This project demonstrates a simple application where a Node.js Express server interacts with a Python script running a language model using Docker. The project uses MongoDB to store conversation data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development and testing)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ByteSurgeonAmos/bc-labs-interview.git
   cd bc-labs-interview
   ```

2. **Set up environment variables:**

   Create a `.env` file in the `express-api` directory and configure your MongoDB connection string and any other environment variables as required. An example `.env` file might look like this:

   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/your_db_name?retryWrites=true&w=majority
   ```

## Running the Project

1. **Build and run the Docker containers:**

   ```sh
   docker-compose up --build
   ```

   This command will build and start the containers for both the Python and Node.js services.

## Project Structure

The project directory structure is organized as follows:

```
bc-labs-interview/
├── docker-compose.yml
├── python-llm/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│
├── express-api/
│   ├── Dockerfile
│   ├── index.ts
│   ├── controllers/
│   │   └── conversationController.ts
│   ├── routes/
│   │   └── conversationRoutes.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env
│
```

## Usage

After running the containers, the Node.js server will be available at `http://localhost:3000`. You can interact with the API endpoints using tools like Postman or cURL.

## API Endpoints

### POST /query

Sends a query to the Python program and stores the conversation in the database.

- **URL:** `/query`
- **Method:** `POST`
- **Body Parameters:**

  - `model` (string): The model name to use (`llama2` or `mistral`).
  - `question` (string): The user's question.

- **Response:**
  - `response` (string): The response from the model.
  - `id` (string): The ID of the stored conversation.

### GET /conversations

Fetches the list of all conversations stored in the database.

- **URL:** `/conversations`
- **Method:** `GET`

- **Response:**
  - `conversations` (array): List of conversations sorted by creation date.

### GET /conversations/:id

Fetches the details of a specific conversation by ID.

- **URL:** `/conversations/:id`
- **Method:** `GET`
- **URL Parameters:**

  - `id` (string): The ID of the conversation to fetch.

- **Response:**
  - `conversation` (object): The conversation details.

## Environment Variables

- `MONGODB_URI`: The MongoDB connection string. You should set this in the `.env` file in the `express-api` directory.

## Technologies Used

- **Node.js**: JavaScript runtime for the server-side code.
- **Express.js**: Web framework for Node.js.
- **Python**: Programming language for the language model script.
- **Transformers**: Hugging Face library for NLP models.
- **MongoDB**: NoSQL database for storing conversations.
- **Docker**: Containerization platform.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
