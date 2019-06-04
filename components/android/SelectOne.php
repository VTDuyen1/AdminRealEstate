<?php

namespace app\components\android;

class SelectOne
{
    public static function convert($data, $inRepeat=false)
    {
        // start index : 0, 1, 2, 3, 4, 5, ...
         $result = '';
        $value  = Math::getValue($data->value_insert);
        $text   = $data->value_insert;
        $valTest = intval($value) + 1;
        $description = $data->name . " : " . $value;
        $sign = '"';

        $element = "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
        if ($inRepeat) {
            $element = "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."').last()".PHP_EOL;
        }

        // tagging-choices-noshow-v2, boxtag-choices-noshow-v2
        if ($data->appearance === 'tagging-choices-noshow-v2' || $data->appearance === 'boxtag-choices-noshow-v2' || strpos($data->appearance,'tagging-choices-noshow-v2')!=FALSE) {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('".$text."'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/recycler_view')".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(function(){".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/recycler_view')".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.RelativeLayout[".$valTest."]//android.widget.TextView').tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // tagging-choices-noshow, boxtag-choices-noshow
        if ($data->appearance === 'tagging-choices-noshow' || $data->appearance === 'boxtag-choices-noshow') {
            $yPoint = ($value == 0) ? 120 : (($value == 1) ? 205 : 290);
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('".$text."'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/selection_view')".PHP_EOL;
            $result .= "\t"."\t"."\t".".getLocation()".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (loc) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."var action = new wd.TouchAction(driver);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."action.tap({x: loc.x + 100, y: loc.y + ".$yPoint."});".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return driver.performTouchAction(action).sleep(1000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t".".back().back().back()".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // minimal
        if ($data->appearance === 'minimal') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView').tap())".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByXPath('//android.widget.ListView//android.widget.CheckedTextView[".$valTest."]').tap()".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // tagging, boxtag
        if ($data->appearance === 'tagging' || $data->appearance === 'boxtag') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[".$valTest."]').tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // compact, rating_box
         if ($data->appearance === 'compact' || $data->appearance ==='compact-5') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .=  "\t"."\t"."\t".".scrollTo('//*[@content-desc=\"".$data->name."\"]//android.widget.GridView//*[@index = ".$valTest."]')".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".elementByXPath('>', '//android.widget.GridView//*[@index = ".$valTest."]').tap()".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

         if ($data->appearance === 'rating_box' || strpos($data->appearance,'rating_box')!=FALSE) {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".sleep(3000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[".$valTest."]').tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // star rating
        if ($data->appearance === 'star_rating') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.RatingBar')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return Q.all([".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."el.getSize(),".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."el.getLocation()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."])".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t".".then(function (res) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."let size = res[0];".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."let loc  = res[1];".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."let yCenter = size.height / 2;".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."let starWidth = size.width / 5;".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."let action = new wd.TouchAction(driver);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."action.tap({x:loc.x+".$value."*starWidth+yCenter, y:loc.y+yCenter});".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."return driver.performTouchAction(action);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        // no apperance
        $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
        $result .= "\t"."\t"."return driver".PHP_EOL;
        $result .= $element;
        $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.RelativeLayout[".$valTest."]//android.widget.RadioButton').tap())".PHP_EOL;
        $result .= "\t"."});".PHP_EOL;
        return $result;
    }
}