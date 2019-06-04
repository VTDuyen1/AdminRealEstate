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
    public $uploadFile;
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
            [['image'], 'file', 'extensions' => 'jpg, png'],
            [['video'], 'file', 'extensions' => 'xls, xlsx'],

        ];
    }

    public function upload()  
    {      
        // $filePath = Yii::$app->basePath.'/uploads/post/'.$this->uploadFile->name;

        // //  save file to upload folder
        // $this->uploadFile->saveAs($filePath);

        // if (isset($_POST['checkform'])) {
        //     // convert file excel to json string on formengine
        //     $this->json = Yii::$app->formengine->xlsx2json($filePath);
        // }
        // else{
        //     // convert file excel to json string
        //     $this->json = Yii::$app->converter->xlsx2json($filePath);
        // }

        /*if (isset($_POST['checked'])) {
             // convert file excel to json string on formengine
            $this->json = Yii::$app->formengine->xlsx2json($filePath);
        }
        else{
            // convert file excel to json string
            $this->json = Yii::$app->converter->xlsx2json($filePath);
        }*/
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