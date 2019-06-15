<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Application;
use yii\models\Configuration;
use app\models\Setting;
use app\models\User;

class AnalyticsController extends Controller
{

    /**
     * Displays homepage.  
     *
     * @return string
     */
    public function actionIndex()
    {
        $model = User::findOne(['user_id' => Yii::$app->user->identity->user_id]);

        if ($model === null) {
            throw new HttpException(404, 'The requested page does not exist.');
        }

        $dataProvider = $model->search();
        return $this->render('index', compact('model', 'dataProvider')); 
    }

    public function actionReset()
    {
        $model = Configuration::find()->where(['name'=>'test_server'])->one();
        $model->value = 'https://test.rta.vn';

        if ($model->save()) {
           Yii::$app->session->setFlash('success', "Url reset Successfully");
        } else {
            Yii::$app->session->setFlash('error', "Url reset error");
            }
        return $this->redirect(['index']);
    }
}
