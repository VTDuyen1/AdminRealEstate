<?php
use yii\helpers\Html;

$this->title = Html::encode('Create System Users');
?>
<div class="row">
	<div class="col-md-12">
		<h3 class="page-title"><?= Html::encode('Create System Users') ?></h3>
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
		$('#enterPass').show();
		$('#user-username').removeAttr('disabled');
	});
</script>