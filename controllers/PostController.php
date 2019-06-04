<?php  

namespace app\controllers;

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
            // $model->uploadFile = UploadedFile::getInstance($model, 'uploadFile');
            date_default_timezone_set("Asia/Ho_Chi_Minh");

            //var_dump(date('Y-m-d H:i:s'));die();
            //$time      = strtotime('+3 hour', time());
            $datetime  = date('Y-m-d H:i:s');
            $suffix    = date('YmdHis', time());

            // if(empty($model->uploadFile->name)){
            //     $model->addError('uploadFile', 'You have to choce a file !');
            //     return $this->render('create', compact('model'));
            // }
            //trích xuất chuỗi 
            //substr(string_name, start_position, string_length_to_cut)
            //The strpos() function finds the position of the first occurrence of a string inside another string.
           /* $file_name = substr($model->uploadFile->name, 0, strpos($model->uploadFile->name, '.xls'));
            $model->uploadFile->name = str_replace($file_name, $file_name.'_'.$suffix, $model->uploadFile->name);*/
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
