

 <?php

/* @var $this yii\web\View */
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\ActiveForm;
$this->title = 'Settings';
?>

<div class="page-head">
     <div class="page-title">
        <h1><?= Html::encode('Settings') ?></h1>
     </div>
 </div>
<div class="row">
    <div class="col-md-12">
        <div id="overlay"></div>
         <?php $form = ActiveForm::begin(); ?>
                    <div class="portlet light bordered">
                         <div class="portlet-body form row">
                             <div class="col-md-6 col-sm-12">
                                <p  style="color:green;"><?= Yii::$app->session->getFlash('success');?></p> 
                                <p  style="color:red;"><?= Yii::$app->session->getFlash('error');?></p> 
                                <div class="form-group">
                                    <label class="col-md-3 control-label " style="margin-top: 20px;">Test Sever</label>
                                     <div class="col-md-9">
                                        <?= $form->field($model,'value')->textInput()->label('') ?>
                                        <div class="form-actions">                                        
                                            <span class="help-block">
                                                <?= Html::submitButton('Save', ['class' => 'btn btn-primary']) ?>
                                                
                                                <?= Html::a('Reset', Url::to(['setting/reset']), ['class' => 'btn btn-default']) ?>
                                            </span>
                                        </div>        
                                    </div>
                                </div>
                            </div>
                        </div>               
                    </div>                                      
                    
         <?php ActiveForm::end(); ?>       
    </div>
</div>