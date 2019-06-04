<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\GridView;

$this->title = Html::encode('Dashboard');
?>
<style type="text/css">
	#dashboard-grid table tr td:nth-child(2) {
		word-break: break-all;
	}
</style>
<div class="page-head">
     <div class="page-title">
        <h1><?= Html::encode('Dashboard') ?></h1>
     </div>
 </div>
<div class="row">
	<!-- Operation History -->
	<div class="col-md-8">
		<div class="portlet light bordered">
			<div class="portlet-title">
                <div class="caption">
                    <i class="icon-social-dribbble font-blue-sharp"></i>
                    <span class="caption-subject font-blue-sharp bold uppercase">Operation History</span>
                </div>
            </div>
			<div class="portlet-body">
				<?php 
					echo GridView::widget([
						'id'=> 'dashboard-grid',
						'dataProvider' => $dataProvider,
						'rowOptions'=>['class'=>'text-center'],
						'columns' => [
							'id',
							[
			                	'label' => Html::encode('Test Case'),
					            'attribute' => 'test_case_id',
					            'value' => function($data){
				                    return $this->context->getTestCasebyId($data->test_case_id);
					            }
		                	],
		                	[
		                		'label'=> Html::encode('Device'),
		                		'attribute' => 'device_id',
		                		'value' => function($data){
		                			return $this->context->getDeviceNamebyId($data->device_id);
		                		}
		                	],
		                	[
		                	'label' => Html::encode('Status'),
				            'attribute' => 'status',
				            'format' => 'html',
				            'value' => function($data){
				            	if ($data->status) {
			                        return Html::tag('span', Html::encode('Success'), ['class' => 'label label-success']);
			                    } else {
			                        return Html::tag('span', Html::encode('Failed'), ['class' => 'label label-danger']);
			                    	}
				            	}
				        	],
				        	[

				        	'label' => 'Action',
				            'attribute' => 'Action',
				            'format' => 'html',
				            'value' => function($data){
				            	$html = Html::a(
				            		Html::encode('Detail'),
				            		Url::to(['operation/view', 'id' => $data->id]),
				            		['class' => 'btn btn-outline btn-circle dark btn-sm black']
				            	);
				            		return $html;
				            	}
				        	]
						]
					])
				?>
			</div>
		</div>
	</div>
	<!-- Server status and Device -->
	<div class="col-md-4">
		<div class="portlet box blue">
			<div class="portlet-title">
                <div class="caption"><?= Html::encode('Server Status') ?></div>
            </div>
			<div class="portlet-body">
				<p>Thank you very much for your letter which arrived a few days ago. It was lovely to hear from you. I am sorry, I haven’t written for you such along time because I studied hard to pass the final exam.Thank you very much for your letter which arrived a few days ago. It was lovely to hear from you. I am sorry, I haven’t written for you such along time because I studied hard to pass the final exam.</p>
			</div>
		</div>
		<div class="portlet box yellow">
			<div class="portlet-title">
                <div class="caption"><?= Html::encode('Devices') ?></div>
            </div>
			<div class="portlet-body">
				<p><?php
					echo implode('</br>', (preg_split("/\n/", $this->context->getConnectedDevices())));
				?></p>
			</div>
		</div>
	</div>
</div>