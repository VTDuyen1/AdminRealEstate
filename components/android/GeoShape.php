<?php

namespace app\components\android;

class GeoShape
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
            
            if (empty($data->appearance) || $data->appearance === 'text-nolabel' || $data->appearance === 'toc-hide') {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
            } else {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
            }
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".sleep(5000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('save')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(5000)".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
    }
}