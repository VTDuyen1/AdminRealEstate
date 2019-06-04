<?php

use yii\db\Migration;

/**
 * Class m190217_155406_output_file
 */
class m190217_155406_output_file extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
          $this->createTable('output_file', [
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
        $this->dropTable('output_file');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m190217_155406_output_file cannot be reverted.\n";

        return false;
    }
    */
}
