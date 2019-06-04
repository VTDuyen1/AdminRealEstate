<?php  
  
namespace app\components\android;

use Yii;
use yii\base\Component;
use PhpOffice\PhpSpreadsheet\IOFactory;
use app\components\ios\IConverter;
use app\components\android\RConverter;

class RConverter extends Component
{
    public function generateTestCase($json, $device, $filename)
    {
        $object = json_decode($json);
        $formId = $object->formId[0];
        unset($object->formId);

        $result = "";
        $result .= "\"use strict\";".PHP_EOL.PHP_EOL;
        $result .= "require(\"../helpers/setup\");".PHP_EOL.PHP_EOL;
        if ($device['platform'] === 'iOS') { 
            $iConverter = new IConverter();
            $result .= "let wd = require(\"wd\"),".PHP_EOL;
            $result .= "\t"."Q = require('q'),".PHP_EOL;
            $result .= "\t"."fs = require('fs'),".PHP_EOL;
            $result .= "\t"."actions  = require('../helpers/actions');".PHP_EOL.PHP_EOL;
            $result .= "wd.addPromiseChainMethod('swipe', actions.swipe);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('scrollDown', actions.iScrollDown);".PHP_EOL.PHP_EOL;
            $result .= $iConverter->convertFeature($formId, $object, $device);
        } else {
            $result .= "let wd = require(\"wd\"),".PHP_EOL;
            $result .= "\t"."Q = require('q'),".PHP_EOL;
            $result .= "\t"."fs = require('fs'),".PHP_EOL;
            $result .= "\t"."dateTime = require('../helpers/datetime'),".PHP_EOL;
            $result .= "\t"."actions  = require('../helpers/actions');".PHP_EOL.PHP_EOL;
            $result .= "\t"."var mysql = require('mysql');".PHP_EOL;
            $result .= "\t"."var con = mysql.createConnection({".PHP_EOL;
            $result .= "\t"."host: 'localhost',".PHP_EOL;
            $result .= "\t"."user: 'root',".PHP_EOL;
            // $result .= "\t"."password: 'rta@123456',".PHP_EOL;
            $result .= "\t"."database: 'db_automation_test'".PHP_EOL;
            // $result .= "\t"."database: 'autotest'".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;

            $result .= "wd.addPromiseChainMethod('swipe', actions.swipe);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('scrollTo', actions.scrollTo);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('scrollDown', actions.scrollDown);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('scrollUp', actions.scrollUp);".PHP_EOL;
            $result .= "wd.addPromiseChainMethod('draw', actions.draw);".PHP_EOL.PHP_EOL;
            $result .= $this->convertFeature($formId, $object, $device, $filename);
        }

        return $result;
    }

    private function convertFeature($formId, $data, $device, $filename)
    {
        $result = "";
        $result .= "describe(\"Test ".$formId." Form\", function () {".PHP_EOL;
        $result .= "\t"."this.timeout(2400000);".PHP_EOL;
        $result .= "\t"."var driver;".PHP_EOL;
        $result .= "\t"."var allPassed = true;".PHP_EOL.PHP_EOL;
        $result .= "\t"."after(function () {".PHP_EOL;
        $result .= "\t"."\t"."console.log(allPassed ? '[PASSED]' : '[FAILED]');".PHP_EOL;
        $result .= "\t"."});".PHP_EOL.PHP_EOL;
        $result .= "\t"."afterEach(function () {".PHP_EOL;
        $result .= "\t"."\t"."allPassed = allPassed && this.currentTest.state === 'passed';".PHP_EOL;
        $result .= "\t"."});".PHP_EOL.PHP_EOL;

        foreach ($data as $index => $step) {
            if ($step->action === 'next') {
                $step->next_name = $data->{$index+1}->name;
            }
            
            if($step->action === 'enter_pin_number'){
                $result .= "\t"."it(\"Restart screen: \",function () {".PHP_EOL;
                $result .= "\t"."\t"."driver = wd.promiseChainRemote({host: 'localhost', port: 4723});".PHP_EOL;
                // $result .= "\t"."\t"."require(\"./helpers/logging\").configure(driver);".PHP_EOL;
                $result .= "\t"."\t"."var desired = {".PHP_EOL;
                $result .= "\t"."\t"."\t"."browserName: '',".PHP_EOL;
                $result .= "\t"."\t"."\t"."platformName: '".$device['platform']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."platformVersion: '".$device['version']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."deviceName: '".$device['name']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."udid: '".$device['serial_number']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."noReset: true,".PHP_EOL;
                $result .= "\t"."\t"."\t"."autoGrantPermissions: true,".PHP_EOL;
                $result .= "\t"."\t"."\t"."appActivity: 'vn.rta.cpms.activities.SplashScreenActivity',".PHP_EOL;
                // $result .= "\t"."\t"."\t"."appWaitActivity: 'vn.rta.cpms.activities.SplashScreenActivity',".PHP_EOL;

                if($data->{$index + 1}->action === 'start_app_rtwork'){
                    $result .= "\t"."\t"."\t"."appPackage: 'vn.rta.rtwork'".PHP_EOL;
                }
                else{
                    $result .= "\t"."\t"."\t"."appPackage: 'vn.rta.rtsurvey'".PHP_EOL;
                }
                $result .= "\t"."\t"."};".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= "\t"."\t"."\t".".init(desired)".PHP_EOL;
                $result .= "\t"."\t"."\t".".setImplicitWaitTimeout(3000);".PHP_EOL;
                $result .= "\t"."});".PHP_EOL.PHP_EOL;
            }

            if($step->action === 'start_app_rtwork' && isset($step->{$index-1}->action) === FALSE){
                $result .= "\t"."it(\"Restart screen: \",function () {".PHP_EOL;
                $result .= "\t"."\t"."driver = wd.promiseChainRemote({host: 'localhost', port: 4723});".PHP_EOL;
                $result .= "\t"."\t"."var desired = {".PHP_EOL;
                $result .= "\t"."\t"."\t"."browserName: '',".PHP_EOL;
                $result .= "\t"."\t"."\t"."platformName: '".$device['platform']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."platformVersion: '".$device['version']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."deviceName: '".$device['name']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."udid: '".$device['serial_number']."',".PHP_EOL;
                $result .= "\t"."\t"."\t"."noReset: true,".PHP_EOL;
                $result .= "\t"."\t"."\t"."appActivity: 'vn.rta.cpms.activities.SplashScreenActivity',".PHP_EOL;
                $result .= "\t"."\t"."\t"."appPackage: 'vn.rta.rtwork'".PHP_EOL;
                $result .= "\t"."\t"."};".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= "\t"."\t"."\t".".init(desired)".PHP_EOL;
                $result .= "\t"."\t"."\t".".setImplicitWaitTimeout(3000);".PHP_EOL;
                $result .= "\t"."});".PHP_EOL.PHP_EOL;
            }
            $result .= $this->convertStep($step, $filename);
        }
        $result .= "});".PHP_EOL;
        return $result;
    }
     
