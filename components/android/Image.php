<?php

namespace app\components\android;

class Image
{
    public static function convert($data, $inRepeat=false)
    {
        $result  = '';
        $result .= "\t"."it(\"".$data->name."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
         if($data->appearance === 'back_camera' || $data->appearance === 'front_camera' || $data->appearance === 'font-camera' || $data->appearance === 'signature' || $data->appearance === 'draw' || $data->appearance === 'annotate' || $data->appearance === 'annotate front_camera' || $data->appearance === 'annotate font-camera' || $data->appearance === 'annotate back_camera' || $data->appearance === 'text-nolabel'){
            $result .= "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$data->name."\"]//android.widget.LinearLayout[2]//android.widget.Button')".PHP_EOL;
        } else{
            $result .= "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$data->name."\"]//android.widget.LinearLayout//android.widget.ImageButton')".PHP_EOL;
        }
        if ($inRepeat) {
            $result .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
        } else {
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }
        if ($data->appearance === 'signature-inline' || $data->appearance === 'inline') {
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
        } else {  
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
        }
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".sleep(3000)".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."\t"."\t".".sleep(3000)".PHP_EOL;
        if ($data->appearance === 'signature' || $data->appearance === 'signature-inline' || $data->appearance === 'draw') {
            $result .= "\t"."\t"."\t".".draw()".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/fab_actions')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/fab_save_and_close')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
        } else {
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/take_photo')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
        }
        $result .= "\t"."\t"."\t".".sleep(500)".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }
}