<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
$this->title = Html::encode('Upload TestCase');
?>
<div class="row">
	<div class="col-md-12">
		<h3 class="page-title"><?= Html::encode('Upload TestCase') ?></h3>
		<div class="portlet light bordered">
			<div class="portlet-body form">
				<?php
					$form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]);
				?>
				    <?= $form->field($model, 'name')->input('text')->label('Name') ?>
				    <div id="fileName">
				    <?= $form->field($model, 'fileNameOld')->textInput([ 'disabled' => 'disabled'])?>
					</div>
					<div id="enterVal" style="display:none">
						<?= $form->field($model, 'uploadFile')->fileInput()->label('Choose file') ?>
					</div>
					<div id="buttonDf"></div>
					<div class="form-group">
					 <form action="/action_page.php" name="form" method="post">
				      <label for="question">Do you wanna uploads form engine? Click into checkbox, please!</label><br>
					  <input type="checkbox" name="checkform" id="checked" value="Form"> Form Engine<br><br>
					</form>
				    
				  	<?= $form->field($model, 'description')->textarea() ?>
				    	<?= Html::submitButton('Submit', ['class' => 'btn btn-primary']) ?>
				    	<?= Html::a('Back', ['/post'], ['class'=>'btn btn-danger']) ?>
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