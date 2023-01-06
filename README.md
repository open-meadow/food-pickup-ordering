Food Pick-up and Ordering
=========

"2 Sam's and a Rohan" is a website that allows users to place orders from a menu, and it allows the restaurant to respond to said orders. The website allows users to add menu items to a cart and place the order. When placing the order, a user must input their phone number. Placing the order will send the restaurant an SMS message notifying them that the order has been placed. 

On the restaurant end, there is a portal that allows owners to view incoming orders. For new orders, it allows the owner to insert the time in minutes, indicating how long it would take for an order to finish. When the order is complete, the user would recieve a message on their phone. A 'pending' order will include a timer showing how long an order will take to finish. Once the order is finished, the user recieves a completion message. 
***
This app requires a Twilio account to function and send SMS. If you do not have a Twilio account, please find a non-Twilio version here (https://github.com/lighthouse-labs/food-pickup-ordering-without-twilio).
***
This is a midterm project created during my studies at Lighthouse Labs. It is a collaborative effort from the following users.
 - [@open-meadow](https://github.com/open-meadow)
 - [@anironL](https://github.com/anironL)
 - [@SamGiorgievski](https://github.com/SamGiorgievski) 

## Final Product
Screenshot of Client Page
!["Screenshot of Client Page"](https://github.com/open-meadow/food-pickup-ordering/blob/70006b0aabb33e4856bc05c40aef3c6bd41b8041/docs/localhost_8080_%20(1).png)

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


## Getting Started
- You need to have Node JS installed on your computer. You can download it at (https://nodejs.org/en/).
- Once you have Node JS, go to your desired folder, open the terminal or command prompt, and type <code>git@github.com:open-meadow/food-pickup-ordering.git</code>, if you have git. Alternatively, you can download the ZIP file and extract it to your desired folder.
- Once done, navigate to the folder containing the downloaded code, and open your terminal or command prompt in the same folder ( Windows users, click on the empty space on the box beside the search bar and type 'cmd'). Type `npm install` Windows users may need to run cmd as administrator.
- Open the '.env.example' file. Add the following lines
  - TWILIO_ACCOUNT_SID = <"Twilio account SID code">
  - TWILIO_AUTH_TOKEN = <"Twilio authentication token code">
  - MY_PHONE_NUMBER = <"+1[10 digit phone number no spaces]"> 
- Replace the contents of <> with the details from Twilio. If you do not have a Twilio account, please go here (https://github.com/lighthouse-labs/food-pickup-ordering-without-twilio).
- Rename the '.env.example' file to '.env'
- Once installed, type `npm run local` and click `Enter`.
- Go to your favourite web browser, and type `localhost:8080` in the address bar. Hit `Enter`. You should be able to access the client website.
- To access the restaurant website, go to `localhost:8080/restaurant`.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio
- Express
- Nodemon
- Sass
- EJS
- Dotenv
- Morgan
- Chalk

## Known bugs

- Without Twilio, this app will not function. You will need to have a Twilio account, and update your details in the `.env`. For a Twilio-free version, click here (https://github.com/lighthouse-labs/food-pickup-ordering-without-twilio).
- Currently, Twilio can only send messages to two phone numbers. (We required a paid subscription to add more numbers, and we ~~weren't willing to pay~~ didn't have money). [^1] 
- There may be an issue where the timer in `localhost:8080/restaurant` does not work, and immediately shows "Time Up". This has only affected <i>my</i> computer <i>sometimes</i>, and I have not been able to reliably reproduce it.
- The timer in `localhost:8080/restaurant` may show `NaN:NaN:NaN` upon first loading. This usually goes away after a refresh or after inserting a value and submitting.
<br></br>
[^1]: On the bright side, if you know who we are, and you are willing to put in the effort of authenticating Twilio, you can potentially pull a life-destroying prank.
