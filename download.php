<?php
// filepath: download.php

if (!isset($_GET['file']) || empty($_GET['file'])) {
    header("HTTP/1.0 400 Bad Request");
    exit("Keine Datei angegeben");
}

$basePath = __DIR__ . '/assets/downloads/';
$file = htmlspecialchars( $_GET['file']);

$file = basename($file); // Nur Dateiname ohne Pfad erlauben

$filePath = $basePath . $file;

if (!file_exists($filePath)) {
    header("HTTP/1.0 404 Not Found");
    exit("Datei nicht gefunden: $filePath");
}

$fileExt = pathinfo($filePath, PATHINFO_EXTENSION);
$contentType = 'application/octet-stream'; // Default

if ($fileExt == 'pdf') {
    $contentType = 'application/pdf';
} else if ($fileExt == 'docx') {
    $contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}


header('Content-Description: File Transfer');
header('Content-Type: ' . $contentType);
header('Content-Disposition: attachment; filename="' . $file . '"');
header('Content-Length: ' . filesize($filePath));
header('Pragma: public');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Expires: 0');

ob_clean();
flush();

readfile($filePath);
exit;
?>