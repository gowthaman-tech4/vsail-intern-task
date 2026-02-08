<?php
header('Content-Type: application/json');
require_once 'db.php';


$headers = apache_request_headers();
$token = $headers['Authorization'] ?? '';

if (empty($token)) {
    $token = $_REQUEST['token'] ?? '';
}

if (empty($token)) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}


$userId = $redis->get('session:' . $token);

if (!$userId) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid session']);
    exit;
}


$dbName = 'vsail_intern';
$collectionName = 'profiles';
$namespace = "$dbName.$collectionName";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $filter = ['user_id' => (int)$userId];
    $query = new MongoDB\Driver\Query($filter);
    
    try {
        $cursor = $mongoManager->executeQuery($namespace, $query);
        $document = current($cursor->toArray());
        
        if ($document) {
            echo json_encode(['status' => 'success', 'data' => [
                'name' => $document->name ?? '',
                'city' => $document->city ?? '',
                'destination' => $document->destination ?? '',
                'age' => $document->age ?? '',
                'dob' => $document->dob ?? '',
                'contact' => $document->contact ?? '',
                'profile_pic' => $document->profile_pic ?? ''
            ]]);
        } else {
            echo json_encode(['status' => 'success', 'data' => null]);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'MongoDB Error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $city = $_POST['city'] ?? '';
    $destination = $_POST['destination'] ?? '';
    $age = $_POST['age'] ?? '';
    $dob = $_POST['dob'] ?? '';
    $contact = $_POST['contact'] ?? '';
    
    $profile_pic_url = null;
    
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../assets/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $fileName = uniqid() . '_' . basename($_FILES['profile_pic']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $targetPath)) {
            $profile_pic_url = 'assets/uploads/' . $fileName;
        }
    }

    $bulk = new MongoDB\Driver\BulkWrite;
    $filter = ['user_id' => (int)$userId];
    
    $updateData = [
        'user_id' => (int)$userId,
        'name' => $name,
        'city' => $city,
        'destination' => $destination,
        'age' => $age,
        'dob' => $dob,
        'contact' => $contact
    ];
    
    if ($profile_pic_url) {
        $updateData['profile_pic'] = $profile_pic_url;
    }
    
    $update = ['$set' => $updateData];
    
    $bulk->update($filter, $update, ['upsert' => true]);
    
    try {
        $result = $mongoManager->executeBulkWrite($namespace, $bulk);
        $response = ['status' => 'success', 'message' => 'Profile updated'];
        if ($profile_pic_url) {
            $response['profile_pic_url'] = $profile_pic_url;
        }
        echo json_encode($response);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Update failed: ' . $e->getMessage()]);
    }
}
?>
