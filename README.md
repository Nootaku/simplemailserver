# Simple Mail Server

The **_Simple Mail Server_** has been made to easily add a contact functionality to a front-end project.
Feel free to use and modify it as you please.

## Installation and Development Environment

### Installation

We assume that you have **node.js** installed on your machine. If that is not the case, refer to [nodejs.org](https://nodejs.org/en/).

```bash
# clone the repository
git clone https://github.com/Nootaku/simplemailserver.git

# install node dependencies
npm install

# create a .env file
touch .env
```

Inside the `.env` file paste and adapt the following variables:<br>
<sub>Please refer to the [node.js documentation](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs/) for more info on how to use environment variables.</sub>

```
MAILSERVER_HOST=your.email.provider.host
MAILSERVER_USERNAME=john.doe@sending_email.com
MAILSERVER_PSW=password_for_john.doe@sending_email.com
MAILSERVER_DESTINATIONEMAIL=jane.doe@receiving_email.com
```

### Run the service locally

```bash
node -r dotenv/config index.js
```

### Making modifications to the server

The code of this repository has been built with a contact-form for professional purposes in mind. It is expected that the frontend form will send the following fields:

- name
- email
- company
- message

The capcha (anti-spam) is also handled on the frontend.

If you want to change the form structure, don't forget to adapt the `checkRequest()` function accordingly.

You can also change the content and style of the email by adapting the `composeMail()` function.

## Production Build

### Docker Image

We added a `Dockerfile` to the project. You can create your own image with the following command.<br>
<sub>Don't forget to change the tags according to your preferences</sub>

```
docker build -t simplemailserver:latest .
```

### Running the Image

```
docker run -p 3002:3002 --env-file .env simplemailserver:latest
```
