# mazrealty.live

1. [Introduction](#introduction)
2. [Core Features](#core-features)
3. [Installation](#installation)
4. [Technologies](#technologies)

## Introduction

This is the source code for the website of Maz Realty, a real estate based in Egypt. The application based on client/server architecture, where the client is a web browser and mobile devices, and the server is a Node.js server. The server is responsible for serving the client with the website's content and handling the requests from the client. <https://mazrealty.live>

live demo: <https://mazrealty-live.onrender.com/>

## Core Features

- User can register and login.
- User can view the properties.
- User can search for properties with advanced search options.
- User can contact the property owner via WhatsApp, email and phone.
- User can view the property location on Google Maps.
- User can view the property images in a gallery.
- User can view the property details.
- User can chat with the property owner via **MAZ Realty** chat.
- User can book for lawyer services to check the property documents.
- User can upload his property to sell or rent.
- User receives a welcome  email when registering.
- User receives email when booking for lawyer services.
- User receives email for lawyer services feedback about the property documents.

## Installation

```bash
# Clone the repository
git clone https://github.com/Adosh74/mazrealty.live

# Change the directory
cd mazrealty.live

# Install the dependencies
npm install

# Install the client and server dependencies
npm run build

# Create .env file in the root directory like .env.example file

# Start the whole application
npm run start

# Now the application is running on http://localhost:<the port in the .env file> 
```

## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Validator
- Redis (for caching)
- JWT (for authentication)
- multer (for file uploading)
- sharp (for image processing)
- nodemailer (for sending emails)
- Pino (for logging)
- React.js
- Vite
- Axios
- SCSS
- Flutter
- Dart
- WhatsApp API
