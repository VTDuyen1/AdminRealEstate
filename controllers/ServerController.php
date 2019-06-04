<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;

class ServerController extends Controller
{
    /**
     * Restart server.
     */
    public function actionRestart()
    {
        shell_exec('cd ');
        echo shell_exec('service apache2 restart');
        die();
        shell_exec('1234');
        return $this->goHome();
    }
}
