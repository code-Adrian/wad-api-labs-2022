# Assignment 2 - Web API.

Name: Adrian Bernacki

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

+ 5 API endpoints (Discover Movies, Upcoming Movies, Popular Movies and TV) (Paginated)
+ Tv detail page API endpoint ( Paramaterised)
+ Tv Credits API endpoint (Seed Data & Parametirzed)
+ Write review and Display Review (Based on the account) (Mongo Database Persisted)
+ Add and remove Favourite movies (Based on the account) (Mongo Database Persisted)
+ Private Routes / Protected Routes
+ Login, Signout and Registration with Mongo Integration


## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

Movies-API config
______________________
NODE_ENV = production
PORT = 8080
HOST = localhost
MONGO_DB =
SEED_DB = True
SECRET = YOUR SECRET
REACT_APP_TMDB_KEY =
______________________

react-assignment2 config
______________________
REACT_APP_TMDB_KEY =
FAST_REFRESH = False
REACT_APP_CONTENT = True
______________________

## API Design

+ POST /api/movies/:id/reviews - Posts a review for a movie from an authenticated user / author. (Requires Authentication)
+ GET /api/movies/:id/reviews - Retrieves reviews for a specific movie. (Requires Authentication)
+ POST /api/movies/:user/favourites - Creates or updates favourite movies for a specific user. (Requires Authentication)
+ GET /api/movies/:user/favourites - Retrieves favourite movies for a specific user. (Requires Authentication)
+ GET /api/movies/tmdb/upcoming/:page - Retrieves a paginated json response of upcoming movies. (Requires Authentication)
+ GET /api/movies/tmdb/discover/:page - Retrieves a paginated json response of discover movies. (Requires Authentication)
+ GET /api/movies/tmdb/popular/:page - Retrieves a paginated json response of popular movies. (Requires Authentication)
+ GET /api/movies/tmdb/now_playing/:page - Retrieves a paginated json response of now playing movies. (Requires Authentication)
+ GET /api/users/ - Retrieves saved users from the database. (Requires Authentication)
+ POST /api/users/ (Auth or Register) - Authenticates or creates a user. (Doesn't Require Authentication) 
+ GET /api/tv/tmdb/tvShows/:page - Retrieves a paginated json response of tv shows. (Requires Authentication)
+ GET /api/tv/tmdb/tvShow/:id - Retrieves a tv show. (Requires Authentication)
+ GET /api/tv/tmdb/tvShow/credits/:id - retrieves tv show credits for a specific tv show. (Requires Authentication)


## Security and Authentication

+ Home | Favourite | Upcoming | Popular | Now Playing | TV | views are protected and cannot be accessed without authentication. Only Sign in and Sign up are available without authentication.

+ Once authenticated - login & sign up views cannot be accessed until the user signs out.

+ A BEARER token is generated once a user registers or signs into the web app. If the BEARER token is not set into the context (It always is set after sign in our registration), the API calls will reject the request and respond with 'UnAuthorized'. No data will be returned and therefore no movies will be populated in the display screens. 


## Integrating with React App

+ Login view uses proxy 8080 to interact with Web API to trigger authentication and sign into the web app front page.

+ Login view uses proxy 8080 to interact with Web API to trigger registration and authentication to sign into the web app front page.

+ Home view (Discover movies) uses proxy 8080 to interact with the Web API to receive paginated JSON responses depending on the page selected by the user.

+ Upcoming view (Upcoming movies) uses proxy 8080 to interact with the Web API to receive paginated JSON responses depending on the page selected by the user.

+ Popular view (Popular movies) uses proxy 8080 to interact with the Web API to receive paginated JSON responses depending on the page selected by the user.

+ Now Playing view (Now Playing movies) uses proxy 8080 to interact with the Web API to receive paginated JSON responses depending on the page selected by the user.

+ Favourite (Favourite movies) uses proxy 8080 to interact with the Web API to receive or update movie favourites. Above views also perform action in the front pages to add or remove favourite movies by toggling the heart icon on a movie card. Everything is stored and persisted from the mongo database.

+ TV view (Tv Shows) uses proxy 8080 to interact with the Web API to receive paginated JSON responses depending on the page selected by the user.

+ TV show view (Tv show) uses proxy 8080 to interact with the Web API to receive a JSON response that display information about a tv show.

+ TV show credits view (Tv show credits) uses proxy 8080 to interact with the Web API to receive a JSON response that displays credits about a tv show. This view is a mixture between seed data and TMDB. For example: movie "Wednesday" is stored in seed data (Local database) if this tv show is selected to display credits the API will choose to retrieve this from local database rather than from TMDB. If any other movie is selected, the API will retrieve data from TMDB.

+ Adding a review for a movie now uses the Web API to store the review for that specific movie in the mongo database.

+ Displaying reviews for movies no longer display reviews from TMDB, they are retrieved from the mongo database if the user or any other user has wrote a review on that movie.
