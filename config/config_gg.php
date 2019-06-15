<?php
$oauthClientID = '13204906528-ddlnnp9p6b9fb7lunsfe6dr6o90r1tfp.apps.googleusercontent.com';
$oauthClientSecret = 'SwESIHSnkIxwD2pgIFRlKW_O';
$baseURL = 'http://localhost:8080/post/create';
$redirectURL = 'http://localhost/upload-video-youtube-php-master/upload.php';

define('OAUTH_CLIENT_ID',$oauthClientID);
define('OAUTH_CLIENT_SECRET',$oauthClientSecret);
define('REDIRECT_URL',$redirectURL);
define('BASE_URL',$baseURL);

// Include google client libraries 
require_once '../google-api-php-client/vendor/autoload.php';
require_once '../google-api-php-client/src/Google/Client.php';
require_once '../google-api-php-client/vendor/google/apiclient-services/src/Google/Service/YouTube.php';
session_start();

public $client = new Google_Client();
$client->setClientId(OAUTH_CLIENT_ID);
$client->setClientSecret(OAUTH_CLIENT_SECRET);
$client->setScopes('https://www.googleapis.com/auth/youtube');
$client->setRedirectUri(REDIRECT_URL);

//Định nghĩ 1 object sẽ được sử dụng để thực hiện tất cả API request
public $youtube = new Google_Service_YouTube($client);
?>
