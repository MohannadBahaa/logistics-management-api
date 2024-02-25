# Task Instructions

## 1. Copy Environment Variables Template:

Copy the `.env.example` file to a new file named `.env`.

```bash
cp .env.example .env
```

## 2. Running the Application

Step 1: Setting up Kafka Server Locally
Make sure Docker and Docker Compose are installed.

Running Kafka Server:
Navigate to the /docker folder and run the following command:

```bash
docker-compose -f kafka.yml up
```

### Running Kafka Drop UI (Optional):

To monitor Kafka locally using Kafka Drop UI, navigate to the docker folder and run:

```bash
docker-compose -f kafka-drop-ui.yml up
```

### After successfully running Kafka Server and Kafka Drop UI, access the Kafka Drop monitoring UI at http://localhost:9000.

### 3.Run Development Server:

To start the development server, run the following command:

```bash
npm run start:dev

```
