# Emailer

Node js service for sending emails by SMTP.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install emailer dependencies.

```bash
npm install
```

## Setup environment variables file

Add a nodemon.json file under the root directory.

```json
{
  "env": {
    "SMTP_SERVICE": "SMTP service name",
    "SMTP_PORT": "SMTP port",
    "EMAIL_ADDRESS": "Email Adrress, for example <username>@gmail.com",
    "EMAIL_PASSWORD": "Your Password",
    "WHITE_LIST_DOMAIN": "List of all domains that can send requests to email service (Separated with a comma)",
    "PORT": "8080"
  }
}
```

## Run local command

```bash
npm run dev
```

## You Tenst your environment

You can send an HTTP request to test your enviroment:

```json
{
  "url": "http://localhost:<port>/api/emailer/email",
  "method": "POST",
  "body": {
    "address": "<Recipient's email address>",
    "subject": "The subject of the mail",
    "message": "The contant of tha mail" 
  }
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)