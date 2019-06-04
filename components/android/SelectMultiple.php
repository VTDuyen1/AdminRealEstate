<?php
  
namespace app\components\android;
  
class SelectMultiple
{
    public static function convert($data, $inRepeat=false)
    {
        // start index : 0, 1, 2, 3, 4, 5, ...
        $result = '';
        $text   = $data->search_text; //change 
        $valueInsert = Math::getValue($data->value_insert);
        $arrValue = explode(',', trim($valueInsert, ','));
        $description = $data->name . " : " . $valueInsert;
        $element = "\t"."\t"."\t".".elementByAccessibilityId('".$data->name."')".PHP_EOL;
        if ($inRepeat) {
            $element = "\t"."\t"."\t".".elementsByAccessibilityId('".$data->name."').last()".PHP_EOL;
        }
        if (!empty($arrValue)) {
            // tagging-choices-noshow-v2, boxtag-choices-noshow-v2
            if ($data->appearance === 'tagging-choices-noshow-v2' || $data->appearance === 'boxtag-choices-noshow-v2') {
                $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                foreach ($arrValue as $value) {
                    $result .= $element;
                    $result .= "\t"."\t"."\t".".then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('".$text."'))".PHP_EOL;
                    $result .= "\t"."\t"."\t".".sleep(1000)".PHP_EOL;
                    $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/recycler_view')".PHP_EOL;
                    $result .= "\t"."\t"."\t".".then(el => el.elementByXPath('//android.widget.RelativeLayout[".(intval($value) + 1)."]//android.widget.TextView').tap())".PHP_EOL;
                }
                $result .= "\t"."});".PHP_EOL;
                return $result;
            }

            // tagging-choices-noshow, boxtag-choices-noshow
            if ($data->appearance === 'tagging-choices-noshow' || $data->appearance === 'boxtag-choices-noshow' || strpos($data->appearance,'tagging-choices-noshow')!=FALSE) {
                $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= $element;
                $result .= "\t"."\t"."\t".".then(el => el.elementById('vn.rta.rtsurvey:id/selection_view')".PHP_EOL;
                $result .= "\t"."\t"."\t".".catch(function(){".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return driver".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/selection_view')".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t".".setImmediateValue('".$text."'))".PHP_EOL;
            
                $result .= "\t"."\t"."\t".".sleep(3000)".PHP_EOL;
                $result .= "\t"."\t"."\t".".elementById('vn.rta.rtsurvey:id/selection_view')".PHP_EOL;  
                $result .= "\t"."\t"."\t".".catch(function(){".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return driver".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementById('vn.rta.rtwork:id/selection_view')".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t".".getLocation()".PHP_EOL;
                $result .= "\t"."\t"."\t".".then(function (loc) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."var ma = new wd.MultiAction(driver);".PHP_EOL;
                foreach ($arrValue as $key => $value) {
                    $yPoint = ($value == 0) ? 132 : (($value == 1) ? 227 : 324);
                    switch ($value) {
                        case 1:
                            $yPoint = 258;
                            break;
                        case 2:
                            $yPoint = 384;
                            break;
                        case 3:
                            $yPoint = 509;
                            break;
                        case 4:
                            $yPoint = 634;
                            break;
                        
                        default:
                            $yPoint = 138;
                            break;
                    }
                    $result .= "\t"."\t"."\t"."\t"."var action_".$key." = new wd.TouchAction(driver);".PHP_EOL;
                    $result .= "\t"."\t"."\t"."\t"."action_".$key.".tap({x: loc.x + 100, y: loc.y + ".$yPoint."}).release();".PHP_EOL;
                    $result .= "\t"."\t"."\t"."\t"."ma.add(action_".$key.")".PHP_EOL;
                }
                $result .= "\t"."\t"."\t"."\t"."return driver.performMultiAction(ma).sleep(3000);".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t".".back().back().back();".PHP_EOL;
                $result .= "\t"."});".PHP_EOL;
                return $result;
            }

            $actions = [];
            foreach ($arrValue as $value) {
                $actions[] = "els[".$value."].tap()";
            }
            // minimal
            if ($data->appearance === 'minimal') {
                $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= $element;
                $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementsByClassName('android.widget.CheckedTextView')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return Q.all([".implode(', ', $actions)."])".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementByClassName('android.widget.Button')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".tap()".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."});".PHP_EOL;
                return $result;
            }

            // tagging, boxtag, compact, rating_box
            if ($data->appearance === 'compact') {
                $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= $element;
                $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementsByXPath('//android.widget.LinearLayout[2]//android.widget.ImageView')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return Q.all([".implode(', ', $actions)."])".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."});".PHP_EOL;
                return $result;
            }


            if ($data->appearance === 'boxtag' || $data->appearance === 'tagging' || $data->appearance === 'rating_box' || strpos($data->appearance,'rating_box')!=FALSE) {
                $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
                $result .= "\t"."\t"."return driver".PHP_EOL;
                $result .= $element;
                $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return Q.all([".implode(', ', $actions)."])".PHP_EOL;
                $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."\t"."\t"."})".PHP_EOL;
                $result .= "\t"."});".PHP_EOL;
                return $result;
            }


            // no apperance
            $result .= "\t"."it(\"".$description."\", function () {".PHP_EOL;
            $result .= "\t"."\t"."return driver".PHP_EOL;
            $result .= $element;
            $result .= "\t"."\t"."\t".".then(function (el) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."return el".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".elementsByClassName('android.widget.CheckBox')".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t".".then(function (els) {".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."\t"."return Q.all([".implode(', ', $actions)."])".PHP_EOL;
            $result .= "\t"."\t"."\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."\t"."\t"."})".PHP_EOL;
            $result .= "\t"."});".PHP_EOL;
        }
        return $result;
    }
}