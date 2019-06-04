<?php

use yii\db\Migration;

/**
 * Handles the creation of table `configuration`.
 */
class m180508_081139_create_configuration_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('configuration', [
            'id'          => $this->primaryKey(),
            'name'        => $this->string(),
            'value'       => $this->string(),
            'description' => $this->string(),
            'created_at'  => $this->dateTime(),
            'updated_at'  => $this->dateTime()
        ]);

        $this->insert('configuration', [
            'name'       => 'test_server',
            'value'      => 'http://localhost'
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('configuration');
    }
}
