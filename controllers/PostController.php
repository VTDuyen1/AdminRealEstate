<?php  

namespace app\controllers;
//include api config file
// require_once '../config_gg.php';
require_once '../config_gg.php';

use Yii;
use yii\web\Controller;
use yii\web\HttpException;
use yii\web\UploadedFile;
use app\models\UploadForm;
use app\models\Post;
class PostController extends Controller
{
    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $model = new Post();
        $dataProvider = $model->search();

        return $this->render('index', compact('model', 'dataProvider'));
    }

    /**
     * Displays upload page.
     *
     * @return string
     */
    public function actionCreate()  
    {
        $model = new UploadForm();
        if ($model->load(Yii::$app->request->post())) {
            $model->uploadImages = UploadedFile::getInstances($model, 'uploadImages');
            $model->uploadVideos = UploadedFile::getInstances($model, 'uploadVideos');
            date_default_timezone_set("Asia/Ho_Chi_Minh");
            if ($model->uploadImages) {
                foreach ($model->uploadImages as $file) {
                    if(empty($file->name)){
                        $model->addError('uploadImages', 'You have to choice a file !');
                        return $this->render('create', compact('model'));
                    }
                    $suffix    = date('YmdHis', time());
                    $file_name = substr($file->name, 0, strpos($file->name, '.mp4'));
                    $file->name = str_replace($file_name, $file_name.'_'.$suffix, $file->name);
                    $filePathImage = Yii::$app->basePath.'/uploads/images/'.$file->name;
                    $file->saveAs($filePathImage);
                }
            }
            // var_dump($model->uploadVideo);
            // die();
            if ($model->uploadVideos) {
                foreach ($model->uploadVideos as $file) {
                    var_dump($file);
                    if(empty($file->name)){
                        $model->addError('uploadVideos', 'You have to choice a file !');
                        return $this->render('create', compact('model'));
                    }
                    $suffix    = date('YmdHis', time());
                    $file_name = substr($file->name, 0, strpos($file->name, '.mp4'));
                    $file->name = str_replace($file_name, $file_name.'_'.$suffix, $file->name);
                    $filePathVideo = Yii::$app->basePath.'/uploads/video/'.$file->name;
                    $file->saveAs($filePathVideo); 
                }
            }
          
            $datetime  = date('Y-m-d H:i:s');
            $suffix    = date('YmdHis', time());

            if ($model->upload()) {
                // insert to db
                $modelPost = new Post();
                $modelPost->title_post        = $model->title_post;
                $modelPost->type              = $model->type;
                $modelPost->price             = $model->price;
                $modelPost->location          = $model->location;
                $modelPost->latitude          = $model->latitude;
                $modelPost->longtitude        = $model->longtitude;
                $modelPost->negotiate         = $model->negotiate;
                $modelPost->content           = $model->content;
                // $modelPost->feature           = $model->feature;
                $modelPost->phone_number      = $model->phone_number;
                // $modelPost->description       = $model->description;
                // $modelPost->image             = $model->image;  
                // $modelPost->video             = $model->video;
                $modelPost->created_date      = $datetime;
                $modelPost->created_update    = $datetime;
                // $modelPost->value       = $model->json;
                // $modelPost->file_name   = $model->uploadFile->name;
                // $modelPost->created_at  = $datetime;
                // $modelPost->updated_at  = $datetime;
                $modelPost->user_id  = Yii::$app->user->getId();

                if ($modelPost->save()) {

                  //   $filePathVideo = Yii::$app->basePath.'/uploads/video/abc_20190612094043.mp4';
                  
                  //  // REPLACE this value with the path to the file you are uploading.
                  //   $videoPath = $filePathVideo;

                  //   $snippet = new \Google_Service_YouTube_VideoSnippet();
                  //   $snippet->setTitle("Real Estate");
                  //   $snippet->setDescription("Video of Admin Real Estate");
                  //   $snippet->setTags(array("HCM_City", "Distric"));

                  //   // Numeric video category. See
                  //   // https://developers.google.com/youtube/v3/docs/videoCategories/list 
                  //   $snippet->setCategoryId("22");

                  //   // Set the video's status to "public". Valid statuses are "public",
                  //   // "private" and "unlisted".
                  //   $status = new \Google_Service_YouTube_VideoStatus();
                  //   $status->privacyStatus = "public";

                  //   // Associate the snippet and status objects with a new video resource.
                  //   $video = new \Google_Service_YouTube_Video();
                  //   $video->setSnippet($snippet);
                  //   $video->setStatus($status);
                  //   // Specify the size of each chunk of data, in bytes. Set a higher value for
                  //   // reliable connection as fewer chunks lead to faster uploads. Set a lower
                  //   // value for better recovery on less reliable connections.
                  //   $chunkSizeBytes = 1 * 1024 * 1024;

                  //   // Setting the defer flag to true tells the client to return a request which can be called
                  //   // with ->execute(); instead of making the API call immediately.
                  //   // var_dump($status);
                  //   // var_dump($snippet);
                  //   // var_dump($video);
                  //   // die();   
                  //   $client = new \Google_Client();
                  //   $client->setClientId(OAUTH_CLIENT_ID);
                  //   $client->setClientSecret(OAUTH_CLIENT_SECRET);
                  //   $client->setScopes('https://www.googleapis.com/auth/youtube');
                  //   $client->setRedirectUri(REDIRECT_URL);

                  //   //Định nghĩ 1 object sẽ được sử dụng để thực hiện tất cả API request
                  //   $youtube = new \Google_Service_YouTube($client);

                  //   $client->setDefer(true);

                  //   // Create a request for the API's videos.insert method to create and upload the video.
                  //   $insertRequest = $youtube->videos->insert("status,snippet", $video);

                  //   // Create a MediaFileUpload object for resumable uploads.
                  //   $media = new \Google_Http_MediaFileUpload(
                  //       $client,
                  //       $insertRequest,
                  //       'video/*',
                  //       null,
                  //       true,
                  //       $chunkSizeBytes
                  //   );
                  //   $media->setFileSize(filesize($videoPath));

                  // // Read the media file and upload it chunk by chunk.
                  //   $status = false;
                  //   $handle = fopen($videoPath, "rb");
                  //   while (!$status && !feof($handle)) {
                  //     $chunk = fread($handle, $chunkSizeBytes);
                  //     $status = $media->nextChunk($chunk);
                  //   }

                  //   fclose($handle);

                  //   // If you want to make other calls after the file upload, set setDefer back to false
                  //   $client->setDefer(false);



            // ==================IMAGE UPLOAD============================

                    // $client_image = new \Google_Client();
                    // // Get your credentials from the console
                    // $client_image->setClientId(OAUTH_CLIENT_ID);
                    // $client_image->setClientSecret(OAUTH_CLIENT_SECRET);
                    // $client_image->setScopes('https://www.googleapis.com/auth/youtube');
                    // $client_image->setRedirectUri(REDIRECT_URL);

                    // // session_start();

                    // if (isset($_GET['code']) || (isset($_SESSION['access_token']) && $_SESSION['access_token'])) {
                    //     if (isset($_GET['code'])) {
                    //         $client_image->authenticate($_GET['code']);
                    //         $_SESSION['access_token'] = $client_image->getAccessToken();
                    //     } else
                    //         $client_image->setAccessToken($_SESSION['access_token']);

                    //     $service = new \Google_Service_Drive($client_image);

                    //     //Insert a file
                    //     $file = new \Google_Service_Drive_DriveFile();
                    //     $file->setName(uniqid().'.jpg');
                    //     $file->setDescription('A test document');
                    //     $file->setMimeType('image/jpeg');

                    //     $data = file_get_contents(Yii::$app->basePath.'/uploads/images/acc.png');

                    //     $createdFile = $service->files->create($file, array(
                    //           'data' => $data,
                    //           'mimeType' => 'image/jpeg',
                    //           'uploadType' => 'multipart'
                    //         ));

                    //     print_r($createdFile);

                    // } else {
                    //     $authUrl = $client_image->createAuthUrl();
                    //     header('Location: ' . $authUrl);
                    //     exit();
                    // }

                    return $this->redirect('index');
                }
            }

        }

        return $this->render('create', compact('model'));
    }

    public function actionView()
    {
        $id = Yii::$app->request->get('id');
        $model = $this->loadModel($id);
        return $this->render('view', compact('model'));
    }

    public function actionDelete()
    {
       $id = Yii::$app->request->get('post_id');
        $model = $this->loadModel($id);       
        if ($model->delete()) {

            return $this->redirect('index');
        }
    }

    protected function loadModel($id)
    {
        $model = Post::findOne(['post_id' => $id]);
        if ($model === null) {
            throw new HttpException(404, 'The requested page does not exist.');
        }

        return $model;
    }
    public function actionDeleteAll()
    {
        $ids = Yii::$app->request->post('ids');
        if (empty($ids)) {
            return false;
        }
        foreach ($ids as $id) {
            $model = $this->loadModel($id);
            // $path = Yii::$app->basePath.'/uploads/post/'.$model->file_name;
            // if (file_exists($path)) {
            //     unlink($path);
            // }
        }
        $result = Post::deleteAll('post_id='.implode(' or post_id=', $ids));
        return true;
    }

    public function actionDowloads($id)
    {
        $model = $this->loadModel($id);
        $path = Yii::$app->basePath.'/uploads/post/'.$model->file_name;
        if (file_exists($path)) {
            return Yii::$app->response->sendFile($path);
         } else {   
            throw new HttpException(404, '{$path} is not found!');
         }
    }

    public function actionUpdate($id)
    {
        ini_set('memory_limit', '-1');

        $modelTC = $this->loadModel($id);
        $model = new UploadForm();
        $model->title_post = $modelTC->title_post;
        $model->type = $modelTC->type;
        $model->price = $modelTC->price;
        $model->location = $modelTC->location;
        $model->latitude = $modelTC->latitude;
        $model->longtitude = $modelTC->longtitude;
        $model->negotiate = $modelTC->negotiate;
        $model->content = $modelTC->content;
        $model->phone_number = $modelTC->phone_number;

        if ($model->load(Yii::$app->request->post())) {

             $model->uploadImages = UploadedFile::getInstances($model, 'uploadImages');
            $model->uploadVideos = UploadedFile::getInstances($model, 'uploadVideos');
            date_default_timezone_set("Asia/Ho_Chi_Minh");
            if ($model->uploadImages) {
                foreach ($model->uploadImages as $file) {
                    if(empty($file->name)){
                        $model->addError('uploadImages', 'You have to choice a file !');
                        return $this->render('create', compact('model'));
                    }
                    $suffix    = date('YmdHis', time());
                    $file_name = substr($file->name, 0, strpos($file->name, '.mp4'));
                    $file->name = str_replace($file_name, $file_name.'_'.$suffix, $file->name);
                    $filePathImage = Yii::$app->basePath.'/uploads/images/'.$file->name;
                    $file->saveAs($filePathImage);
                }
            }
            // var_dump($model->uploadVideo);
            // die();
            if ($model->uploadVideos) {
                foreach ($model->uploadVideos as $file) {
                    var_dump($file);
                    if(empty($file->name)){
                        $model->addError('uploadVideos', 'You have to choice a file !');
                        return $this->render('create', compact('model'));
                    }
                    $suffix    = date('YmdHis', time());
                    $file_name = substr($file->name, 0, strpos($file->name, '.mp4'));
                    $file->name = str_replace($file_name, $file_name.'_'.$suffix, $file->name);
                    $filePathVideo = Yii::$app->basePath.'/uploads/video/'.$file->name;
                    $file->saveAs($filePathVideo); 
                }
            }
            $datetime  = date('Y-m-d H:i:s');
            $suffix    = date('YmdHis', time());

            if(!empty($model->uploadImages) && !empty($model->uploadVideos)){
              
                if ($model->upload()) {

                  // insert to db
                  $modelPost = new Post();
                  $modelPost->title_post        = $model->title_post;
                  $modelPost->type              = $model->type;
                  $modelPost->price             = $model->price;
                  $modelPost->location          = $model->location;
                  $modelPost->latitude          = $model->latitude;
                  $modelPost->longtitude        = $model->longtitude;
                  $modelPost->negotiate         = $model->negotiate;
                  $modelPost->content           = $model->content;
                  // $modelPost->feature           = $model->feature;
                  $modelPost->phone_number      = $model->phone_number;
                  // $modelPost->description       = $model->description;
                  // $modelPost->image             = $model->image;  
                  // $modelPost->video             = $model->video;
                  $modelPost->created_date      = $datetime;
                  $modelPost->created_update    = $datetime;
                  // $modelPost->value       = $model->json;
                  // $modelPost->file_name   = $model->uploadFile->name;
                  // $modelPost->created_at  = $datetime;
                  // $modelPost->updated_at  = $datetime;
                  $modelPost->user_id  = Yii::$app->user->getId();
                }
            }
            else{

                $modelTC->title_post        = $model->title_post;
                // $modelTC->description = $model->description;
                
            
            }          
            if ($modelTC->save()) {
                    return $this->redirect('index');
                 }
            
        }
        return $this->render('update', compact('model'));
    }
}
