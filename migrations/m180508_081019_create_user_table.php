<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m180508_081019_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            /**
             * User authenication
             */
            'id'            => $this->primaryKey(),
            'username'      => $this->string()->unique(),
            'password'      => $this->string(),
            'email'         => $this->string()->unique(),
            'access_token'  => $this->string(),
            'auth_key'      => $this->string(),
            'status'        => $this->smallInteger()->defaultValue(1),

            /**
             * User profile
             */
            'fullname'      => $this->string(),
            'gender'        => $this->smallInteger()->defaultValue(0),
            'date_of_birth' => $this->date(),
            'address'       => $this->string(),
            'phone_number'  => $this->string(),
            'created_at'    => $this->dateTime(),
            'updated_at'    => $this->dateTime()
        ]);

        $this->insert('user', [
            'username'      => 'admin',
            'password'      => Yii::$app->security->generatePasswordHash('admin'),
            'email'         => 'admin@rta.vn',
            'auth_key'      => 'test100key',
            'access_token'  => '100-token'
        ]);

        $this->insert('user', [
            'username'      => 'demo',
            'password'      => Yii::$app->security->generatePasswordHash('demo'),
            'email'         => 'demo@rta.vn',
            'auth_key'      => 'test101key',
            'access_token'  => '101-token'
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user');
    }
}