    private function convertStep($data, $filename, $inRepeat = false)
    {
        if(!empty($data->value_insert)){
            $value = $data->value_insert;
            preg_match( '!\(([^\)]+)\)!', $data->value_insert, $match);
            if(!empty($match)){
                $input = intval($match[1]);
                $result['fileName'] = substr($value,0,strlen($value) - 6);
                $file_name = $result['fileName'];
                $post = Yii::$app->db->createCommand("SELECT * FROM input_file WHERE file_name='".$file_name."'")
                   ->queryOne();
                $value1 = json_decode($post['value'],true);
                $insert = $value1[$input] ['value'];
            }
        }
        switch ($data->action) {
            case 'enter_pin_number':
                return $this->renderEnterPinNumber($insert);

            case 'action_type':
                return $this->renderActionType($data->value_insert);

            case 'open_form':
                return $this->renderOpenForm($data->value_insert);

            case 'select_tab':
                 return $this->renderSelectTab($data->value_insert);

            case 'select_item_in_list':
                return $this->renderSelectItem($data->value_insert);

            case 'go_to_begin_form':
                return $this->renderGoToBeginForm();

            case 'sleep': 
                return $this->renderSleep($data->value_insert);

            case 'back':
                return $this->renderBack();

            case 'clear':
                return $this->renderClear();

            case 'next':
                return $this->renderNextQuestion($data->next_name);

            case 'next_screen':
                return $this->renderNextScreen();

            case 'previous':
                return $this->renderPreviousQuestion();

            case 'scroll_down':
                return $this->renderScrollDown();

            case 'scroll_up':
                return $this->renderScrollUp();

            case 'scroll_to':
                return $this->renderScrollTo($data);

            case 'click_id':
                return $this->renderClickById($data);

            case 'remove_response':
                return $this->renderRemoveResponse($data->name);

            case 'remove_value':
                return $this->renderRemoveValue($data->name);

            case strpos($data->action, 'change_language'):
                return $this->renderChangeLanguage($data->action);

            case strpos($data->action, 'test_length'):
                return $this->renderTestLength($data);

            case 'screenshot':
                return $this->renderScreenShot($filename);

            case 'getlogs':
                return $this->renderGetLogs();

            case 'save_exit_send':
                return $this->renderSaveExitSend();

            case 'save_new_send':
                return $this->renderSaveNewSend();

            case 'save_new':
                return $this->renderSaveNew();

            case 'check':
                return $this->renderCheckValue($data);

            case 'toc_screen':
                return $this->renderGoToTocScreen();

            case 'back_to':
                return $this->renderBackTo($data->name);

            case 'choose_section':
                return $this->renderChooseSection($insert);

            case 'scroll_tocscreen':
                return $this->renderScrollTocScreen($insert);

            case 'close_offline':
                return $this->renderCloseOffLine();

            case strpos($data->action, 'move_cursor'):
                return $this->renderMoveCursor($data->action);
        
            case strpos($data->action, 'convert_key_code'):
                return $this->renderInputValueCursor($data->action);

            // case 'tap_button':
            //     return $this->renderTapButton($data->name);

            case 'open_module':
                return $this->renderOpenModule($data->value_insert);

            case 'tap_download':
                return $this->renderTapDownLoad($data->value_insert);

            case 'choose_module':
                return $this->renderChooseModule($data->value_insert);

            default:
                break;
        }


        if (strpos($data->type, 'repeat') !== FALSE) {
            return $this->renderRepeat($data);
        }
        if (strpos($data->type, 'select_one') !== FALSE) {
            return SelectOne::convert($data, $inRepeat);
        }
        if (strpos($data->type, 'select_multiple') !== FALSE) {
            return SelectMultiple::convert($data, $inRepeat);
        }

        switch ($data->type) {
            case 'text':
            case 'integer':
            case 'decimal':
                return Text::convert($insert,$data, $inRepeat);

            case 'date':
                return Date::convert($data, $inRepeat);

            case 'time':
                return Time::convert($data, $inRepeat);

            case 'datetime':
                return DateTime::convert($data, $inRepeat);

            case 'barcode':
                return Barcode::convert($data, $inRepeat);

            case 'image':
                return Image::convert($data, $inRepeat);

            case 'audio':
                return Audio::convert($data, $inRepeat);

            case 'video':
                return Video::convert($data, $inRepeat);

            case 'geopoint':
                return GeoPoint::convert($data, $inRepeat);

            case 'geotrace':
                return GeoTrace::convert($data, $inRepeat);

            case 'geoshape':
                return GeoShape::convert($data, $inRepeat);

            default:
                break;
        }
        return "";
    }

