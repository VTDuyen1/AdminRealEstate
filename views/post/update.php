<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
$this->title = Html::encode('Edit Post');
?>
<div class="row">
	<div class="col-md-12">
		<h3 class="page-title"><?= Html::encode('Edit Post') ?></h3>
		<div class="portlet light bordered"> 
			<div class="portlet-body form">
				<?php
					$form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]);
				?>
				      <!-- ===================================POST NEW================================= -->
				    <?= $form->field($model, 'title_post')->input('text')->label('Title Post') ?>
				    <?= $form->field($model, 'type')->input('text')->label('Type') ?>
				    <?= $form->field($model, 'price')->input('text')->label('Price') ?>
				    <?= $form->field($model, 'location')->input('text')->label('Location') ?>
				    <?= $form->field($model, 'latitude')->input('text')->label('Latitude') ?>
				    <?= $form->field($model, 'longtitude')->input('text')->label('Longtitude') ?>
				    <?= $form->field($model, 'negotiate')->input('text')->label('Negotiate') ?>
				    <?= $form->field($model, 'content')->input('text')->label('Content') ?>
				    <?= $form->field($model, 'phone_number')->input('text')->label('Phone Number') ?>
				    <label class="heading">Feature of Real Estate: </label>
				  	<select name="feature" label="abc">
					  <option value="balcony">Balcony</option>
					  <option value="wardobes">Built-in Wardobes</option>
					  <option value="dishwasher">Dishwasher</option>
					  <option value="furnished">Furnished</option>
					  <option value="garden">Garden/Courtyard</option>
					  <option value="gas">Gas</option>
					  <option value="laudry">internal Laudry</option>
					  <option value="pets">Pets Allowed</option>
					  <option value="study">Study</option>
					</select>
				    <?= $form->field($model, 'uploadImages[]')->fileInput(['multiple' => true])->label('Choose Image') ?>
				    <?= $form->field($model, 'uploadVideos[]')->fileInput(['multiple' => true])->label('Choose Video') ?>
				  	<?= $form->field($model, 'description')->textarea() ?>
				    <div class="form-group">
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