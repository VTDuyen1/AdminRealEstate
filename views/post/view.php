<?php
use yii\helpers\Html;
use yii\widgets\DetailView;

$this->title = Html::encode('View Post');
?>

<div class="portlet light">
    <div class="portlet-title">
        <div class="caption"><?= Html::encode('View Post: ' . $model->name) ?></div>
    </div>
    <div class="portlet-body">
        <?php echo DetailView::widget([
            'model' => $model,
            'attributes' => [
                'id',
                'name',
                'file_name',
                'description',
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
