Food Pick-up and Ordering
=========

## Summary
"2 Sam's and a Rohan" is a website that allows users to place orders from a menu, and it allows the restaurant to respond to said orders. The website allows users to add menu items to a cart and place the order. When placing the order, a user must input their phone number. Placing the order will send the restaurant an SMS message notifying them that the order has been placed. Once the order is complete, the user would recieve a message on their phone.

On the restaurant end, there is a portal that allows owners to view incoming orders. For new orders, it allows the owner to insert the time in minutes, indicating how long it would take for an order to finish. A 'pending' order will include a timer showing how long an order will take to finish. Once the order is finished, the user recieves a completion message. 

## Final Product
Screenshot of Client Page
!["Screenshot of Client Page"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_%20(1).png)

Screenshot of Order Pane in Mobile View
!["Screenshot of Client Page"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_%20(2).png)

Screenshot of Menu Pane in Mobile View
!["Screenshot of Menu Pane in Mobile View"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_%20(3).png)

Screenshot of Confirm Prompt
!["Screenshot of Confirm Prompt"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_%20(5).png)

Screenshot of Restaurant Orders
!["Screenshot of Restaurant Orders"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_restaurant%20(3).png)

Screenshot of Restaurant Pending Orders
!["Screenshot of Restaurant Pending Orders"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_restaurant%20(4).png)

Screenshot of Restaurant Order before Completion
!["Screenshot of Restaurant Order before Completion"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_restaurant%20(6).png)

Screenshot of Finished Orders
!["Screenshot of Finished Orders"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_restaurant%20(7).png)


## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


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
