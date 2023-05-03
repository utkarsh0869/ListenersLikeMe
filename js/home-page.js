document.addEventListener("DOMContentLoaded", function(event) {
  var userNameSpan = document.getElementById("userNameSpan");

  const storedProfile = localStorage.getItem('profile');
  const profile = JSON.parse(storedProfile);
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let userData = JSON.parse(this.responseText);
      userNameSpan.textContent = userData.userName; 
    }
  };
  xhr.open("GET", "../php/GetProfileFromServer.php?userId=" + profile.id);
  xhr.send();

    userNameSpan.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});


