<?php
require_once '../config/db.php';
header("Content-Type: application/json");

$stmt = $pdo->query("SELECT id, name FROM categories ORDER BY name ASC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
