<?php 
namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Device;
use app\models\TestCase;
use app\models\Operation;
use yii\web\HttpException;


class DashboardController extends controller
{
	
    public function actionIndex()
    {
        /*preg_match('!end-stop-([^\)]+)s!', ' inline float_button end-stop-10s ', $match);
          print_r($match);
                    die();
*/
        $model = new Operation();
        $dataProvider = $model->search();

        return $this->render('index', compact('model', 'dataProvider'));
    }

    public function getTestCasebyId($id)
    {
        $model = TestCase::findOne(['id' => $id]);
        if ($model === null) {
            return null;
        }
        return $model->name;
    }

    public function getDeviceNamebyId($id)
    {
        $model = Device::findOne(['id' => $id]);
        if ($model === null) {
            return null;
        }
        return $model->name . ' - ' . $model->serial_number;
    }

    public function getConnectedDevices()
    {
        try {
            return shell_exec(ANDROID_HOME . "platform-tools/adb devices");
            //C:\Users\Duyen\Downloads\platform-tools_r28.0.0-windows\platform-tools\adb devices");
        } catch (Exception $e) {}

        return false;
    }
}
?>