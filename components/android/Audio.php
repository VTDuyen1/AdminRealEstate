<?php

namespace app\components\android;

class Audio
{
    public static function convert($data, $inRepeat=false)
    {
        $result = '';
        $element = '';
        $valueInsert = Math::getValue($data->value_insert);
        $value = intval($valueInsert)*1000;
        $description = $data->name . " : " . $valueInsert;
        if ($inRepeat) {
            $element .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
        } else {
            $element .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        $result .= $element;
        if (strpos($data->appearance, 'inline') !== FALSE) {
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
        } else {
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
        }
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        if (preg_match('!end-stop-([^\)]+)s!', $data->appearance, $match) && (empty($valueInsert) || (intval($valueInsert) >= intval($match[1])))) {
            $value = (intval($match[1]) + 1) * 1000;
            $result .= "\t"."\t"."\t".".sleep(".$value.")".PHP_EOL;
        } else {
            $result .= "\t"."\t"."\t".".sleep(".$value.")".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/button_capture_audio_finish')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;
        }
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }
}