    private function renderChooseModule($value)
    { 
        $result='';
        $result .="\t"."it(\"Choose ".$value."\", function () {".PHP_EOL;
        $result .="\t"."\t"."return driver".PHP_EOL;
        $result .="\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[@index=0]')".PHP_EOL;
        $result .="\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .="\t"."\t"."\t"."\t"."return el".PHP_EOL;
        $result .="\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@text, \"".$value."\")]')".PHP_EOL;
        $result .="\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
        $result .="\t"."\t"."\t"."})".PHP_EOL;
        $result .="\t"."\t"."\t".".sleep(10000)".PHP_EOL;
        $result .="\t"."});".PHP_EOL;
        return $result;
    }

    private function renderTapDownLoad($value)
    { 
        $result='';
        $result .="\t"."it(\"Tap DownLoad: \", function () {".PHP_EOL;
        $result .="\t"."\t"."return driver".PHP_EOL;
        $result .="\t"."\t"."\t".".elementByXPath('//android.widget.FrameLayout[@index=0]')".PHP_EOL;
        $result .="\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .="\t"."\t"."\t"."\t"."return el".PHP_EOL;
        $result .="\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@text, \"".$value."\")]')".PHP_EOL;
        $result .="\t"."\t"."})".PHP_EOL;
        $result .="\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
        $result .="\t"."\t".".tap()".PHP_EOL;
        $result .="\t"."});".PHP_EOL;
        return $result;
    }

   private function renderMoveCursor($position)
    { 
        $result='';
        preg_match( '!\(([^\)]+)\)!', $position, $match);      
        $pos_cursor = $match[1];
        $result .="\t"."it(\"Move cursor: \", function () {".PHP_EOL;
        $result .="\t"."\t"."return driver".PHP_EOL;
        $result .="\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;
        $result .="\t"."\t"."\t".".pressDeviceKey(19)".PHP_EOL;
        for( $i = 1; $i < $pos_cursor ;  $i++){
            if($pos_cursor==1){
                break;
            }else{
                $result .="\t"."\t"."\t".".pressDeviceKey(22)".PHP_EOL;
            }
        }  
        $result .="\t"."\t"."})".PHP_EOL;
        return $result;
    }

    private function renderInputValueCursor($value)
    { 
        preg_match( '!\(([^\)]+)\)!', $value, $match);      
        $input = $match[1];
        $arrayChar = str_split($input); 

        $convertKey = Math::getKeycode($value);
        $result=""; 
        $result .="\t"."it(\"Input cursor: \", function () {".PHP_EOL;
        $result .="\t"."\t"."return driver".PHP_EOL;
        $result .="\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;

        for ( $i = 0; $i < sizeof($arrayChar) ; $i++){
            for ($i = 0; $i < sizeof($arrayChar); $i++){
                if(strval($arrayChar[$i]) >= 'A' && strval($arrayChar[$i] <= 'Z')){
                    $result .="\t"."\t"."\t".".pressDeviceKey(".$convertKey[$i].", 1)".PHP_EOL; 
                }else{
                    $result .="\t"."\t"."\t".".pressDeviceKey(".$convertKey[$i].")".PHP_EOL; 
                }
            }
            $result .= "\t"."\t"."\t".".sleep(2000)".PHP_EOL;
            $result .="\t"."\t"."}) ".PHP_EOL;
            return $result; 
        }      
    }

