<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Application;
use app\models\Configuration;
use app\models\Setting;

class SettingController extends Controller
{

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $model = Configuration::find()->where(['name'=>'test_server'])->one();
        $request = Yii::$app->request;
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->save()) { 
                 Yii::$app->session->setFlash('success', "Successfully");
            } else { 
                 Yii::$app->session->setFlash('error', "Error");
            }
        }
        return $this->render('index',['model'=>$model]);     
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
