![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 2: Kids & Cie: Restaurant Review RESTful express app

***
For my second project, I was given 3 days to design and build a full Authenticated RESTful express app using the MVC model. I used HTML, CSS, JavaScript (Jquery library), Node.js, Express.js, MongoDB, Git for version control and Heroku for deployment.  
I decided to develop a platform "Kids & Cie" that allows parents to review and recommend kid-friendly restaurants.

## MVP
* User model and user authentication.
* Models for Restaurants and Reviews.
* Allow users to add, edit and delete restaurants and reviews.
* Users can only delete their own reviews or restaurants added.
* Styled with Bulma

## Extras
I decided to add the following features:
* Reviews moderation before display.
* Google Maps on restaurant Show page.
* Google Auto-complete for addresses and cities in the edit and new restaurant forms.
* Filestack functionalities to upload restaurant pictures and user profile pictures.
* Slick carrousel on the main page

### Technical features
* The app is using the MVC paradigm with 2 models, one for restaurants, the main ressource for my app and one for users. A review model is also embedded in the restaurant model in order for users to leave reviews. The user model is referenced in both the restaurant and review models to keep track of the creator of a restaurant and the author of a review.
* The app has complete RESTful routes for restaurants with all CRUD actions. It also allows to create and delete reviews (delete is for admin only) and finally, it allows users to register and update their profile.
* My app includes authentication with encrypted passwords (bcrypt) & an authorization flow with secure routes to perform create, delete and edit restaurant.
* The app is deployed on heroku and accessible to the public.

##### [Please visit website](https://express-app-restreviews.herokuapp.com/)

###### Homepage
* The homepage allows the user to go to the restaurant menu to see all resturants or to Register (Join) or login

<p align="center"><img src="https://i.imgur.com/H37EOn3.png" width="700"></p>

###### Homepage
* xxxx

<p align="center"><img src="" width="700"></p>

###### Homepage
* xxxx

###### Homepage
* xxxx

###### Homepage
* xxxx

<p align="center"><img src="" width="700"></p>


---
I was pleased with the final product, which I feel looks good and is user friendly.
I would have liked to add additional features ...

My main challenge was ...

---

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install`
- Launch the app with `node index`
