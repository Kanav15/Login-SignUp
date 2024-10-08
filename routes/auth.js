// routes/auth.js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <h1>Signup</h1>
        <form id="signupForm" action="/register" method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password (min 8 characters)" required />
            <select name="role" required>
                <option value="" disabled selected>Select your role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
            </select>

            <!-- Department Field -->
            <select name="department" required>
                <option value="" disabled selected>Select your department</option>
                <option value="Computer">Computer</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="AIDS">Artificial Intelligence and Data Science (AIDS)</option>
                <option value="EXTC">Electronics and Telecommunication (EXTC)</option>
            </select>

            <!-- Division Field -->
            <input type="text" name="division" placeholder="Division" required />

            <!-- Current Year Field -->
            <select name="currentYear" required>
                <option value="" disabled selected>Select your current year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
            </select>

            <!-- Student ID Field -->
            <input type="text" name="studentId" placeholder="Student ID" required />
            
            <button type="submit">Signup</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
    <script>
        // Handle server responses
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            alert(error); // Show alert if there's an error message
        }
    </script>
</body>
</html>

