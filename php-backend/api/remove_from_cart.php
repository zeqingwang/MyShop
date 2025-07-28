<?php
require_once '../config/db.php';
// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? 1;

if (!$user_id || !$product_id) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id and product_id are required']);
    exit;
}

// First, get current quantity in cart
$stmt = $pdo->prepare("SELECT quantity FROM carts WHERE user_id = ? AND product_id = ?");
$stmt->execute([$user_id, $product_id]);
$cartItem = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cartItem) {
    http_response_code(404);
    echo json_encode(['error' => 'Product not found in cart']);
    exit;
}

$currentQuantity = $cartItem['quantity'];
$newQuantity = $currentQuantity - $quantity;

if ($newQuantity <= 0) {
    // Remove the item completely if quantity becomes 0 or negative
    $stmt = $pdo->prepare("DELETE FROM carts WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$user_id, $product_id]);
    echo json_encode(['message' => 'Product removed from cart']);
} else {
    // Update quantity
    $stmt = $pdo->prepare("UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$newQuantity, $user_id, $product_id]);
    echo json_encode(['message' => 'Quantity updated in cart', 'new_quantity' => $newQuantity]);
}
?> 