<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\data\ActiveDataProvider;

class Post extends ActiveRecord
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE   = 1;
    
    public static function tableName()
    {
        return 'post';
    }

    public function rules()
    {
        return [
            [['title_post', 'type', 'price', 'location', 'latitude', 'longtitude', 'negotiate', 'content', 'phone_number'], 'required'],
            [['description', 'created_date', 'updated_date'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'title_post' => 'Title Post',
            'type' => 'Type',
            'price' => 'Price',
            'location' => 'Location',
            'latitude' => 'Latitude',
            'longtitude' => 'Longtitude',
            'negotiate' => 'Negotiate',
            'created_date' => 'Created Date',
            'created_update' => 'Created Update',
            'content' => 'Content',
            'phone_number' => 'Phone Number'
        ];
    }

    public function search()
    {
        // $query = $this->find()->orderBy('id');
        $query = static::find();

        return new ActiveDataProvider([
            'query'      => $query,
            'pagination' => ['pageSize' => 10],           
            'sort'=> ['defaultOrder' => ['created_date' => 'DESC']]
        ]);
    }
}