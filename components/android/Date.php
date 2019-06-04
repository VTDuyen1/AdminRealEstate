<?php

namespace app\components\android;

class Date
{
    public static function convert($data, $inRepeat=false)
    {
        // value_insert format: yyyy-mm-dd
        $result = '';
        $dateFormat = strtr($data->value_insert, '/', '-');
        $dateStrVal = strtotime($dateFormat);
        if(!empty($dateStrVal)){
        $year   = date("Y", strtotime($dateFormat));
        $element = '';
        if ($inRepeat) {
            $element .= "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return els[els.length - 1]".PHP_EOL;
        } else {
            $element .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $element .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $element .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
        }

        // inline-1line
        $description = $data->name . " : " . $data->value_insert;
        if (strpos($data->appearance, 'inline-1line') !== FALSE) {
            $day     = date("d", strtotime($dateFormat)); // 07, 23
            $monthM  = date("M", strtotime($dateFormat)); // Dec
            //get 1 number 01,02,03...=1,2,3
            if($day < 10){
                $day = substr($day, -1);  
            }
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/month_container')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;

            switch ($data->appearance) {
            case 'inline-1line':
                // month
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$monthM."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                // day
                if ($day > 24) {
                    $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=20]')".PHP_EOL;
                    $result .= "\t"."\t"."\t"."\t"."\t".".flick(1, -200, 200)".PHP_EOL;
                }
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/date_container')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;

                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$day."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                // year
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/year_container')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$year."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                 break;

            case 'inline-1line year':
                 // year
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$year."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;

                 break;
            case 'inline-1line month-year':
                // month
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$monthM."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                // year
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.TextView[@text=\'".$year."\']')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;

                 break;
             }
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // inline
        if ($data->appearance === 'inline') {
            $id      = date("d F Y", strtotime($dateFormat));
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.ImageButton')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            // year
            if (date("Y") !== $year) {
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/date_picker_year')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('".$year."')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.scrollYear.bind(this, driver, '".$year."'))".PHP_EOL;
            }
            // day, month
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('".$id."')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.scrollMonth.bind(this, driver, '".$id."'))".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/ok')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // toc-hide, no appearence
        $id      = date("d F Y", strtotime($dateFormat));
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        $result .= $element;
        $result .= "\t"."\t"."\t"."\t"."\t".".sleep(10000)".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('".$id."')".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
          $result .= "\t"."\t"."\t"."\t"."\t".".sleep(10000)".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.findMonth.bind(this, driver, '".$id."'))".PHP_EOL;
         $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
          $result .= "\t"."\t"."\t"."\t"."\t".".sleep(10000)".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
        }
    }
}