<?php

namespace app\models;

use Yii;
use yii\base\Model;
use PhpOffice\PhpSpreadsheet\IOFactory;

class UploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $title_post, $type, $price, $location, $latitude, $longtitude, $negotiate, $content, $phone_number, $image, $video, $feature;
    public $fileNameOld;
    public $uploadImages, $uploadVideos;
    public $json;   
    public $description;

    public function rules()
    {
        return [
            [['title_post'], 'required'],
            [['type'], 'required'],
            [['price'], 'required'],
            [['location'], 'required'],
            [['latitude'], 'required'],
            [['longtitude'], 'required'],
            [['negotiate'], 'required'],
            [['content'], 'required'],
            [['phone_number'], 'required'],
            [['image'], 'required'],
            [['video'], 'required'],
            [['feature'], 'required'],
            [['description'], 'safe'],
            [['uploadImages'], 'file', 'extensions' => 'jpg, png', 'maxFiles' => 10, 'skipOnEmpty' => false],
            [['uploadVideos'], 'file', 'extensions' => 'mp4, mp3', 'maxFiles' => 10, 'skipOnEmpty' => false],
        ];
    }

    public function upload()  
    {      
        // $filePathImage = Yii::$app->basePath.'/uploads/images/'.$this->uploadImage->name;
        // $filePathVideo = Yii::$app->basePath.'/uploads/video/'.$this->uploadVideo->name;
        //  save file to upload folder
        // $this->uploadImage->saveAs($filePathImage); 
        // $this->uploadVideo->saveAs($filePathVideo);
        
        return true;
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
}