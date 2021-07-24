# url-shorterner-node-server

This project was done as part of my GovTech TAP application

# Pre-requisites

- Node.js (version 12.x, LTS)
- PostgreSQL (version 12.x)

## Deploying our app

### We have deployed our app on a free dynos on Heroku over at https://mighty-mountain-99792.herokuapp.com/

Alternatively,

1. Clone this repo into your local machine and run `npm install` in the root directory of your clone to install all dependencies.
2. Create a new PostgreSQL database.
3. Create a .env file in the root directory and update it with the credentials of your newly created database.

- Sample .env file\
  `DB_USER=postgres`\
  `DB_PASSWORD=password`\
  `DB_HOST=localhost`\
  `DB_PORT=5432`\
  `DB_DATABASE=databasename`

4. Run init.sql in the root directory to seed your new database.
5. Run `npm start` in the root of the app to start the Express server.
