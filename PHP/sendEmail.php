<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "colin.berens@hotmail.com";  // Replace with your email address
    $subject = "New Message from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        // Redirect back to the main page with a success message
        header('Location: ../index.html?success=1');
        exit;
    } else {
        // Redirect back to the main page with an error message
        header('Location: ../index.html?success=0');
        exit;
    }
}
?>
