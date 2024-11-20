
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    try {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const encodedPassword = btoa(password);
        console.log("Input:", username, password);
        const loginData = {
            username: username,
            password: encodedPassword
        };
        const response = await fetch('http://localhost:8080/inventry/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const token = await response.text();
            console.log("Login successful! Token:", token);
            localStorage.setItem("token", token);
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = "front.html";
        } else {
            const errorText = await response.text();
            throw new Error(`Login failed: ${errorText}`);
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").innerText = error.message || "An error occurred during login.";
    }
});
