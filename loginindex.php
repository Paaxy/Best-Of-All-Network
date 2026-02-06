<?php
session_start();

// Simulated "database" using a session variable
if (!isset($_SESSION['users'])) {
    $_SESSION['users'] = []; // Stores username => password
}

// Handle Sign Up
if (isset($_POST['signup'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Save user
    $_SESSION['users'][$user] = $pass;

    $message = "Sign up successful! Please log in.";
}

// Handle Login
if (isset($_POST['login'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    if (isset($_SESSION['users'][$user]) && $_SESSION['users'][$user] === $pass) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $user;

        // Redirect to /main
        header("Location: /main");
        exit;
    } else {
        $message = "Invalid username or password.";
    }
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    session_destroy();
    header("Location: authindex.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Best Of All Network - Auth</title>
    <style>
        body { 
            font-family: sans-serif; 
            display: flex; 
            justify-content: center; 
            padding-top: 50px;
            background: linear-gradient(135deg, #4a90e2, #9013fe);
            height: 100vh;
            margin: 0;
            color: white;
        }
        .container { 
            background: rgba(0,0,0,0.35);
            padding: 25px; 
            border-radius: 12px; 
            width: 320px;
            backdrop-filter: blur(10px);
        }
        input { 
            display: block; 
            width: 100%; 
            margin-bottom: 10px; 
            padding: 10px; 
            border-radius: 6px; 
            border: none;
        }
        button { 
            width: 100%; 
            padding: 10px; 
            background-color: #00d084; 
            color: black; 
            border: none; 
            cursor: pointer; 
            border-radius: 6px;
            font-weight: bold;
        }
        button.logout { 
            background-color: #ff4f4f; 
            color: white; 
            margin-top: 15px;
        }
        h2 { text-align: center; }
        p { text-align: center; }
    </style>
</head>
<body>
    <div class="container">

        <?php if (isset($message)) echo "<p>$message</p>"; ?>

        <?php if (!isset($_SESSION['loggedin'])): ?>

            <h2>Sign Up</h2>
            <form method="post">
                <input type="text" name="username" placeholder="Create username" required>
                <input type="password" name="password" placeholder="Create password" required>
                <button type="submit" name="signup">Sign Up</button>
            </form>

            <h2>Login</h2>
            <form method="post">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login</button>
            </form>

        <?php else: ?>

            <h2>Welcome, <?php echo $_SESSION['username']; ?>!</h2>
            <a href="authindex.php?action=logout">
                <button class="logout">Logout</button>
            </a>

        <?php endif; ?>

    </div>
</body>
</html>
