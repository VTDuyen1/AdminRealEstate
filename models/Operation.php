<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;

class Operation extends ActiveRecord
{
	/**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['test_case_id', 'device_id'], 'required'],
            [['repeat', 'message', 'status', 'file_name', 'created_at', 'updated_at'], 'safe']
        ];
    }

    public function attributeLabels()
    {
        return [
            'test_case_id' => 'Test Cases',
            'device_id'    => 'Devices'
        ];
    }

    public function search()
    {
        return new ActiveDataProvider([
            'query'      => static::find(),
            'pagination' => ['pageSize' => 10],
            'sort'=> ['defaultOrder' => ['created_at' => 'DESC']]
        ]);
    }
}