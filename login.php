<?php
use yii\base\Model;
use yii\widgets\ActiveForm;
use app\assets\AppAsset;
use yii\helpers\Html;
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html>
<?php $this->head() ?>
<head>
	<meta charset="utf-8" />
	<title>Login Page</title>
	<link rel="stylesheet" type="text/css" href="style.css">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />

</head>
<?php $this->beginBody() ?>
<body class="login">
	<div class="logo">
		<img src="rta.png" alt="logo" height="80" /> </a>
	</div>
	<div class="content">
		<div id="frm">
			<?php $form = ActiveForm::begin([
		        'id' => 'login-form'
    		]); ?>
    		<h3 class="form-title font-green">Log into your account</h3>
    		<?= $form->field($model, 'username')->textInput(['autofocus' => true]) ?>
    		<?= $form->field($model, 'password')->passwordInput() ?>
    		<div class="form-actions text-center">
	            <?= Html::submitButton('Login', ['class' => 'btn btn-success uppercase', 'name' => 'login-button']) ?>

	           	<label class="rememberme check mt-checkbox mt-checkbox-outline">
	            	<input type="checkbox" name="LoginForm[rememberMe]" value="1" checked/> Remember
	            	<span></span>
        		</label>     
        	</div>

			<?php ActiveForm::end() ?>
		</div>
	</div>
	<div class="copyright"> 2018 © Real-Time Analytics. </div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>