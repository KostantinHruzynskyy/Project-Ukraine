<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=120');

$path = __DIR__ . '/../data/sources.json';
if (!is_file($path)) {
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'Dataset non trovato'], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode((string) file_get_contents($path), true);
echo json_encode(['ok' => true, 'sources' => $data], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
