<?php  

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\HttpException;
use yii\web\UploadedFile;
use app\models\UploadForm;
use app\models\Post;
use Google_Service_YouTube_VideoSnippet;
use Google_Client;
use Google_Service_YouTube;
// use Google_Service_YouTube_VideoSnippet;
// use Google_Service_YouTube_VideoStatus;
// use Google_Service_YouTube_Video;
// use Google_Http_MediaFileUpload;
// use Google_Exception;
// require_once 'Video.php';
// require_once 'VideoSnippet.php';
// require_once 'VideoStatus.php';
// require_once 'MediaFileUpload.php';

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
            $model->uploadImage = UploadedFile::getInstance($model, 'uploadImage');
            $model->uploadVideo = UploadedFile::getInstance($model, 'uploadVideo');
            date_default_timezone_set("Asia/Ho_Chi_Minh");

            //var_dump(date('Y-m-d H:i:s'));die();
            //$time      = strtotime('+3 hour', time());
            $datetime  = date('Y-m-d H:i:s');
            $suffix    = date('YmdHis', time());

            if(empty($model->uploadImage->name)){
                $model->addError('uploadImage', 'You have to choice a file !');
                return $this->render('create', compact('model'));
            }
             if(empty($model->uploadVideo->name)){
                $model->addError('uploadVideo', 'You have to choice a file !');
                return $this->render('create', compact('model'));
            }
            //trích xuất chuỗi 
            //substr(string_name, start_position, string_length_to_cut)
            //The strpos() function finds the position of the first occurrence of a string inside another string.
            $file_name = substr($model->uploadImage->name, 0, strpos($model->uploadImage->name, '.mp4'));
            $file_name_video = substr($model->uploadVideo->name, 0, strpos($model->uploadVideo->name, '.mp4'));
            $model->uploadImage->name = str_replace($file_name, $file_name.'_'.$suffix, $model->uploadImage->name);
            $model->uploadVideo->name = str_replace($file_name_video, $file_name_video.'_'.$suffix, $model->uploadVideo->name);

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



            $filePathVideo = Yii::$app->basePath.'/uploads/video/'.$model->uploadVideo->name;
            // ================================================================================================

            echo $filePathVideo;



           // REPLACE this value with the path to the file you are uploading.
            $videoPath = $filePathVideo;

            $snippet = new Google_Service_YouTube_VideoSnippet();
            $snippet->setTitle("Real Estate");
            $snippet->setDescription("Video of Admin Real Estate");
            $snippet->setTags(array("HCM_City", "Distric"));

            // Numeric video category. See
            // https://developers.google.com/youtube/v3/docs/videoCategories/list 
            $snippet->setCategoryId("22");

            // Set the video's status to "public". Valid statuses are "public",
            // "private" and "unlisted".
            $status = new Google_Service_YouTube_VideoStatus();
            $status->privacyStatus = "public";

            // Associate the snippet and status objects with a new video resource.
            $video = new Google_Service_YouTube_Video();
            $video->setSnippet($snippet);
            $video->setStatus($status);
            // Specify the size of each chunk of data, in bytes. Set a higher value for
            // reliable connection as fewer chunks lead to faster uploads. Set a lower
            // value for better recovery on less reliable connections.
            $chunkSizeBytes = 1 * 1024 * 1024;

            // Setting the defer flag to true tells the client to return a request which can be called
            // with ->execute(); instead of making the API call immediately.
            $client->setDefer(true);

            // Create a request for the API's videos.insert method to create and upload the video.
            $insertRequest = $youtube->videos->insert("status,snippet", $video);

            // Create a MediaFileUpload object for resumable uploads.
            $media = new Google_Http_MediaFileUpload(
                $client,
                $insertRequest,
                'video/*',
                null,
                true,
                $chunkSizeBytes
            );
            $media->setFileSize(filesize($videoPath));

          // Read the media file and upload it chunk by chunk.
            $status = false;
            $handle = fopen($videoPath, "rb");
            while (!$status && !feof($handle)) {
              $chunk = fread($handle, $chunkSizeBytes);
              $status = $media->nextChunk($chunk);
            }

            fclose($handle);

            // If you want to make other calls after the file upload, set setDefer back to false
            $client->setDefer(false);


// =========================================================================================================

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
        $id = Yii::$app->request->post('id');
        $model = $this->loadModel($id);
        $path = Yii::$app->basePath.'/uploads/post/'.$model->file_name;
        if ($model->delete()) {
            if (file_exists($path)) {
                unlink($path);
            }
            return true;
        }
    }

    protected function loadModel($id)
    {
        $model = Post::findOne(['id' => $id]);

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
            $path = Yii::$app->basePath.'/uploads/post/'.$model->file_name;
            if (file_exists($path)) {
                unlink($path);
            }
        }
        $result = Post::deleteAll('id='.implode(' or id=', $ids));
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
        $model->name = $modelTC->name;
        $model->description = $modelTC->description;
        $model->fileNameOld = $modelTC->file_name;

        if ($model->load(Yii::$app->request->post())) {

            $model->uploadFile = UploadedFile::getInstance($model, 'uploadFile');
            $time      = strtotime('+3 hour', time());
            $datetime  = date('Y-m-d H:i:s', $time);
            $suffix    = date('YmdHis', $time);

            if(!empty($model->uploadFile)){
                $path=Yii::$app->basePath.'/uploads/post/'.$model->fileNameOld;
                if(file_exists($path)){
                    unlink($path);
                }
                $file_name = substr($model->uploadFile->name, 0, strpos($model->uploadFile->name, '.xls'));
                $model->uploadFile->name = str_replace($file_name, $file_name.'_'.$suffix, $model->uploadFile->name);
                if ($model->upload()) {

                    // insert to db
                    $modelTC->name        = $model->name;
                    $modelTC->description = $model->description;
                    $modelTC->value       = $model->json;
                    $modelTC->file_name   = $model->uploadFile->name;          
                    $modelTC->updated_at  = $datetime;
                }
            }
            else{

                $modelTC->name        = $model->name;
                $modelTC->description = $model->description;
                
            
            }          
            if ($modelTC->save()) {
                    return $this->redirect('index');
                 }
            
        }
        return $this->render('update', compact('model'));
    }
}

