<?php

use yii\db\Migration;

/**
 * Class m190215_025300_input_file
 */
class m190215_025300_input_file extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('input_file', [
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
        $this->dropTable('input_file');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m190215_025300_input_file cannot be reverted.\n";

        return false;
    }
    */
}
