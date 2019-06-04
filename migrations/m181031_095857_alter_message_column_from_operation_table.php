<?php

use yii\db\Migration;

/**
 * Class m181031_095857_alter_message_column_from_operation_table
 */
class m181031_095857_alter_message_column_from_operation_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->alterColumn('operation', 'message', $this->getDb()->getSchema()->createColumnSchemaBuilder('longtext'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m181031_095857_alter_message_column_from_operation_table cannot be reverted.\n";

        return false;
    }
}
