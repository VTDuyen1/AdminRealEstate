<?php

use yii\db\Migration;

/**
 * Handles adding repeat to table `operation`.
 */
class m180621_083943_add_repeat_column_to_operation_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('operation', 'repeat', $this->integer());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('operation', 'repeat');
    }
}
