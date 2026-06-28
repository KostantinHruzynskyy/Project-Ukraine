<?php
declare(strict_types=1);

function skyy_send_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function skyy_read_json(string $path): array
{
    if (!is_readable($path)) {
        skyy_send_json(['ok' => false, 'error' => 'File non trovato'], 404);
        exit;
    }

    $raw = file_get_contents($path);
    $data = json_decode($raw ?: '', true);

    if (!is_array($data)) {
        skyy_send_json(['ok' => false, 'error' => 'JSON non valido'], 500);
        exit;
    }

    return $data;
}

function skyy_send_page(string $slug): void
{
    $safeSlug = basename($slug);
    $path = __DIR__ . '/../data/pages/' . $safeSlug . '.json';
    $data = skyy_read_json($path);
    skyy_send_json(['ok' => true, 'page' => $data]);
}
