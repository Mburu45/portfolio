<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    if (empty($name) || empty($email) || empty($message)) {
        die("⚠️ Please fill in all fields.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("⚠️ Invalid email format.");
    }

    $to      = "mburulawrence6@gmail.com";
    $subject = "📩 New Contact Form Message";
    $body    = "You received a new message from your portfolio site:\n\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Message:\n$message";
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Thank you, $name! Your message has been sent successfully.";
    } else {
        echo "❌ Sorry, something went wrong. Please try again later.";
    }
}
?>
