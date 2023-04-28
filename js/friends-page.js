const storedProfile = localStorage.getItem('profile');
const profile = JSON.parse(storedProfile);
// console.log(profile.id);

if (profile.images[0]) {
    document.getElementById("userProfileImage").src = profile.images[0].url; 
}

const storedFollowedArtists = localStorage.getItem('followedArtists');
const followedArtists = JSON.parse(storedFollowedArtists);
// console.log(followedArtists.artists.items[0].images[0].url);

for(var i = 0; i < 10; i++) {
	var div = document.createElement('div');
	div.classList.add('divClass');
	document.body.appendChild(div);

	var img = new Image();
	img.src = followedArtists.artists.items[i].images[0].url;
	img.classList.add('circular-image'); 
	div.appendChild(img);

	var heading = document.createElement('h3');
	heading.classList.add('heading3'); 
	heading.textContent = followedArtists.artists.items[i].name;
	div.appendChild(heading);

	var btn = document.createElement('button');
	btn.classList.add('follow-button');
	btn.innerHTML = "Following";
	div.appendChild(btn);
}

