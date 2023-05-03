import { authenticate } from './spotify-login.js'; // used for signout button

/*
Retrieveing the user's profile picture url from the local storage,
creating an image element, assigning the image src attribute the 
url, and inserting the image element in the div. 
*/
var userSettingsHeader = document.getElementById("userSettingsHeader");

const storedProfile = localStorage.getItem('profile');
const profile = JSON.parse(storedProfile);
var img = new Image();
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {

        let userData = JSON.parse(this.responseText);
        if (profile.images[0]) {
					img.src = userData.userProfileImageURL; 
			}
    }
};
xhr.open("GET", "../php/GetProfileFromServer.php?userId=" + profile.id);
xhr.send();

img.classList.add('circular-image'); 
userSettingsHeader.insertBefore(img, userSettingsHeader.children[0]);

/*
Clicking the "blocked user" button will add an li element to the contentHeader div.
It will change the color of the li element based on the web page's background color. 
*/
var contentHeader = document.getElementById("content-header");
const blockedUsersBtn = document.getElementById("blockedUsersBtn");
blockedUsersBtn.addEventListener('click', () => {
	var li = document.createElement('li');	
	
	li.textContent = "Added a blocked user. - No Spotify API endpoint to retrieve blocked users.";

	var bgColor = window.getComputedStyle(contentHeader).backgroundColor;

	if(getContrastColor(bgColor) == "white") {
		li.style.color = "black";
	} else {
		li.style.color = "white";
	}
	contentHeader.appendChild(li);
});

/*
Clicking the "theme" button will clear the contentHeader div elements and will change 
the theme from dark to light and vice versa.
*/
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener('click', () => {
	contentHeader.innerHTML = "";

	document.body.classList.toggle('dark-mode');
	
});

/*
Clicking the "sign out" button will redirect the user to the authorization page from where another user
can login.
*/
var signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", () => {
	
  var xhr2 = new XMLHttpRequest();
  xhr2.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          console.log("Table cleared successfully");
      }
  };
  xhr2.open('POST', '../php/ClearTable.php');
  xhr2.send();
  localStorage.clear();
	authenticate();
});

// A helper function to get the contrast color based on a given background color
function getContrastColor(bgColor) {
  var color = bgColor.replace(/[^\d,]/g, '').split(',');
  var brightness = ((parseInt(color[0]) * 299) + (parseInt(color[1]) * 587) + (parseInt(color[2]) * 114)) / 1000;
  return (brightness > 128) ? 'white' : 'black';
}