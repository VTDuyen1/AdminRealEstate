<?php

namespace app\components\android;

class GeoPoint
{
    public static function convert($data, $inRepeat=false)
    {
        $result = '';
        $result .= "\t"."it(\"".$data->name."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        // check if in repeat
        if ($inRepeat) {
            $result .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
        } else {
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }
        if($data->action === 'type'){
            if (empty($data->appearance) || $data->appearance === 'toc-hide' || $data->appearance === 'text-nolabel') {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
            } else {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
            }
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".sleep(5000)".PHP_EOL;
            if ($data->appearance === 'inline-nomap') {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('android:id/button1')".PHP_EOL;
            } else {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/accept_location')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".catch(function(){".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return driver".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/accept_location')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;                                
            }
            $result .= "\t"."\t"."\t"."\t"."\t".".tap();".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
    }
}