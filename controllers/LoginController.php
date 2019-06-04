<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\assets\AppAsset;
use app\models\LoginForm;
use yii\base\Model;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;

class LoginController extends Controller
{

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionIndex()
    {
            // return $this->renderPartial('login');
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
            //return $this->redirect('/site/index');
        } 
        $model->password = '';
        return $this->renderPartial('login', [
            'model' => $model,
        ]); 
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

}
