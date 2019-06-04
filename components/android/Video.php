<?php

namespace app\components\android;

class Video
{
    public static function convert($data, $inRepeat=false)
    {
        $result = '';
        $element = '';  
        $valueInsert = Math::getValue($data->value_insert);
        $value = intval($valueInsert)*1000;
        $description = $data->name . " : " . $valueInsert;
        $input=$data->action;
        $input1=$data->action;

        $record_video=strpos($input, 'record_video');
        $play_video=strpos($input, 'play_video');
        $record_video_flash=strpos($input, 'record_video_flash');
        $tap_flip_camera=strpos($input, 'tap_flip_camera');
        $choose_video=strpos($input, 'choose_video');
        $upload_video=strpos($input, 'upload_video');
        $tap_icon_remove=strpos($input, 'tap_icon_remove');
        $tap_record_icon=strpos($input, 'tap_record_icon');
        $tap_rectangle_icon=strpos($input, 'tap_rectangle_icon');
        $tap_record_flash=strpos($input, 'tap_record_flash');

        if ($inRepeat) {
            $element .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
        } 
        if ($upload_video !== FALSE){
            $element .= "\t"."\t"."\t".".elementByClassName('android.widget.LinearLayout')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }
        else {
            $element .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        $result .= $element;
        if (strpos($data->appearance, 'inline') !== FALSE) {
           
            if($tap_rectangle_icon!== FALSE){
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout//android.widget.ImageButton[@index=1]')".PHP_EOL;
            }
            else{
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
            }
        } 
        
       else{
        switch ($data->action) {
            case 'record_video':
            case 'record_video_flash':
            case 'tap_flip_camera':
            case 'tap_icon_remove':
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[@index=1]//android.widget.Button[@text=\"Record Video\"]')".PHP_EOL;
                
            case 'choose_video':
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[@index=1]//android.widget.Button[@text=\"Choose Video\"]')".PHP_EOL;
                
            case 'play_video':
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[@index=1]//android.widget.Button[@text=\"Play Video\"]')".PHP_EOL;
                
            case 'upload_video':
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageView')".PHP_EOL;
                break;
            default:
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[@index=1]//android.widget.Button[@index=0]')".PHP_EOL;
                
            }
        }
        
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;

        $result .= "\t"."\t"."\t".".sleep(3000)".PHP_EOL;
        if (strpos($data->appearance, 'auto-start-recording') === FALSE || ) {
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;

        if ($play_video !== FALSE||$choose_video !== FALSE||$upload_video !== FALSE||$tap_rectangle_icon !== FALSE) {
            $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;
        }
        
        else{
            switch ($data->action) {
                case 'record_video_flash':
                case 'tap_record_flash':
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_flash')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    break; 
                   
                case 'tap_flip_camera':
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/switch_camera')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    break;  
                case 'tap_icon_remove':
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_x')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    break; 
                case strpos($data->appearance, 'auto-start-recording'):
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                    break; 
                
                default:
                    break;
            }
        }
       
        if (preg_match('!end-stop-([^\)]+)s!', $data->appearance, $match) && (empty($valueInsert) || (intval($valueInsert) >= intval($match[1])))) {
            $value = (intval($match[1]) + 3) * 1000;
            $result .= "\t"."\t"."\t".".sleep(".$value.")".PHP_EOL;
        }
        if ($play_video !== FALSE||$choose_video !== FALSE||$upload_video !== FALSE||$tap_icon_remove !== FALSE||$tap_rectangle_icon !== FALSE) {
            $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;      
        }
        else {
            $result .= "\t"."\t"."\t".".sleep(5000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(".$value.")".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
           
        }
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }
}
