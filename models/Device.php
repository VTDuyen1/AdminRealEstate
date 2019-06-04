<?php  

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;

class Device extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE   = 1;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['name', 'serial_number', 'platform', 'version'], 'required'],
            [['description', 'status', 'created_at', 'updated_at'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'name' => 'Name',
            'serial_number' => 'Serial Number',
            'platform' => 'Platform Name',
            'version' => 'Platform Version',
            'description' => 'Description'
        ];
    }

    public function search()
    {
        return new ActiveDataProvider([
            'query'      => static::find(),
            'pagination' => 
                ['pageSize' => 10],
                //search on table device
            'sort'=> ['defaultOrder' => ['created_at' => 'DESC']]
        ]);
    }
}