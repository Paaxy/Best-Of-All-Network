async function signup() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.success
        ? "Signup successful!"
        : data.message;
}

async function login() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.success
        ? "Login successful!"
        : data.message;
}
