<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;
use app\assets\AppAsset;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/loader.css',
        'css/components.min.css',
        'css/custom.min.css',
        'css/default.min.css',
        'css/font-awesome.min.css',
        'css/layout.min.css',
        'css/plugins.min.css',
        'css/simple-line-icons/simple-line-icons.min.css',
        'lib/font-awesome/css/font-awesome.min.css',
        'css/login.min.css',
    ];
    public $js = [
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset'
    ];
    public $jsOptions = ['position' => \yii\web\View::POS_HEAD];
}
