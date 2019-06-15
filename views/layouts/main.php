<?php

/* @var $this \yii\web\View */
/* @var $content string */
use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use yii\widgets\Menu;
use app\assets\AppAsset;

AppAsset::register($this);
    if(Yii::$app->user->isGuest){
        $url = Yii::$app->urlManager->createUrl('/login');
        $this->context->redirect($url);
    }
    

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="/favicon.ico" />    
    <link rel="stylesheet" href="icono.min.css"> 
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body class="page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo">
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
     NavBar::begin([
        'brandLabel' =>'<img src="/rta.png" id="img-logo"/>' ,
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top ',
        ],

    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            
            Yii::$app->user->isGuest ? (
                ['label' => 'Login', 'url' => ['/login']]
            ) : (
                '<li>'
                . Html::beginForm(['login/logout'], 'post')
                . Html::submitButton(
                    'Logout (' . Yii::$app->user->identity->name . ')',
                    ['class' => 'btn btn-link logout']
                )
                . Html::endForm()
                . '</li>'
            )
        ],
    ]);
    NavBar::end();
    ?>

    <div class="page-container">
        <div class="page-sidebar-wrapper">
           <div class="page-sidebar navbar-collapse collapse">
                <?php echo Menu::widget([
                        'options' => ['class' => 'page-sidebar-menu', 'data-keep-expanded' => false, 'data-auto-scroll' => true, 'data-slide-speed' => '200'],
                        'itemOptions' => ['class' => 'nav-item'],
                        'items' => [
                            [
                                'label' => 'Dashboard',
                                'url' => ['/dashboard'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="icon-home"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'Management Post',
                                'url' => ['/post'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="icon-puzzle"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'System Users',
                                'url' => ['/user'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="icon-user"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'Configuration',
                                'url' => ['/config'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="glyphicon glyphicon-th"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'Manager Of Uploaded',
                                'url' => ['/manager'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="glyphicon glyphicon-cd"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'Analytics & Reports',
                                'url' => ['/analytics'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="glyphicon glyphicon-gift"></i><span class="title">{label}</span></a>'
                            ],
                            [
                                'label' => 'Settings',
                                'url' => ['/setting'],
                                'template' => '<a href="{url}" class="nav-link nav-toggle"><i class="icon-settings"></i><span class="title">{label}</span></a>'
                            ],
                            
                        ]   
                    ]);
                ?>
            </div>
        </div>
        <div class="page-content-wrapper">
            <div class="page-content">
                <?= $content ?>
            </div>
        </div>
    </div>
</div>

    <nav class="navbar-default navbar-fixed-bottom navbar">
        <p class="pull-left ">2019 © Admin Real Estate. All Rights Reserved.</p>

        <p class="pull-right">Powered by <a href="#">web team</a></p>
    </nav">

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