    private function renderGoToTocScreen()
    {
        return  "\t"."it(\"Go to TOC screen: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('Go To Prompt')".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."\t"."\t".".sleep(5000)".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderBackTo($value)
    {
         return  "\t"."it(\"Back to screen: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('Navigate up')".PHP_EOL.
                "\t"."\t"."\t".".click();".PHP_EOL.
                "\t"."\t"."\t".".scrollTo('//*[@content-desc='".$value."']')".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderChooseSection($value)
    {
        return  "\t"."it(\"Choose Section: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".scrollTo('//androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[".$value."]')".PHP_EOL.
                "\t"."\t"."\t".".tap()".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderScrollTocScreen($value)
    {
        return  "\t"."it(\"Scroll To On Toc Screen: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t".".scrollTo('//android.widget.TextView[contains(@text, \"".$value."\")]')".PHP_EOL.
                "\t"."\t".".tap()".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

     private function renderCloseOffLine()
    {
        return "\t"."it(\"Close off line: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('btn_close')".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."\t"."\t".".sleep(15000)".PHP_EOL.
                "\t"."})".PHP_EOL;
    }
    
   private function renderCheckValue($data)
    {
       $parameter = $data->expected_results;

        preg_match( '!\(([^\)]+)\)!', $parameter, $match);
        $output = intval($match[1]);
        $result['fileName'] = substr($parameter,0,strlen($parameter) - 6);
        $file_name = $result['fileName'];
        $post = Yii::$app->db->createCommand("SELECT * FROM output_file WHERE file_name='".$file_name."'")
           ->queryOne();
        $value = json_decode($post['value'],true);
        $output = $value[$output] ['value'];

        ////DATE
        $datetime  = date('Y-m-d H:i:s');
        $count = Yii::$app->db->createCommand("SELECT COUNT(*) FROM result")
           ->queryOne();
        //convert name from array to string
        $name_string = json_encode($count['COUNT(*)']);
        $name = substr($name_string, 1, strlen($name_string) - 2);
        
        return  
                "\t"."it(\"Screen shot: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".takeScreenshot().then(function (png) {".PHP_EOL.
                "\t"."\t"."\t"."var stream = fs.createWriteStream(Date.now() + \".png\");".PHP_EOL.
                "\t"."\t"."\t"."stream.write(Buffer.from(png, 'base64'));".PHP_EOL.
                "\t"."\t"."\t"."stream.end();".PHP_EOL.
                "\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL.
                
                "\t"."it(\"Get Logs: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".log('server').then(function (txt) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."let log = JSON.stringify(txt);".PHP_EOL.
                "\t"."\t"."\t"."\t"."let stream = fs.createWriteStream(Date.now() + \".txt\");".PHP_EOL.
                "\t"."\t"."\t"."\t"."stream.write(log);".PHP_EOL.
                "\t"."\t"."\t"."\t"."stream.end();".PHP_EOL.
                "\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL.

                "\t"."it(\"Test output: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL.
                "\t"."\t"."\t".".then((el) => {".PHP_EOL.
                "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL.
                "\t"."\t"."\t"."\t".".sleep(5000)".PHP_EOL.
                "\t"."\t"."\t"."\t".".getAttribute('text')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function(result) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."let screenname = Date.now();".PHP_EOL.
                "\t"."\t"."\t"."\t"."let logsname = Date.now();".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."let boolean = '0';".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."if(result == '".$output."')".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."boolean = '1';".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."con.connect(function(err) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."if (err) throw err;".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."console.log('Connected!');".PHP_EOL.
                "\t"."\t"."\t"."\t"."let sql 
                          = \"INSERT INTO result (expected_result, actual_result, log, image, time, result)  VALUES ('".$output."', \"+ 
                          result +\",  \"+ logsname +\", \"+ screenname +\", '".$datetime."', \"+ boolean +\")\";".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."con.query(sql, function (err, result) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."if (err) throw err;".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."console.log('1 record inserted');".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."con.end();".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."});".PHP_EOL.
                "\t"."\t"."\t"."\t"."}) ".PHP_EOL.
                "\t"."\t"."\t"."}) ".PHP_EOL.
                "\t"."\t"."}) ".PHP_EOL.
                "\t"."\t".".sleep(5000)".PHP_EOL.
                "\t"."\t".".quit();".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderEnterPinNumber($number)
    {
        return  "\t"."it(\"Enter pin number\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/pin_input')".PHP_EOL.
                "\t"."\t"."\t".".setImmediateValue('".$number."')".PHP_EOL.
                "\t"."\t"."\t".".sleep(5000);".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    public function renderScreenShot($filename)
    {
        return  "\t"."it(\"Screen shot: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".sleep(5000)".PHP_EOL.
                "\t"."\t"."\t".".takeScreenshot().then(function (png) {".PHP_EOL.
                "\t"."\t"."\t"."var stream = fs.createWriteStream(\"../../web/".$filename."/\" + Date.now() + \".png\");".PHP_EOL.
                "\t"."\t"."\t"."stream.write(Buffer.from(png, 'base64'));".PHP_EOL.
                "\t"."\t"."\t"."stream.end();".PHP_EOL.
                "\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    public function renderGetLogs()
    {
        return  "\t"."it(\"Get Logs: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".log('server').then(function (txt) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."let log = JSON.stringify(txt);".PHP_EOL.
                "\t"."\t"."\t"."\t"."let stream = fs.createWriteStream(Date.now() + \".txt\");".PHP_EOL.
                "\t"."\t"."\t"."\t"."stream.write(log);".PHP_EOL.
                "\t"."\t"."\t"."\t"."stream.end();".PHP_EOL.
                "\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderSaveExitSend()
    {
        return  "\t"."it(\"Save Finalized Exit Send: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/questionholder')".PHP_EOL.
                "\t"."\t"."\t".".flick(-500, 1, 500)".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('se5')".PHP_EOL.
                "\t"."\t"."\t".".should.eventually.exist".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."});".PHP_EOL;

    }

    private function renderSaveNewSend()
    {
        return  "\t"."it(\"Save Finalized New Send: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/questionholder')".PHP_EOL.
                "\t"."\t"."\t".".flick(-500, 1, 500)".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('se6')".PHP_EOL.
                "\t"."\t"."\t".".should.eventually.exist".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."});".PHP_EOL;

    }

    private function renderSaveNew()
    {
        return  "\t"."it(\"Finalize, submit and start new: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('save_new')".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."});".PHP_EOL;
    }


    private function renderRemoveResponse($value)
    {
        return  "\t"."it(\"Remove Response: \", function () {".PHP_EOL.
                 "\t"."\t"."return driver".PHP_EOL.
                 "\t"."\t"."\t".".elementByAccessibilityId('".$value."')".PHP_EOL.
                 "\t"."\t"."\t".".then((el) => {".PHP_EOL.
                 "\t"."\t"."\t"."\t"."let action = new wd.TouchAction(driver);".PHP_EOL.
                 "\t"."\t"."\t"."\t"."action.longPress({el});".PHP_EOL.
                 "\t"."\t"."\t"."\t"."action.perform();".PHP_EOL.
                 "\t"."\t"."\t"."\t"."action.release();".PHP_EOL.
                 "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".sleep(2000)".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".elementById('btn_rm_response')".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".elementById('btn_positive')".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL.
                 "\t"."\t"."});".PHP_EOL.
                 "\t"."});".PHP_EOL;
    }
    private function renderRemoveValue($value)
    {
        return  "\t"."it(\"Remove all value: \", function () {".PHP_EOL.
                 "\t"."\t"."return driver".PHP_EOL.
                 "\t"."\t"."\t".".elementByAccessibilityId('".$value."')".PHP_EOL.
                 "\t"."\t"."\t".".then((el) => {".PHP_EOL.
                 "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                 "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL.
                  "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL.
                  "\t"."\t"."\t"."\t"."\t".".sleep(1000)".PHP_EOL.
                  "\t"."\t"."\t"."\t"."\t".".elementById('button1')".PHP_EOL.
                  "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL.
                  "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL.
                 "\t"."});".PHP_EOL;
    }
    private function renderChangeLanguage($value)
    {
        $result = "";     
            $result .="\t"."it(\"Change Language\", function () {".PHP_EOL;
            $result .="\t"."\t"."return driver".PHP_EOL;
            $result .="\t"."\t"."\t".".elementByAccessibilityId('Navigate up')".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".elementById(\"btn_ignore\")".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
             $result .="\t"."\t"."\t".".elementByAccessibilityId('Navigate up')".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".elementById(\"btn_staff_info\")".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".elementById(\"overflow_menu\")".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".elementById(\"title\")".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".elementById(\"action_setting_language\")".PHP_EOL;
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            if(strpos($value, '1'))
            {
                $result .="\t"."\t"."\t".".elementByXPath('//android.widget.RadioGroup//android.widget.RadioButton[1]')".PHP_EOL;
            }
            else    
            {
                $result .="\t"."\t"."\t".".elementByXPath('//android.widget.RadioGroup//android.widget.RadioButton[2]')".PHP_EOL;
            }
            $result .="\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t".".sleep(1000)".PHP_EOL;
            $result .="\t"."\t"."\t".".finally(function() {".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."return driver".PHP_EOL;
            $result .="\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/pin_input')".PHP_EOL;
            $result .="\t"."\t"."\t"."\t".".sleep(3000)".PHP_EOL;
            $result .="\t"."\t"."\t"."\t".".setImmediateValue('1234')".PHP_EOL;
            $result .="\t"."\t"."\t"."\t".".sleep(5000);".PHP_EOL;
            $result .="\t"."\t"."\t"."})".PHP_EOL;
            $result .="\t"."\t"."\t".".catch(function(){".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."return driver".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".elementById(\"btn_cancel\")".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('Navigate up')".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('Navigate up')".PHP_EOL;
            $result .="\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .="\t"."\t"."\t"."})".PHP_EOL;
            $result .="\t"."\t"."});".PHP_EOL;
            return $result;
    }

    private function renderTestLength($value)
    { 
        preg_match( '!\(([^\)]+)\)!', $value->action, $match);
        return  "\t"."it(\"Test length: \", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('".$value->name."')".PHP_EOL.
                "\t"."\t"."\t".".then((el) => {".PHP_EOL.
                "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL.
                "\t"."\t"."\t"."\t".".sleep(5000)".PHP_EOL.
                "\t"."\t"."\t"."\t".".getAttribute('text')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function(result) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."if(result.length == ".$match[1]."){".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."}".PHP_EOL.
                "\t"."\t"."\t"."}) ".PHP_EOL.
                "\t"."\t"."}) ".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderActionType($value)
    {
        $desc = "Fill new form";
        if ($value === 'form_review') {
            $desc = "Review form";
        } elseif ($value === 'form_edit') {
            $desc = "Edit form";
        }
        return  "\t"."it(\"".$desc."\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId(\"menu_item_".$value."\")".PHP_EOL.
                "\t"."\t"."\t".".tap();".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderOpenForm($value)
    {
        return  "\t"."it(\"Open form\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@text, \"".$value."\")]')".PHP_EOL.
                "\t"."\t"."\t".".catch(function(){".PHP_EOL.
                "\t"."\t"."\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/recycler')".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".getLocation()".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".then(function (loc) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."var action = new wd.TouchAction();".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."action".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."\t".".press({x: loc.x, y: loc.y + 1000})".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."\t".".wait(1000)".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."\t".".moveTo({x: loc.x, y: loc.y})".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."\t".".release();".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."\t"."return driver.performTouchAction(action).sleep(1000)".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@text, \"".$value."\")]')".PHP_EOL.
                "\t"."\t"."\t"."})".PHP_EOL.
                "\t"."\t"."\t".".tap()".PHP_EOL.
                "\t"."\t"."\t".".sleep(10000);".PHP_EOL.
                "\t"."});".PHP_EOL;
    }
    private function renderOpenModule($value)
    {
        $result=""; 
        $result .="\t"."it(\"Open module ".$value."\", function () {".PHP_EOL;
        $result .="\t"."\t"."return driver".PHP_EOL;
        switch ($value) {
            case strpos($value,'HR FOR EVERYONE'):
                $value='t72ev';
                break;
            case strpos($value,'Performance Appraisal'):
                $value='8p1i1';
                break;
            case strpos($value,'Q.LÝ TÀI NGUYÊN'):
                $value='rscmnt';
                break;
            case strpos($value,'TEAM BUILDING'):
                $value='teambld';
                break;
            case strpos($value,'Team Building'):
                $value='k1szc';
                break;
            case strpos($value,'Quản Lý Khách Hàng'):
                $value='lh42c';
                break;
            case strpos($value,'ISSUE MANAGEMENT'):
                $value='2gh32';
                break;
            case strpos($value,'APP LEARNING'):
                $value='gqky6';
                break;
            case strpos($value,'QUẢN TRỊ GIAO VIỆC'):
                $value='7sp4e';
                break;
            case strpos($value,'MEL MANAGER'):
                $value='melen';
                break;
            default:
                break;
        }
        $result .= "\t"."\t"."\t".".sleep(5000)".PHP_EOL;
        $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$value."')".PHP_EOL; 
        $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath(\"//android.widget.ImageView[contains(@resource-id,'vn.rta.rtwork:id/launch_button')]\")".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;       
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;    
        return $result;                
    }

    private function renderSelectTab($number)
    {
        return  "\t"."it(\"Select tab\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/tabLayout')".PHP_EOL.
                "\t"."\t"."\t".".catch(function(){".PHP_EOL.
                "\t"."\t"."\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/tabLayout')".PHP_EOL.
                "\t"."\t"."\t"."})".PHP_EOL.
                "\t"."\t"."\t".".then(function (el) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementsByClassName('android.widget.TextView')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."return els[".$number."].tap();".PHP_EOL.
                "\t"."\t"."\t"."\t"."});".PHP_EOL.
                "\t"."\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderSelectItem($number)
    {
        return  "\t"."it(\"Select item in list\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('android:id/list')".PHP_EOL.
                "\t"."\t"."\t".".then(function (el) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."return el".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementsByClassName('android.widget.FrameLayout')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."return els[".$number."].tap();".PHP_EOL.
                "\t"."\t"."\t"."\t"."});".PHP_EOL.
                "\t"."\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderGoToBeginForm()
    {
        return  "\t"."it(\"Go to begin form\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/beginForm')".PHP_EOL.
                "\t"."\t"."\t".".tap()".PHP_EOL.
                "\t"."\t"."\t".".catch(function () {".PHP_EOL.
                "\t"."\t"."\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementByClassName('android.support.v7.widget.LinearLayoutCompat')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function (el) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."return el.elementByClassName('android.widget.ImageView').tap()".PHP_EOL.
                "\t"."\t"."\t"."\t"."})".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementByClassName('android.widget.ListView')".PHP_EOL.
                "\t"."\t"."\t"."\t".".then(function (el) {".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t"."return el.elementByClassName('android.widget.TextView').tap()".PHP_EOL.
                "\t"."\t"."\t"."\t"."})".PHP_EOL.
                "\t"."\t"."\t"."\t".".sleep(3000)".PHP_EOL.
                "\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/beginForm')".PHP_EOL.
                "\t"."\t"."\t"."\t".".tap()".PHP_EOL.
                "\t"."\t"."\t"."});".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderSleep($seconds)
    {
        return  "\t"."it(\"Sleep ".$seconds."s\", function () {".PHP_EOL.
                "\t"."\t"."return driver.sleep(".(intval($seconds)*1000).");".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderBack()
    {
        return  "\t"."it(\"Back\", function () {".PHP_EOL.
                "\t"."\t"."return driver.back();".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderClear()
    {
        return  "\t"."it(\"Clear\", function () {".PHP_EOL.
                "\t"."\t"."return driver.clear();".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderClickById($data)
    {
        return  "\t"."it(\"".$data->name."\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('".$data->value_insert."')".PHP_EOL.
                "\t"."\t"."\t".".tap();".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderNextQuestion($accessibilityId)
    {
        return  "\t"."it(\"Next Question\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/questionholder')".PHP_EOL.
                "\t"."\t"."\t".".flick(-500, 1, 500)".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('".$accessibilityId."')".PHP_EOL.
                "\t"."\t"."\t".".should.eventually.exist".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

     private function renderNextScreen()
    {
        return  "\t"."it(\"Next Question\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementByAccessibilityId('Next')".PHP_EOL.
                "\t"."\t"."\t".".click()".PHP_EOL.
                "\t"."\t"."\t".".catch(function(){".PHP_EOL.
                "\t"."\t"."\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/questionholder')".PHP_EOL.
                "\t"."\t"."\t"."\t"."\t".".flick(-500, 1, 500)".PHP_EOL.
                "\t"."\t"."\t"."})".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderPreviousQuestion()
    {
        return  "\t"."it(\"Previous Question\", function () {".PHP_EOL.
                "\t"."\t"."return driver".PHP_EOL.
                "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/questionholder')".PHP_EOL.
                "\t"."\t"."\t".".flick(500, 1, 500);".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderScrollDown()
    {
        return  "\t"."it(\"Scroll Down\", function () {".PHP_EOL.
                "\t"."\t"."return driver.scrollDown()".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderScrollUp()
    {
        return  "\t"."it(\"Scroll Up\", function () {".PHP_EOL.
                "\t"."\t"."return driver.scrollUp()".PHP_EOL.
                "\t"."});".PHP_EOL;
    }

    private function renderScrollTo($data)
    {
        $result = '';
        $element = '';

        switch ($data->appearance) {
            case 'star_rating':
                $element = '//android.widget.RatingBar';
                break;
            case 'minimal':
                $element = '//android.widget.LinearLayout[2]//android.widget.TextView';
                break;
            case 'compact':
                $element = '//android.widget.LinearLayout[2]//android.widget.GridView';
                break;
            case 'compact-5':
                $element = '//android.widget.LinearLayout[2]//android.widget.GridView';
                break;
            case 'rating_box':
                $element = '//android.widget.GridView//android.widget.TextView';
                break;
            case 'tagging':
            case 'boxtag':
                $element = '//android.widget.LinearLayout[2]//android.widget.TextView';
                break;
            case 'tagging-choices-noshow':
            case 'boxtag-choices-noshow':
                $element = '//android.widget.MultiAutoCompleteTextView';
                break;

            case 'tagging-choices-noshow-v2':
            case 'boxtag-choices-noshow-v2':
                $element = '//android.widget.EditText';
                break;
            default:
                break;
        }

       
        if((strpos($data->type,'audio')!== FALSE) && (strpos($data->name,'a5')!== FALSE)){
            $element = '//android.widget.LinearLayout[2]';
        }

        $result .= "\t"."it(\"Scroll To Specific Question\", function () {".PHP_EOL;
        if(strpos($data->value_insert,'HR FOR EVERYONE')!== FALSE) {
            $element = '//android.widget.ImageView[contains(@resource-id,"vn.rta.rtwork:id/launch_button")';
            $data->name = 't72ev';
        }
        $result .= "\t"."\t"."return driver.scrollTo('//*[@content-desc=\"".$data->name."\"]".$element."');".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }

    private function renderRepeat($data)
    {
        $result = '';
        for ($i=0; $i < $data->value_insert; $i++) {
            $result .= "\t"."it(\"Add new task ".($i+1)."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('rta_addrp_bttn')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.TextView')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            if (!empty($data->data)) {
                foreach ($data->data as $step) {
                    $obj = clone $step;
                    $obj->value_insert = Math::getValue($obj->value_insert);
                    $result .= $this->convertStep($obj, true, $filename);
                    if (property_exists($step, 'action_1') && !empty($step->action_1)) {
                        $obj->action = $step->action_1;
                        $result .= $this->convertStep($obj, true, $filename);
                    }
                }
            }
        }
        return $result;
    }

   public function xlsx2json($filePath)
    {
        $result = [];
        // read file
        $reader = IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(TRUE);
        $spreadsheet = $reader->load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();

        $highestRow = $worksheet->getHighestRow();
        $highestColumn = 'A';

        // get row the first
        foreach ($worksheet->getRowIterator(2,1) as $row) {          
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(TRUE);
            $schema = [];

            foreach ($cellIterator as $cell) {        
                $highestColumn = $cell->getColumn();
                $cellValue = $cell->getValue();

                if (strpos($cellValue, 'autoQC') !== FALSE) {
                    $schema[substr(trim($cellValue), 7)] = $cell->getColumn(); 
                    //insert into $schema ... 'value_insert' => AL.......... 
                    } 
            }
             
        }    
      
        $range = $schema['type'] . '1:' . $highestColumn.$highestRow;
        
        
        // $columnID . $startRow . ':' . $columnID . $endRow;
        // X1:AA410
        // read X, Y, Z  
        //$range= AL1:AR743
        $dataArray = $worksheet->rangeToArray($range, NULL, TRUE, TRUE, TRUE);
        

        $repeat = false;
        $repeatData = [];
        foreach ($dataArray as $key => $value) {
            // row title or action column is empty
            if ($key === 2 || empty($value[$schema['action']])) {
                continue;
            }
            $data = [];
            $type = $worksheet->getCell('H'.$key)->getValue();
            foreach ($schema as $name => $col) {
                if ($name === 'appearance') {
                    $data[$name] = $this->getAppearance($worksheet->getCell($col.$key)->getFormattedValue(), $type);
                   
                } else {
                    $data[$name] = $worksheet->getCell($col.$key)->getFormattedValue();
                }
            }
            if ( $type === 'begin repeat') {
                $repeat = true;
                $repeatData = $data;
                continue;
            } elseif ( $type === 'end repeat') {
                $repeat = false;
                $result[] = $repeatData;
                $repeatData = [];
                continue;
            }
            if ($repeat) {
                $repeatData['data'][] = $data;
                continue;
            }
            $result[] = $data;
        }
        // setting sheet
        $settingSheet = $spreadsheet->getSheetByName('settings');
        $result['formId'] = $spreadsheet->getSheetNames();
        /*echo '<pre/>';
        print_r($result);
        die();*/

        return json_encode($result);
    }


    public function readFile($filePath)
    {
         $result = [];
        // read file
        $reader = IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(TRUE);
        $spreadsheet = $reader->load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();

        $highestRow = $worksheet->getHighestRow();
        $highestColumn = 'A';

        // get row the first
        foreach ($worksheet->getRowIterator(1, 1) as $row) {          
            $cellIterator = $row->getCellIterator();
            
            $cellIterator->setIterateOnlyExistingCells(TRUE);
            $schema = [
                'id' => 'A',
                'value' => 'B'
            ];
        }        
        $range = $schema['id'] . '1:' . $highestColumn.$highestRow;
        $dataArray = $worksheet->rangeToArray($range, NULL, TRUE, TRUE, TRUE);
        $repeat = false;
        $repeatData = [];
        foreach ($dataArray as $key => $value) {
            $data = [];
            $type = $worksheet->getCell('A'.$key)->getValue();
            foreach ($schema as $name => $col) {
                $data[$name] = $worksheet->getCell($col.$key)->getFormattedValue();
            }
           
            $result[] = $data;
        }

        // setting sheet
        $settingSheet = $spreadsheet->getSheetByName('settings');
        $result['formId'] = $spreadsheet->getSheetNames();
        return json_encode($result);
    }


   
    private function getAppearance($str, $type)
    {
        $appearances = [
            // Text
            'selection_one_show',
            'selection_one_hide',
            'textpopup',
            'verify-email',
            // Text - search autocomplete
            'search-autocomplete-noedit-v2-join-dbs',
            'search-autocomplete-noedit-join-dbs',
            'search-autocomplete-noedit-v2',
            'search-autocomplete-noedit',
            'search-autocomplete',
            'slider_rating',
            'digisep',
            // Select One, Select Multiple
            'boxtag-choices-noshow-v2',
            'boxtag-choices-noshow',
            'boxtag',
            'tagging-choices-noshow-v2',
            'tagging-choices-noshow',
            'tagging',
            'minimal',
            'compact',
            'rating_box',
            'star_rating',
            'quick',
            // image
            'draw',
            'signature-inline',
            'signature',
            // date, time
            'inline-1line',
            'inline',
            'toc-hide'
        ];
        // geopoint
        if (strpos($str, 'inline') !== FALSE && strpos($str, 'nomap') !== FALSE) {
            return 'inline-nomap';
        }
        // audio, video, barcode
        if ($type === 'audio' || $type === 'video' || $type === 'barcode') {
            return trim($str);
        }
        foreach ($appearances as $value) {
            if (strpos($str, $value) !== FALSE) {
                return $value;
            }
        }
        return trim($str);
    }
}