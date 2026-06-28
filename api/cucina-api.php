<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'Metodo non consentito'
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

$dataFile = __DIR__ . '/../data/cucina-data.json';

if (!is_readable($dataFile)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Dataset cucina non trovato'
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

$raw = file_get_contents($dataFile);
$data = json_decode($raw ?: '', true);

if (!is_array($data)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Dataset cucina non valido'
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

$recipes = $data['recipes'] ?? [];
$query = strtolower(trim((string)($_GET['q'] ?? '')));
$category = strtolower(trim((string)($_GET['category'] ?? '')));
$region = strtolower(trim((string)($_GET['region'] ?? '')));

$filtered = array_filter($recipes, static function (array $recipe) use ($query, $category, $region): bool {
    $recipeCategory = strtolower((string)($recipe['category'] ?? ''));
    $recipeRegion = strtolower((string)($recipe['region'] ?? ''));
    $haystack = strtolower(json_encode($recipe, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '');

    if ($category !== '' && $recipeCategory !== $category) {
        return false;
    }

    if ($region !== '' && strpos($recipeRegion, $region) === false) {
        return false;
    }

    if ($query !== '' && strpos($haystack, $query) === false) {
        return false;
    }

    return true;
});

echo json_encode([
    'ok' => true,
    'updated' => $data['updated'] ?? null,
    'note' => $data['note'] ?? null,
    'count' => count($filtered),
    'categories' => $data['categories'] ?? [],
    'sources' => $data['sources'] ?? [],
    'recipes' => array_values($filtered)
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
