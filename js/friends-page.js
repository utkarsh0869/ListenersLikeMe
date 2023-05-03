const storedProfile = localStorage.getItem('profile');
const profile = JSON.parse(storedProfile);
// console.log(profile.id);

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {

        let userData = JSON.parse(this.responseText);
        if (profile.images[0]) {

    		document.getElementById("userProfileImage").src = userData.userProfileImageURL; 
		}
    }
};
xhr.open("GET", "../php/GetProfileFromServer.php?userId=" + profile.id);
xhr.send();

const storedFollowedArtists = localStorage.getItem('followedArtists');
const followedArtists = JSON.parse(storedFollowedArtists);
// console.log(followedArtists.artists.items[0].images[0].url);

for(var i = 0; i < 10; i++) {
	let xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {

			let userData2 = JSON.parse(this.responseText);

			var div = document.createElement('div');
			div.classList.add('divClass');
			document.body.appendChild(div);

			var img = new Image();
			img.src = userData2.artistImageURL;
			img.classList.add('circular-image'); 
			div.appendChild(img);

			var heading = document.createElement('h3');
			heading.classList.add('heading3'); 
			heading.textContent = userData2.artistName;
			div.appendChild(heading);

			var btn = document.createElement('button');
			btn.classList.add('follow-button');
			btn.innerHTML = "Following";
			div.appendChild(btn);
		}
	}

	xhr2.open("GET", "../php/GetFollowedArtistsFromServer.php?artistId=" + 
	followedArtists.artists.items[i].id);
	xhr2.send();

}
