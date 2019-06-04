<?php

use yii\db\Migration;

/**
 * Handles the creation of table `device`.
 */
class m180508_081205_create_device_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('device', [
            'id'            => $this->primaryKey(),
            'name'          => $this->string(),
            'serial_number' => $this->string(),
            'platform'      => $this->string(),
            'version'       => $this->string(),
            'description'   => $this->string(),
            'status'        => $this->smallInteger()->defaultValue(1),
            'created_at'    => $this->dateTime(),
            'updated_at'    => $this->dateTime()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('device');
    }
}
