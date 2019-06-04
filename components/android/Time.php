<?php

namespace app\components\android;

class Time
{
    public static function convert($data, $inRepeat=false)
    {
        $result  = '';
        $keyScroll = 18;
        $arrTime = explode(':', $data->value_insert);
        if(!is_null($arrTime)){
            $hours   = intval($arrTime[0]);
            $minute  = intval($arrTime[1]);
        }
        // inline-1line
        $description = $data->name . " : " . $data->value_insert;
        if ($data->appearance === 'inline-1line') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[contains(@resource-id,\'hour_display\')]')".PHP_EOL;
            $result .= "\t"."\t"."\t".".text().should.become('".$hours."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(dateTime.changeTime.bind(this, driver, '".$data->name."', 'hour', '".$hours."'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[contains(@resource-id, \'min_display\')]')".PHP_EOL;
            $result .= "\t"."\t"."\t".".text().should.become('".$minute."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(dateTime.changeTime.bind(this, driver, '".$data->name."', 'min', '".$minute."'))".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // inline
        if ($data->appearance === 'inline') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            if ($inRepeat) {
                $result .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
                $result .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
            } else {
                $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
                $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            }
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton').tap().sleep(1000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/tvconfirm').tap().sleep(5000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // toc-hide, no appearence
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        $result .= "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$keyScroll."\"]')".PHP_EOL;
        $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[@resource-id=\'android:id/radial_picker\']')".PHP_EOL;
        $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."return el.elementByAccessibilityId('".$hours."').tap().sleep(10000)".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."\t"."\t".".sleep(10000)".PHP_EOL;
        $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[@resource-id=\'android:id/radial_picker\']')".PHP_EOL;
        $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."return el.elementByAccessibilityId('".$minute."').tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }
}