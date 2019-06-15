<?php
use yii\helpers\Html;
use yii\widgets\DetailView;

$this->title = Html::encode('View Post');
?>

<div class="portlet light">
    <div class="portlet-title">
        <div class="caption"><?= Html::encode('' . $model->title_post) ?></div>
    </div>
    <div class="portlet-body">
        <?php echo DetailView::widget([
            'model' => $model,
            'attributes' => [
                'post_id',
                'type',
                'price',
                'location',
                'latitude',
                'longtitude',
                'negotiate',
                'content',
                'phone_number',
            ]
        ]); ?>
    </div>
</div>
