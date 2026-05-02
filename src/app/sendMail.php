<?php
// filepath: contact-form-handler.php
header("Access-Control-Allow-Origin: *"); // Ersetzen mit deiner Domain in Produktion
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Bei OPTIONS-Anfragen (CORS preflight) hier beenden
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Überprüfen, ob es sich um eine POST-Anfrage handelt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Nur POST-Anfragen sind erlaubt']);
    exit();
}

// JSON-Daten vom Angular-Formular empfangen
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Überprüfen, ob alle erforderlichen Felder vorhanden sind
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Unvollständige Formulardaten']);
    exit();
}

// Validierung
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject = filter_var($data['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Alle Felder müssen ausgefüllt sein']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Ungültige E-Mail-Adresse']);
    exit();
}

// E-Mail-Inhalt erstellen
$to = "david.werner@david-werner.dev";
$emailSubject = "Kontaktformular: $subject";
$emailBody = "Name: $name\n";
$emailBody .= "E-Mail: $email\n\n";
$emailBody .= "Nachricht:\n$message";
$headers = "From: noreply@david-werner.dev\r\n";
$headers .= "Reply-To: $email\r\n";

// E-Mail senden
$mailSuccess = mail($to, $emailSubject, $emailBody, $headers);

if ($mailSuccess) {
    // Optional: Bestätigungs-E-Mail an den Absender
    $confirmSubject = "Vielen Dank für deine Nachricht";
    $confirmBody = "Hallo $name,\n\n";
    $confirmBody .= "vielen Dank für deine Nachricht. Ich werde mich so schnell wie möglich bei dir melden.\n\n";
    $confirmBody .= "Deine Nachricht:\n$message\n\n";
    $confirmBody .= "Mit freundlichen Grüßen,\nDavid Werner";
    $confirmHeaders = "From: david.werner@david-werner.dev\r\n";
    
    mail($email, $confirmSubject, $confirmBody, $confirmHeaders);
    
    echo json_encode(['success' => true, 'message' => 'Deine Nachricht wurde erfolgreich gesendet!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.']);
}
?>