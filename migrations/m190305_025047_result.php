<?php

use yii\db\Migration;

/**
 * Class m190305_025047_result
 */
class m190305_025047_result extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('result', [
            /**
             * User authenication   
             */
            'id'              => $this->primaryKey(),
            'expected_result' => $this->string(),
            'actual_result'   => $this->string()->defaultValue(''),
            'log'             => $this->string(),
            'image'           => $this->string(),
            'time'            => $this->dateTime(),
            'result'          => $this->smallInteger()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('result');
    }
}
