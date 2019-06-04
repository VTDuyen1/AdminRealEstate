<?php  
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use dosamigos\datepicker\DatePicker;

$form = ActiveForm::begin();

// echo $form->field($model, 'user_id')->textInput([ 'disabled' => 'disabled']);
echo $form->field($model, 'name')->textInput();
echo $form->field($model, 'full_name')->textInput();
echo $form->field($model, 'email')->textInput();

echo '<div id="enterPass" style="display:none">';
echo $form->field($model, 'password')->passwordInput();
echo $form->field($model, 'repassword')->passwordInput();
echo '</div>';

echo $form->field($model, 'phone_number')->textInput();
echo $form->field($model, 'birthday')->widget(
    DatePicker::className(), [
        // inline too, not bad
         'inline' => false, 
         // modify template for custom rendering
        //'template' => '<div class="well well-sm" style="background-color: #fff; width:250px">{input}</div>',
        'clientOptions' => [
            'autoclose' => true,
            'format' => 'yyyy-m-dd'
        ],
       
]);
echo $form->field($model, 'gender')->dropDownList(['1' => 'Male', '0' => 'Female']);
echo $form->field($model, 'accommodation')->textInput();
echo $form->field($model, 'role_id')->dropDownList(['0' => 'Admin', '1' => 'User', '2' => 'Guest']);


/*echo '<div id="btn_enterPass"></div>';*/	

echo '<div class="form-group">';
echo Html::submitButton('Submit', ['class' => 'btn btn-primary margin-right-10']);
echo Html::a('Back', ['/user'], ['class'=>'btn btn-danger']);
echo '</div>';
ActiveForm::end();