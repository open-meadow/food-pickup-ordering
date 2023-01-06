LHL Node Skeleton
=========

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)

## Final Product

stuff goes here
!["Tablet & Desktop View"](picture)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio
- Express
- Nodemon
- Sass

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - TWILIO_ACCOUNT_SID = "Twilio account SID code"
  - TWILIO_AUTH_TOKEN = "Twilio authentication token code"
  - MY_PHONE_NUMBER = "+1[10 digit phone number no spaces]" 

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Twilio details will not function without several additional steps to register for your own Twilio (trial) account and set up SMS messaging for all numbers from: https://www.twilio.com/