<?php  
use yii\helpers\Html;

$this->title = Html::encode('Update System Users');
?>
<div class="row">
	<div class="col-md-12">
		<h3 class="page-title"><?= Html::encode('Update System Users') ?></h3>
		<div class="portlet light bordered">
			<div class="portlet-body form row">
				<div class="col-md-6">
				<?= $this->render('_form', compact('model')); ?>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function(){
		var bl= true;
		var $pass;
		if(bl === true){

			$pass= $('#user-password').val(); //get value
			$('#user-repassword').val($pass);	// set value
			$bl= false;
		}		
		
		$('#btn_enterPass').append('<?=Html::button('New-Password', ['class' => 'btn btn-success', 'id' => 'btn_click'])?>');
 
		$('#btn_click').on('click', function(){
			if($('#btn_click').text()=='New-Password'){
				$('#user-password').val('');
				$('#user-repassword').val('');		
				$('#enterPass').show();
				$('#btn_click').text('detroy');
				$('#btn_click').removeClass('btn-success').addClass('btn-danger');
			}
			else{
				$('#user-password').val($pass);
				$('#user-repassword').val($pass);		
				$('#enterPass').hide();
				$('#btn_click').text('New-Password');
				$('#btn_click').removeClass('btn-danger').addClass('btn-success');
			}
			
		});
	});
</script>
