<?php
  
namespace app\controllers;

use Yii;
use app\models\User;

class ConfigController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $model = User::findOne(['user_id' => Yii::$app->user->identity->user_id]);

        if ($model === null) {
            throw new HttpException(404, 'The requested page does not exist.');
        }

        $dataProvider = $model->search();
        return $this->render('index', compact('model', 'dataProvider'));
    }

    public function actionView(){
        $id = Yii::$app->request->get('user_id');
        $model = $this->loadModel($id);

        return $this->render('view', compact('model'));
    }

    /*
    */
    protected function loadModel($id)
    {
        $model = User::findOne(['user_id' => $id]);

        if ($model === null) {
            throw new HttpException(404, 'The requested page does not exist.');
        }

        return $model;
    }

    /*
    */
    public function actionDelete()
    {
        $id = Yii::$app->request->post('user_id');
        $model = $this->loadModel($id);       
        if ($model->delete()) {            
            return true;
        }
    }

    /*
    */
    public function actionUpdate()
    {
        $id = Yii::$app->request->get('user_id');       
        $model = $this->loadModel($id);
        
        if ($model->load(Yii::$app->request->post())) {
            $model->password=   $model->hashPass($model->password);
            $model->repassword=$model->password;
            $datetime = date("Y-m-d H:i:s", strtotime('+7 hour', time()));

            // $model->date_of_birth= date('Y/m/d', strtotime($model->date_of_birth));
            $model->setAttribute('updated_date', $datetime);

            if ($model->save()) {
                return $this->redirect('index');
            }
        }
        return $this->render('update', compact('model'));
    }

    /*
    */
    public function actionCreate(){
        $model = new User();
        if ($model->load(Yii::$app->request->post())) {

            $model->name= $model->name;  
            $model->full_name = $model->full_name;
            $model->email = $model->email;
            $model->password=   $model->hashPass($model->password);
            $model->repassword= $model->password;
            $model->phone_number = $model->phone_number;
            $model->birthday= date('Y/m/d', strtotime($model->birthday));
            $model->accommodation = $model->accommodation;
            $datetime = date("Y-m-d H:i:s", strtotime('+7 hour', time()));
            $model->setAttributes(['created_date' => $datetime, 'updated_date' => $datetime]);          
           
            if ($model->save()) {
                return $this->redirect('index');
            }
            else{

            }
        }
        return $this->render('create', compact('model'));
    }

    /*
    */
    public function actionDeleteall()
    {
        $ids = Yii::$app->request->post('ids');
        if (empty($ids)) {
            return false;
        }
        $result = user::deleteAll('user_id='.implode(' or user_id=', $ids));
        //explode chuyển chuỗi thành mảng
        //$ids or id=$ids or id=$ids or id=$ids
        return true;
    }
}
