<?php
declare(strict_types=1);

require_once __DIR__ . '/page_common.php';

$data = skyy_read_json(__DIR__ . '/../data/films.json');
$tag = strtolower(trim((string)($_GET['tag'] ?? '')));

if ($tag !== '') {
    $data['films'] = array_values(array_filter($data['films'], static function (array $film) use ($tag): bool {
        return in_array($tag, array_map('strtolower', $film['tags'] ?? []), true);
    }));
    $data['count'] = count($data['films']);
}

skyy_send_json(['ok' => true, 'films' => $data]);
