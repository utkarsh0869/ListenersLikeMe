var isAuthorized = false;

export async function authenticate() {
        const clientId = "241075b3b0504a96b913adec8844d991"; // Replace with your client id
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            const accessToken = await getAccessToken(clientId, code);

            const profile = await fetchProfile(accessToken);
            localStorage.setItem("profile", JSON.stringify(profile));
            saveProfileToServer(profile);

            const followedArtists = await fetchFollowedArtists(accessToken);
            localStorage.setItem("followedArtists", JSON.stringify(followedArtists));
            saveFollowedArtistsToServer(followedArtists);

            populateUI(profile);
        }

        async function redirectToAuthCodeFlow(clientId) {
            // TODO: Redirect to Spotify authorization page
            const verifier = generateCodeVerifier(128);
            const challenge = await generateCodeChallenge(verifier);

            localStorage.setItem("verifier", verifier);

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("response_type", "code");
            params.append("redirect_uri", "http://localhost:8888/SoloListenersLikeMe/html/index.html");
            params.append("scope", "user-read-private user-read-email user-follow-read");
            params.append("code_challenge_method", "S256");
            params.append("code_challenge", challenge);

            document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
        }

        function generateCodeVerifier(length) {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        async function generateCodeChallenge(codeVerifier) {
            const data = new TextEncoder().encode(codeVerifier);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
            return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        async function getAccessToken(clientId, code) {
            const verifier = localStorage.getItem("verifier");

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("redirect_uri", "http://localhost:8888/SoloListenersLikeMe/html/index.html");
            if (typeof verifier === 'string') {
              params.append("code_verifier", verifier);
            } else {
                throw new Error("Code verifier not found");
            }

            const result = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params
            });

            const { access_token } = await result.json();
            return access_token;
        }

        //rest of the methods
        async function fetchProfile(token) {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });

            return await result.json();
        }


        async function fetchFollowedArtists(token) {
            const result = await fetch('https://api.spotify.com/v1/me/following?type=artist&limit=15', {
                method: "GET", headers: { Authorization: `Bearer ${token}`}
            });

            return await result.json(); 
        }



        function saveProfileToServer(profile) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText + "here"); 
                }
            };
            xhr.open('POST', '../php/SaveProfileToServer.php');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            if(profile.images[0]) {
                xhr.send('userEmail=' + profile.email + "&userId=" + profile.id +
                     '&userName=' + profile.display_name + "&spotifyURI=" + profile.uri +
                     '&spotifyURL=' + profile.external_urls.spotify +
                     '&userProfileImageURL=' + profile.images[0].url + 
                     '&userBio=' + "");
            }

        }

        function saveFollowedArtistsToServer(followedArtists) {
            for(var i = 0; i < 10; i++) {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        console.log(this.responseText + "here"); 
                    }
                };
                xhr.open('POST', '../php/SaveFollowedArtistsToServer.php');
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    
                xhr.send('artistImageURL=' + followedArtists.artists.items[i].images[0].url + 
                "&artistName=" + followedArtists.artists.items[i].name + 
                "&artistId=" + followedArtists.artists.items[i].id);
                    
            }
                
        }

        isAuthorized = true;
}

export function populateUI(profile) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            let userData = JSON.parse(this.responseText);
            document.getElementById("displayName").innerText = userData.userName;
            if (profile.images[0]) {
                const profileImage = new Image(400, 200);
                profileImage.src = userData.userProfileImageURL;
                document.getElementById("avatar").appendChild(profileImage);
                document.getElementById("imgUrl").innerText = userData.userProfileImageURL;
            }
            document.getElementById("id").innerText = userData.userId;
            document.getElementById("email").innerText = userData.userEmail;
            document.getElementById("uri").innerText = userData.spotifyURI;
            document.getElementById("uri").setAttribute("href", userData.spotifyURI);
            document.getElementById("url").innerText = userData.spotifyURL;
            document.getElementById("url").setAttribute("href", userData.spotifyURL);
        }
    };
    xhr.open("GET", "../php/GetProfileFromServer.php?userId=" + profile.id);
    xhr.send();
}