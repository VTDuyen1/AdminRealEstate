<?php  
use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\Url;
$this->title = Html::encode('Users');
?>

<div class="page-head">
     <div class="page-title">
        <h1><?= Html::encode('Users') ?></h1>
     </div>
 </div>
<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="margin-bottom-20"><a href="<?= Yii::$app->urlManager->createUrl('user/create'); ?>" class="btn sbold green">Add New</a></div>
				<?php



















				
				echo GridView::widget([
						
						'id'           => 'user-grid',
					    'dataProvider' => $dataProvider,
					    'rowOptions'   => ['class'=>'text-center'],
			            'columns'      => [	

			            	['class' => 'yii\grid\CheckboxColumn'],
			            	[	
			            		'header' => ''	,
			            		'class' => 'yii\grid\SerialColumn'
			            	],
			                'name',	   
			                'full_name',		                
			                'email',  
			                'phone_number',
			                'birthday',
			                [
					            'attribute' => 'gender',
					            'format' => 'html',
					            'value' => function($data){
					            	if ($data->gender) {
				                        return Html::tag('span', Html::encode('Male'));
				                    } else {
				                        return Html::tag('span', Html::encode('Female'));
				                    }
					            }
					        ],		                

			          	],
			          	'pager' => [						
			            	'options' =>['class'=>['pull-right','pagination']],
							'prevPageLabel' => '&lt;',
        					'nextPageLabel' => '&gt;',
							'firstPageLabel' => '&lt;&lt;',
							'lastPageLabel'=>'&gt;&gt;',
							'maxButtonCount'=>5,						
						]
					]);



















				?>
				<div class="form-group">
				<?php
					echo Html::button(
						Html::encode('Delete'),
						[
							'id' => 'btn-delete-all',
							'class' => 'btn btn-danger'
						]
					);
					
				?>
				</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function () {
		$('#btn-delete-all').on('click', function(){
			var keys = $('#user-grid').yiiGridView('getSelectedRows');
			if (keys.length == 0) {
				alert('No rows are selected. Please choose a item to delete.');
				return false;
			}
			var confir = confirm("Are you sure to delete this item ?");
			if (confir==false) {
				return false;
			}
			$.ajax({
				type: 'POST',
				url: '<?php echo Yii::$app->urlManager->createAbsoluteUrl('user/deleteall'); ?>',
				data : {'ids' : keys},
				success:function(data){
			        location.reload();
			    },
				error: function(data) {
					alert("Error occured. Please try again.");
				}
			});
		});

		
		$('.btn-delete').on('click', function(){
			var confir = confirm("Are you sure to delete this item ?");
			if (confir==false) {
				return false;
			}
			var key= $(this).attr("data-i");
			$.ajax({
				type: 'POST',
				url: '<?php echo Yii::$app->urlManager->createAbsoluteUrl('user/delete'); ?>',
				data : {'id' : key},
				success:function(data){				
			        location.reload();	
			    },
				error: function(data) {				
					alert("Error occured. Please try again.");
				}
			});
		});		
	});
</script>
