<?php
declare(strict_types=1);

require_once __DIR__ . '/page_common.php';

$data = skyy_read_json(__DIR__ . '/../data/pages/index.json');
skyy_send_json(['ok' => true, 'index' => $data]);
