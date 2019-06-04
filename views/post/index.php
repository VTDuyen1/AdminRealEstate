<?php  
use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\Url;
$this->title = Html::encode('New Post');
?>

<div class="page-head">
     <div class="page-title">
        <h1><?= Html::encode('New Post') ?></h1>
     </div>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="margin-bottom-20"><a href="<?= Yii::$app->urlManager->createUrl('post/create'); ?>" class="btn sbold green">Add New</a></div>
				<?php
					echo GridView::widget([
						'id'           => 'post-grid',
					    'dataProvider' => $dataProvider,
					    'rowOptions'   => ['class'=>'text-center'],
			            'columns'      => [
			            	['class'   => 'yii\grid\CheckboxColumn'],			            	
			                [	
			            		'header' => ''	,
			            		'class' => 'yii\grid\SerialColumn'
			            	],
			                'title_post',
			                // 'type',
			                'price',
			                'location',
			                'latitude',
			                'longtitude',
			                'negotiate',
			                'created_date',
			                'created_update',
			                'content',
			                'phone_number',
			                // 'status_id',
			                // 'user_id',
			                // 'image_id',
			                // 'feature_id',
			                // 'video_id',
			         
					        [
						        'header'   => 'Action',
						        'class'    => 'yii\grid\ActionColumn',
						        'template' => '{view} {delete} {update} {download}',
						        'buttons'  => [
		                              	'download' => function ($url, $data) {     
		                                    return Html::a(
		                                    	'<span class="glyphicon glyphicon-download"></span>',
		                                    	Url::to(['post/dowloads','id'=>$data->post_id]),
		                                    	['title' => Yii::t('yii', 'Download')]
		                                    );                                
		                                },
		                                'delete' => function ($url, $model) {
							                return Html::a(
							                		'<span class="glyphicon glyphicon-trash"></span>', 
							                		[
							                			'delete', 'id' => $model->post_id
							                		],
							                        [						                			
							                            'title' => Yii::t('app', 'delete'),
							                            'class'	=> 'btn-delete',
							                            'data'	=> [
							                            	'i'=>$model->post_id
							                            ]
							                    	]				                
							                );						              
							            }
		                            ]
					    	]
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
			var keys = $('#post-grid').yiiGridView('getSelectedRows');
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
				url: '<?php echo Yii::$app->urlManager->createAbsoluteUrl('post/delete-all'); ?>',
				data : {'ids' : keys},
				success:function(data){
			         location.reload();
			    },
				error: function(data) {
					alert("Error occured. Please try again.");
				}
			});
		});

		/*
			delete one
		*/
		$('.btn-delete').on('click', function(){
			var confir = confirm("Are you sure to delete this item ?");
			if (confir==false) {
				return false;
			}
			var key= $(this).attr("data-i");
			$.ajax({
				type: 'POST',
				url: '<?php echo Yii::$app->urlManager->createAbsoluteUrl('post/delete'); ?>',
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
