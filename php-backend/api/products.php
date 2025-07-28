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


// Collect query parameters
$sort = $_GET['sort'] ?? 'id'; // id | name_asc | name_desc
$category_id = $_GET['category_id'] ?? null;
$product_id = $_GET['id'] ?? null;
$search = $_GET['search'] ?? null;

// Build base query
$sql = "SELECT * FROM products WHERE 1";
$params = [];

// Filter by ID
if ($product_id) {
    $sql .= " AND id = ?";
    $params[] = $product_id;
}

// Filter by category
if ($category_id) {
    $sql .= " AND category_id = ?";
    $params[] = $category_id;
}

// Search by name prefix
if ($search) {
    $sql .= " AND name LIKE ?";
    $params[] = $search . '%'; // Match beginning of name
}

// Sorting logic
switch ($sort) {
    case 'name_asc':
        $sql .= " ORDER BY name ASC";
        break;
    case 'name_desc':
        $sql .= " ORDER BY name DESC";
        break;
    default:
        $sql .= " ORDER BY id ASC";
        break;
}

// Execute
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Respond
echo json_encode($products);
?>
