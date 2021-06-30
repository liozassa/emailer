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
    "PORT": "8080"
  }
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)