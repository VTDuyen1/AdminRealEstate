<?php

namespace app\components\android;

use Yii;

class DateTime
{
    public static function convert($data, $inRepeat=false)
    {
         preg_match( '!\(([^\)]+)\)!', $data->value_insert, $match);
        //get $match[1]
        $input = intval($match[1]);
        $inputFile['fileName'] = substr($data->value_insert,0,strlen($data->value_insert) - 6); 

        $file_name = $inputFile['fileName'];

         $post = Yii::$app->db->createCommand("SELECT * FROM input_file WHERE file_name='".$file_name."'")
           ->queryOne();
        
        $jsonValue = json_decode($post['value'],true);
        $value = $jsonValue[$input] ['value'];

       


        // value_insert format: yyyy-mm-dd hh:mm
        $result = '';
        $keyScroll = 18;
        $scroll = "month_display";
        $dateFormat = strtr($value, '/', '-');
        $dateStrVal = strtotime($dateFormat);
        if(!empty($dateStrVal)){
        $year   = date("Y", strtotime($dateFormat)); // 1993
        $hour   = date("G", strtotime($dateFormat)); // 0 - 23
        $minute = date("i", strtotime($dateFormat)); // 00 - 59
        
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
        $description = $data->name . " : " . $dateFormat;
        if ($data->appearance === 'inline-1line') {
            $day     = date("d", strtotime($dateFormat)); // 07, 23
            $monthM  = date("M", strtotime($dateFormat)); // Dec
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
             $result .= "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$scroll."\"]')".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/month_display')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;

            // month
            $result .= "\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@resource-id, \'textItem\') and @text=\'".$monthM."\']')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            // day
            if ($day > 24) {
                $result .= "\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@resource-id, \'textItem\') and @text=20]')".PHP_EOL;
                $result .= "\t"."\t"."\t".".flick(1, -200, 200)".PHP_EOL;
            }
             //get 1 number 01,02,03...=1,2,3
            if($day < 10){
                $day = substr($day, -1);  
            }
            if($hour < 10){
                $hour = substr($hour, -1);
            }
            if($minute < 10){
                $minute =  substr($minute, -1);
            }

            $result .= "\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@resource-id, \'textItem\') and @text=\'".$day."\']')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            // year
            $result .= "\t"."\t"."\t".".elementByXPath('//android.widget.TextView[contains(@resource-id, \'textItem\') and @text=\'".$year."\']')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btn_ok')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            // hour
            $result .= $element;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/hour_display')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".text().should.become('".$hour."')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.changeTime.bind(this, driver, '".$data->name."', 'hour', '".$hour."'))".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            // minute
            $result .= $element;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/min_display')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".text().should.become('".intval($minute)."')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.changeTime.bind(this, driver, '".$data->name."', 'min', '".intval($minute)."'))".PHP_EOL;
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
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            // year
            if (date("Y") !== $year) {
                $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/date_picker_year')".PHP_EOL;
                $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$year."')".PHP_EOL;
                $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t".".catch(dateTime.scrollYear.bind(this, driver, '".$year."'))".PHP_EOL;
            }
            // day, month
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$id."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(dateTime.scrollMonth.bind(this, driver, '".$id."'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/ok')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }




        // toc-hide, no appearence
        $id      = date("d F Y", strtotime($dateFormat));
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        // date
        $result .= "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$keyScroll."\"]')".PHP_EOL;
        $result .= $element;
        $result .= "\t"."\t"."\t"."\t"."\t".".elementByAccessibilityId('".$id."')".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."\t".".catch(dateTime.findMonth.bind(this, driver, '".$id."'));".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        // time
        $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[@resource-id=\'android:id/radial_picker\']')".PHP_EOL;
        $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."return el.elementByAccessibilityId('".$hour."').tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."\t"."\t".".elementByXPath('//*[@content-desc=\'".$data->name."\']//*[@resource-id=\'android:id/radial_picker\']')".PHP_EOL;
        $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
        $result .= "\t"."\t"."\t"."\t"."return el.elementByAccessibilityId('".intval($minute)."').tap()".PHP_EOL;
        $result .= "\t"."\t"."\t"."})".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
          // toc-hide, no appearence
      /*  $id      = date("d F Y", strtotime($data->value_insert));
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
        return $result;*/
        }
    }
}