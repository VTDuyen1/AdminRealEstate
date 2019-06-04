<?php

use yii\db\Migration;

/**
 * Handles the creation of table `test_case`.
 */
class m180508_081148_create_test_case_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('test_case', [
            'id'          => $this->primaryKey(),
            'name'        => $this->string(),
            'value'       => $this->text(),
            'file_name'   => $this->string(),
            'description' => $this->string(),
            'status'      => $this->smallInteger()->defaultValue(1),
            'created_at'  => $this->dateTime(),
            'updated_at'  => $this->dateTime()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('test_case');
    }
}
