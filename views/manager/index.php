<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
$this->title = Html::encode('Manager Of Uploaded');
?>
<div class="row">
    <div class="col-md-12">
        <h3 class="page-title"><?= Html::encode('Manager Of Uploaded') ?></h3>
        <div class="portlet light bordered"> 
            <div class="portlet-body form">
                <?php
                    $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]);
                ?>
                
                    <div class="form-group">
                        <?= Html::submitButton('SAVE', ['class' => 'btn btn-primary']) ?>
                        <?= Html::a('Back', ['/config'], ['class'=>'btn btn-danger']) ?>
                    </div>
                <?php ActiveForm::end(); ?>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function(){
        var bl= true;
        var $pass;
        if(bl === true){

            $bl= false;
        }       
        
        $('#buttonDf').append('<?=Html::button('Other File', ['class' => 'btn btn-success', 'id' => 'btn_click'])?>');

        $('#btn_click').on('click', function(){
            if($('#btn_click').text()=='Other File'){                   
                $('#enterVal').show();
                $('#btn_click').text('detroy');
                $('#btn_click').removeClass('btn-success').addClass('btn-danger');
                $('#fileName').hide();
            }
            else{   
                $('#enterVal').hide();
                $('#btn_click').text('Other File');
                $('#btn_click').removeClass('btn-danger').addClass('btn-success');
                $('#fileName').show();
                $('#uploadform-uploadfile').val('');
            }
        });
    });
</script>