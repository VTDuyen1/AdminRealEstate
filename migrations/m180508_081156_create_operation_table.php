<?php

use yii\db\Migration;

/**
 * Handles the creation of table `operation`.
 */
class m180508_081156_create_operation_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('operation', [
            'id'           => $this->primaryKey(),
            'test_case_id' => $this->string(),
            'device_id'    => $this->string(),
            'status'       => $this->smallInteger()->defaultValue(1),
            'message'      => $this->string(),
            'file_name'    => $this->string(),
            'created_at'   => $this->dateTime()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('operation');
    }
}
