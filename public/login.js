const host = window.location.origin;

async function addCredentials(username, password) {
    await fetch(`${host}/credentials`, {
      method: 'POST',
      body: JSON.stringify({
        user_username: username,
        user_password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log("user added");
  }

function login(event) {
    event.preventDefault();

    const username = document.getElementById("l-username").value;
    const password = document.getElementById("l-password").value;

    fetch(`${host}/credentials`)
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
            const user = resJson.find(entry => entry.user_username === username);
            if (user) {
                if (user.user_password === password) {
                    console.log("Log in successful");
                    sessionStorage.setItem('user', username);
                    sessionStorage.setItem('loggedIn', 'true')
                    console.log(sessionStorage.getItem('user'));
                    alert("Login successful!")
                        setTimeout(function() {
                            window.location.href = "home.html";
                        }, 2000);
                } else {
                    console.log("Incorrect password");
                }
            } else {
                console.log("User not found");
            }
        })
        .catch((error) => console.error("Error fetching credentials:", error));
}

function createAccount(event) {
    event.preventDefault();

    const username = document.getElementById("c-username").value;
    const password = document.getElementById("c-password").value;

    addCredentials(username, password);
    alert("Account created successfully.")
}

function logOut(event) {
    event.preventDefault()
    if (sessionStorage.getItem('user')) {
        sessionStorage.removeItem('user');
        sessionStorage.setItem('loggedIn', 'false')
        console.log("hmm")
        alert("You have logged out.")
    } else {
        console.log("You weren't logged in. ")
    }
        
    
    
}