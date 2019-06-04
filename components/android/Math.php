<?php

namespace app\components\android;

class Math
{
    public static function getValue($value)
    {
        if (strpos($value, 'mathfunc-random-number') !== FALSE) {
            return self::randomNumber($value);
        } elseif (strpos($value, 'mathfunc-random-integer') !== FALSE) {
            return self::randomInteger($value);
        } elseif (strpos($value, 'mathfunc-random-string') !== FALSE) {
            return self::randomString($value);
        } elseif (strpos($value, 'mathfunc-random-words') !== FALSE) {
            return self::randomWords($value);
        } elseif (strpos($value, 'mathfunc-random-multi-integer') !== FALSE) {
            return self::randomMultiInteger($value);
        }
        return $value;
    }

    private static function randomNumber($value)
    {
        $randMax = mt_getrandmax();   
        $min     = -$randMax;
        $max     = $randMax;
        $factor  = pow(10, rand(0, 3));
        if (preg_match( '!\(([^\)]+)\)!', $value, $match)) {
            if (preg_match( '!\<([^\)]+)!', $match[1], $maximum)) { // < ?
                $max = $maximum[1];
            } elseif (preg_match( '!\>([^\)]+)!', $match[1], $minimum)) { // > ?
                $min = $minimum[1];
            } elseif (strpos($match[1], ',') !== FALSE) { // ?,?
                $rand = explode(',', trim($match[1]));
                $min  = $rand[0];
                $max  = $rand[1];
            }
        }
        return mt_rand($min , $max) ;
    }

    private static function randomInteger($value)
    {
        $randMax = mt_getrandmax();
        if (preg_match( '!\(([^\)]+)\)!', $value, $match)) {
            if (strpos($match[1], 'odd') !== FALSE) { // odd
                return self::randOddEvenInteger($match[1], 1);
            } elseif (strpos($match[1], 'even') !== FALSE) { // even
                return self::randOddEvenInteger($match[1], 0);
            } elseif (preg_match( '!\<([^\)]+)!', $match[1], $max)) { // < ?
                return random_int(-$randMax, $max[1]);
            } elseif (preg_match( '!\>([^\)]+)!', $match[1], $min)) { // > ?
                return random_int($min[1], $randMax);
            } elseif (strpos($match[1], ',') !== FALSE) { // ?,?
                $rand = explode(',', trim($match[1]));
                return random_int($rand[0], $rand[1]);
            }
        }
        return random_int(-$randMax, $randMax);
    }

    // $odd === 0 is even number, $odd === 1 is odd number
    private static function randOddEvenInteger($value, $odd)
    {
        $randMax  = mt_getrandmax();
        $arrValue = explode(',', $value);
        $number   = random_int(-$randMax, $randMax);
        if (count($arrValue) === 2) {
            if (preg_match( '!\<([^\)]+)!', $arrValue[1], $max)) { // < ?
                $number = random_int(-$randMax, $max[1]);
                return abs($number%2)==$odd ? $number : $number-1;
            }
            if (preg_match( '!\>([^\)]+)!', $arrValue[1], $min)) { // > ?
                $number = random_int($min[1], $randMax);
                return abs($number%2)==$odd ? $number : $number+1;
            }
        }
        if (count($arrValue) === 3) { // ?,?
            $number = random_int($arrValue[1], $arrValue[2]);
            if (abs($number%2) == $odd) {
                return $number;
            }
            return $number + 1 > $arrValue[2] ? $number - 1 : $number + 1;
        }
        return abs($number%2)==$odd ? $number : $number+1;
    }

    private static function randomString($value)
    {
        preg_match( '!\(([^\)]+)\)!', $value, $match);
        $arrValue = explode(',', $match[1]);
        $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        if (count($arrValue) === 2) {
            $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }
        $charactersLength = strlen( $characters );
        $randomString = '';
        for ($i = 0; $i < $arrValue[0]; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    private static function randomWords($value)
    {
        preg_match( '!\(([^\)]+)\)!', $value, $match);
        $content = file_get_contents(dirname(__FILE__).'/sample-text.txt');
        $content = str_replace("  ", " ", $content);
        $strlen  = count(explode(" ", $content));
        $startIndex = rand(0, $strlen - $match[1]);
        return self::trim_text($content, $match[1], $startIndex);
    }
    private static function trim_text($text, $count, $startIndex = 0){
        $trimed = '';
        $string = explode(" ", $text);
        $max = $startIndex + $count;
        for ( $wordCounter = $startIndex; $wordCounter < $max; $wordCounter++ ) {
            $trimed .= $string[$wordCounter] . " ";
        }
        return trim($trimed);
    }

    private static function randomMultiInteger($value){
        $res = [];
        $chars = [
            'space' => ' ',
            'comma' => ',',
            'dot'   => '.'
        ];
        preg_match( '!\(([^\)]+)\)!', $value, $match);
        $params = explode(',', trim($match[1]));
        for ($i=0; $i < $params[0]; $i++) { 
            $res[] = random_int($params[1], $params[2]);
        }
        return implode($chars[trim($params[3])], $res);
    }

    public static function getKeycode($value)
    {
        if (strpos($value, 'convert_key_code') !== FALSE) {
            return self::convertKeycode($value);
        }
        return $value;
    }

    private static function convertKeycode($value){
        $res = [];
        preg_match( '!\(([^\)]+)\)!', $value, $match);      
        $input = $match[1];
        $arrayInput = str_split($input);   
        $arrayNumber = array(0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-","+","*","/","=","backspace");
        $arrayConvert = array(7,8,9,10,11,12,13,14,15,16,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,69,157,155,154,70,67);
        foreach ($arrayInput as $key => $valInput) {    
            foreach($arrayNumber as $j => $valNumber){
                if($valInput === strval($valNumber)){
                    $res[] = $arrayConvert[$j];                       
                }                    
            }           
        }         
        return $res;     
    }
}