# OSINT-web-app-frontend

<img src="https://img.icons8.com/ultraviolet/80/000000/react--v1.png"
     height="50px"
/></span>
&nbsp;&nbsp;&nbsp;
<img src="https://img.icons8.com/color/48/000000/javascript--v1.png"
/>&nbsp;&nbsp;&nbsp;
<img src="https://img.icons8.com/fluency/48/000000/docker.png"/></span>
&nbsp;&nbsp;&nbsp;

### Introduction

This is a frontend app for osint web app.

## Usage

The app requires an .env file. You can copy content from .env.example.

### Requirements

NodeJS installed on your system (v20.14.0 or higher) -\*\* [NodeJS](https://nodejs.org)

### Usage (without Docker)

Install node_modules:

```
npm install
```

To execute app, run:

```
npm start
```

### Using Docker

### Using Docker

To build Docker container use the following command:

```

docker build -t osint-web-app-frontend .

```

To run Docker container use the following command:

```

docker run -p 3000:3000 osint-web-app-frontend

```
