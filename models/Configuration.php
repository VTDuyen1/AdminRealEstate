<?php

namespace app\models;

use yii\db\ActiveRecord;

class Configuration extends ActiveRecord
{
	/**
     * get all config
     * To get config in controller, use:
	 * $model = new Configuration();
     * $data = $model->getConfig();
     */

     public function rules()
    {
        return [
            [['value'], 'required'],
            [['created_date', 'updated_at'], 'safe'],
            [['name','value','description'], 'string'],
            // verifyCode needs to be entered correctly
        ];

        return [
            
            
        ];
    }

    /**
     * @return array customized attribute labels
     */
    public function attributeLabels()
    {
        return [
            'name' => 'Name',
            'value'=>'Test Server',
        ];
    }
   
    /*public static function tableName()
    {
        return 'user';
    }*/
}
