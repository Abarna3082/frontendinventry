document.getElementById("loginForm").addEventListener("submit", async function(event) {
    try{
        event.preventDefault(); // Prevent form from submitting normally

        // Get user input
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const encodedPassword = btoa(password);

        console.log(username, password)
        // Create an object for the login data
        const loginData = {
            username: username,
            password: encodedPassword
        };
    
       const response=await fetch('http://localhost:8080/inventry/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that we are sending JSON
            },
            body: JSON.stringify(loginData)  // Convert the data to JSON format
        })

        if(!response.ok){
            throw new Error("Error while login")
        }

        const responseMessage=response.text();
        window.location.href="front.html"
    }catch(error){
        console.log(error)
    }
    
    
});