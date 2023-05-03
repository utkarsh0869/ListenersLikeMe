import { authenticate, populateUI } from './spotify-login.js'

const storedProfile = localStorage.getItem('profile');
const profile = JSON.parse(storedProfile);
if(!localStorage.getItem('profile')){
	authenticate();
} else {
	populateUI(profile);
}


//change the css for friends page
