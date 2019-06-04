<?php

namespace app\components\android;

use Yii;

class Text
{
    public static function convert($insert, $data, $inRepeat=false)
    {
        $result = '';
        if(!empty($data->value_insert)){
            $description = $data->name . " : " . $insert;
        }

        $element = '';
        $element = "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
        if ($inRepeat) {
            $element = "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."').last()".PHP_EOL;
        }
        if ($data->action == 'type') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.EditText'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".click()".PHP_EOL;
            if ($data->appearance === 'textpopup') {
                $result .= "\t"."\t"."\t".".setImmediateValue(\"".$insert."\")".PHP_EOL;
                $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/btOk')".PHP_EOL;
                $result .= "\t"."\t"."\t".".tap();".PHP_EOL;
            } elseif ($data->appearance === 'verify-email') {
                $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return Q.all([el.setImmediateValue(\"".$insert."\"), el.getSize(), el.getLocation()])".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".then(function (res) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."let size = res[1];".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."let loc  = res[2];".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."let action = new wd.TouchAction(driver);".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."action.tap({x:loc.x + size.width - 30, y: loc.y + size.height / 2});".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return driver.performTouchAction(action).hideKeyboard();".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
            } else {
                $result .= "\t"."\t"."\t".".setImmediateValue(\"".$insert."\")".PHP_EOL;
                $result .= "\t"."\t"."\t".".hideKeyboard();".PHP_EOL;
            }
            $result .= "\t"."})".PHP_EOL;
            return $result;
        }
        // ====================================================================================================

        if ($data->action == 'type') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then((el) => {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t".".getAttribute('text')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t".".then(function(result) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."if(result.length == 11){".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."\t"."console.log('passed')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."}".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."if(result.length == 12 && result[0] == '-' && result.lastIndexOf("-") != 0){".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."}".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."else{".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."\t"."}".PHP_EOL;
            $result .= "\t"."})".PHP_EOL;
            return $result;
        }
        // ====================================================================================================
        if ($data->action == 'click') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.TextView').tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
        if ($data->appearance === 'selection_one_show') {
            $val = intval($insert) + 1;
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.RadioGroup//android.widget.RadioButton[".$val."]').tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
        if ($data->appearance === 'selection_one_hide') {
            $val = 100;
            if ($insert > 0) {
                $val = 100 + intval($insert)*60;
            }  
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.ImageButton').tap())".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.EditText'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".getLocation()".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (loc) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."var action = new wd.TouchAction(driver);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."action.tap({x: loc.x + 20, y: loc.y + ".$val."});".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return driver.performTouchAction(action);".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
        if ($data->appearance === 'slider_rating') {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.SeekBar'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return Q.all([el.getSize(), el.getLocation()])".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".then(function (res) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."var unit = parseInt(res[0].width / 100);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."var action = new wd.TouchAction(driver);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."action.tap({x: res[1].x + ".$insert."*unit, y: res[1].y + 18});".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return driver.performTouchAction(action);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
        if ($data->appearance === 'search-autocomplete-noedit-v2-join-dbs') {
            $text = $data->search_text;
            $val  = intval($insert) + 1;
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            // $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('".$text."'))".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(3000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/recycler_view')".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(function(){".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/recycler_view')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".sleep(2000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.RelativeLayout[".$insert."]//android.widget.TextView')".PHP_EOL;
            $result .= "\t"."\t"."\t".".catch(function(){".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath(\"//android.widget.TextView[contains(@text,'".$insert."')]\")".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap())".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
        if ($data->appearance === 'search-autocomplete-noedit-join-dbs' || $data->appearance === 'search-autocomplete-noedit' || $data->appearance === 'search-autocomplete' || $data->appearance ==='search-autocomplete-noedit-v2') {
            $val = 110;
            if ($insert > 0) {
                $val = 110 + intval($insert)*60;
            } 
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".sleep(1000)".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".getLocation()".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".then(function (loc) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."var action = new wd.TouchAction(driver);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."action.tap({x: loc.x + 10, y: loc.y + ".$val."});".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return driver.performTouchAction(action);".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."});".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
            return $result;
        }

        if($data->appearance === 'SaveFinalizedExit') {
            $result .= "\t"."it(\"Save Finalized Exit: \", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".tap()".PHP_EOL;
            $result .= "\t"."})".PHP_EOL;
            return $result;
        }

        // ============================TEST SMALL TESTCASE==========================
         if (strpos($data->action, 'test_length')) {
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then((el) => {".PHP_EOL;
            $result .= "\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t".".elementByClassName('android.widget.EditText')".PHP_EOL;
            $result .= "\t"."\t"."\t".".sleep(5000)".PHP_EOL;
            $result .= "\t"."\t"."\t".".getAttribute('text')".PHP_EOL;
            $result .= "\t"."\t"."\t".".then(function(result) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."if(result != \"".$insert."\"){".PHP_EOL;
            $result .= "\t"."\t"."\t"."console.log('passed')".PHP_EOL;
            $result .= "\t"."\t"."\t"."}
                                        else{
                                            console.log('failed')
                                        }
                                    })
                        })".PHP_EOL;



            $result .= "\t"."});".PHP_EOL;
            return $result;
        }
    }
}