<?php
require_once '../config/db.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? 1;

if (!$user_id || !$product_id) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id and product_id are required']);
    exit;
}

// Insert or update quantity
$stmt = $pdo->prepare("
    INSERT INTO carts (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
");
$stmt->execute([$user_id, $product_id, $quantity]);

echo json_encode(['message' => 'Product added to cart']);
?>
