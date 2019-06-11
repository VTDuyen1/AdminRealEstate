<?php
  
namespace app\models;

use yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\data\ActiveDataProvider;

class User extends ActiveRecord implements IdentityInterface
{
    const STATUS_INACTIVE = 0;  
    const STATUS_ACTIVE   = 1; 
    /**
     * {@inheritdoc}
     */
    public $repassword;

    public static function tableName()
    {
        return 'user';
    }

    public function rules()
    {
        return [
            // [['id'],'id'],
            // username and password are both required 
            // password is validated by validatePassword()
            [['name'], 'string'],
            ['password', 'validatePassword'],
            [['name'], 'unique'],
            [['email'], 'unique'],
            [['email'], 'required'],
            [['email'], 'email'],
            ['name', 'required'],
            ['password', 'required'],     
            ['repassword', 'required'],
            ['repassword', 'compare', 'compareAttribute'=>'password'],
            ['name', 'match', 'pattern'=>'/^[0-9]*[a-zA-Z_]+[a-zA-Z0-9_]*$/','message'=>"Name should contain letters not mere numbers."],
            ['phone_number', 'match', 'pattern'=>'/[0-9]/','message'=>"Please enter number."]

        ];
    }

    public static function findIdentity($id)
    {
        return self::findOne($id);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return self::findOne(["access_token" => $token]);
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($name)
    {
        return self::findOne(['name' => $name]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        // return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        // return $this->auth_key === $authKey;
    }

    /*
        hashpass
    */
    public function hashPass($password){
        return Yii::$app->getSecurity()->generatePasswordHash($password);
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return $password= Yii::$app->getSecurity()->validatePassword($password, $this->password);    

    }

    /*
    */
    public function attributeLabels()
    {
        return [
             'user_id' => 'ID',
            'google_id' => 'Google ID',
            'facebook_id' => 'Facebook ID',
            'name' => 'Name',
            'full_name' => 'Fullname',
            'avatar' => 'Avatar',
            'email' => 'Email',
            'password' => 'Password',
            'phone_number' => 'Phone Number',
            'birthday' => 'Birthday',
            'gender' => 'Gender',
            'accommodation' => 'Accommodation',
            'lattitude' => 'Lattitude',
            'longtitude' => 'Longtitude',
            'indentity' => 'Identity',
            'type_app' => 'Type App',
            'mac_address' => 'Mac Address',
            'device_token' => 'Device Token',
            'create_date' => 'Create Date',
        ];
    }

    /*
    */
    public function search()
    {
        // $query = $this->find()->orderBy('id');
        $query = static::find();

        return new ActiveDataProvider([
            'query'      => $query,
            'pagination' => ['pageSize' => 10]
        ]);
    } 
}
