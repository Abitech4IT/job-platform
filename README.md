# Job Platform Application

A scalable web api built with the NestJS framework.

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Environment Variables](#environment-variables)

## Description

This NestJS application provides and allow the user to post to source for the available posted job. It uses TypeScript, follows modular architecture principles, and includes features like dependency injection, decorators, and middleware support.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 16.x or higher)
- npm or yarn package manager
- [Database name] (if applicable)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Abitech4IT/job-platform.git
cd <your-project-name>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy the environment variables file:

```bash
cp .env.example .env
```

4. Configure your environment variables (see [Environment Variables](#environment-variables) section)

## Running the Application

### Development Mode

```bash
# Run in development mode with hot reload
npm run start:dev
# or
yarn start:dev
```

### Production Mode

```bash
# Build the application
npm run build
# or
yarn build

# Start in production mode
npm run start:prod
# or
yarn start:prod
```

### Debug Mode

```bash
npm run start:debug
# or
yarn start:debug
```

The application will be available at `http://localhost:3000` by default.

## API Documentation

The API documentation is available through Swagger UI when the application is running:

- **Local**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

### Main Endpoints

- `POST /auth/signin` - User authentication
- `POST /auth/signup` - User registration
- `POST /auth/create-admin` -Admin User registration (protected)
- `POST /auth/me` - User profile (protected)
- `PUT /job/:id` - Update job (protected)
- `DELETE /job/:id` - Update job (protected)
- `GET /job` - Get all job
- `GET /job/:id` - Get job by ID

## Database

This application uses [job-platform-db] as the primary database.

### Database Setup

1. Install and start your database server
2. Create a new database for the application
3. Update the database connection settings in your `.env` file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000
APP_NAME=Your App Name

# Database
DATABASE_DIALECT = database dialect e.g mysql, postgresql
DATABASE_HOST = database host
DATABASE_PORT = port
DATABASE_USERNAME = database username
DATABASE_PASSWORD =database password
DATABASE_NAME = database name

# JWT
JWT_SECRET = jwt_secret
REFRESH_JWT_SECRET = refresh_token_secret
```
