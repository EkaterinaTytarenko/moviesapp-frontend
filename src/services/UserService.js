import axios from 'axios'
import authHeader from './AuthHeader';
import AuthService from "./AuthService";

const REST_API_URL = 'http://localhost:8080';
const INDEX_ENDPOINT='/index';
const MOVIE_DETAILS_ENDPOINT='/movieDetails';
const USER_REQUEST_ENDPOINT='/userRequest';
const ADD_CATEGORY_ENDPOINT='/addCategory';
const ADD_MOVIE_ENDPOINT='/addMovie';
const CHANGE_RATING_ENDPOINT='/changeRating';
const DELETE_MOVIE_ENDPOINT='/deleteMovie';

class UserService {

    getAllMovies(){
        return axios.get(REST_API_URL+INDEX_ENDPOINT);
    }

    async getMovieDetails(movie_id) {
        return await axios.post(REST_API_URL+MOVIE_DETAILS_ENDPOINT, {movie_id});
    }


    async userRequest(request) {
        let userId=AuthService.getCurrentUser().userId;
        return await
            axios.post(REST_API_URL +USER_REQUEST_ENDPOINT,{userId,request},
            { headers: authHeader()});
    }

    async addCategory(category_name){
        return await
            axios.post(REST_API_URL +ADD_CATEGORY_ENDPOINT,{category_name},
                { headers: authHeader()});
    }


     async find_new_movies(title) {

         const options = {
             method: 'GET',
             url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
             params: {s: title, page: '1', r: 'json', type: 'movie'},
             headers: {
                 'x-rapidapi-key': '2e6aa3e47cmshef267f436cbf282p17b0f3jsne61e4febc47e',
                 'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
             }
         };

         return await axios.request(options);
     }

    async addMovie(imdb_ID){
        return await
            axios.post(REST_API_URL +ADD_MOVIE_ENDPOINT,{imdb_ID},
                { headers: authHeader()});
    }

    async deleteMovie(movie_id){
        return await
            axios.post(REST_API_URL +DELETE_MOVIE_ENDPOINT,{movie_id},
                { headers: authHeader()});
    }

    changeRating(user_id,category_id,movie_id,user_rating,total_rating){
            axios.post(REST_API_URL +CHANGE_RATING_ENDPOINT,{user_id, category_id,movie_id, user_rating, total_rating},
                { headers: authHeader()});
    }

}

export default new UserService();