<?php  
use yii\helpers\Html;
use yii\widgets\DetailView;

$this->title = Html::encode('View System Users');
?>

<div class="portlet light">
    <div class="portlet-title">
        <div class="caption"><?= Html::encode('View System Users: ' . $model->username) ?></div>
    </div>
    <div class="portlet-body">
        <?php echo DetailView::widget([
            'model' => $model,
            'attributes' => [              
                'username', 
                'fullname',                    
                'email',
                'address',
                'phone_number',
                'date_of_birth',
                                                     
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
               
                [
                    'attribute' => 'status',
                    'format' => 'html',
                    'value' => function($data){
                        if ($data->status) {
                            return Html::tag('span', Html::encode('Active'), ['class' => 'label label-success']);
                        } else {
                            return Html::tag('span', Html::encode('Inactive'), ['class' => 'label label-danger']);
                        }
                    }
                ],
                'created_at:datetime',
                'updated_at:datetime'
            ]
        ]); ?>
    </div>
</div>
