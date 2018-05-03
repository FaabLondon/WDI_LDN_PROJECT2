![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 2: Kids & Cie: Restaurant Review RESTful express app

***
For my second project, I was given 5 days to design and build a full Authenticated RESTful express app using the MVC model. I used HTML, CSS, JavaScript (Jquery library), Node.js, Express.js, MongoDB, Git for version control and Heroku for deployment.  
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
* My app includes authentication with encrypted passwords (bcrypt) & an authorisation flow with secure routes to perform create, delete and edit restaurant.
* The app is deployed on Heroku and accessible to the public.

##### [Please visit the website](https://kids-and-cie.herokuapp.com/)

###### Homepage
* The homepage allows the user to go to the restaurant menu to see all restaurants or to Register (Join) or login

<p align="center"><img src="https://i.imgur.com/GwiDK3w.png" width="700"></p>

###### Index page and filtering
* The index page allows the user to see all restaurants listing with an overview for each restaurant including the name, location and average review. The user can filter the content on several criteria without having to submit a form.

<p align="center"><img src="https://i.imgur.com/Br5jjEF.png" width="700"></p>

###### Show page
* The show page displays more information about each restaurant including the address, phone, website, brief description as well as its location on a google map.
It allows the user to leave a review and to read all posted reviews for that specific restaurant.
Once the user submit a review, a flash message informs him that the review will be moderated.
The user can also edit and delete the restaurant (if he/she was the creator of it);

<p align="center"><img src="https://i.imgur.com/aLKPrvG.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/Rnlo1dn.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/ASnIZ2j.png" width="700"></p>


###### Create restaurant
* On this page, users can create their own restaurant and can use filestack to upload a restaurant picture. On form submission, any missing field or incorrectly entered field is flagged.

<p align="center"><img src="https://i.imgur.com/PoVN1Z2.png" width="700"></p>

###### Edit restaurant
* The form is similar to the one above and enables user to edit a specific restaurant's information.

<p align="center"><img src="https://i.imgur.com/WbuUx5s.png" width="700"></p>

###### Moderate reviews (Admin only)
* This page is only accessible to the admin user and enables him/her to review all newly added comments and validate them or reject them. Once validated, the comment is displayed on the restaurant's page.

<p align="center"><img src="https://i.imgur.com/mFqQKH2.png" width="700"></p>

###### Edit user profile
* This page allows users to edit their profile. There are 2 small issues still to be fixed. Filestack is not working on this page and on entering 2 similar password different from its current password, the user can actually change his password...These 2 bugs will be corrected in due time.

<p align="center"><img src="https://i.imgur.com/XKMwVf4.png" width="700"></p>


---

## Wins
I was pleased with the final product, which I feel looks good and is user friendly. I managed to implement all the extra features (google APIs, review moderation, filestack, slick carrousel, etc...) within the timeframe and with no assistance from the instructor which is great. It is all about reading the docs!

## Challenges
The main challenge was get acquainted with some public APIs like google maps, autocomplete or Filestack for example.
There is still a bug on the user profile when uploading a profile picture and when submitting the user profile. If the user enters a password different from the one stored in the DB, that password will be changed.
Also the admin user should be able to edit and delete any restaurant, not just the one he/she created. This will all be corrected in due time.

## Future features
I would like to add additional features such as favourites on the user profile, or the possibility for user's to reply to comments left by other users. This will be added in the future.

---

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install` or `npm install`
- Start the local MongoDB server in Node.js with `mongod`
- Launch the app with `node index`
