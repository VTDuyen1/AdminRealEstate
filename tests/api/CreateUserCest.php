<?php 

class CreateUserCest
{
    public function _before(ApiTester $I)
    {
    }

    public function getUserStatus(\ApiTester $I)
    {
        $I->sendGET('/api/status');
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true
        ]);
        
    }

    public function getUserData(\ApiTester $I)
    {
        $I->sendGET('/api/get-user-by-name', ['name' => 'demo']);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'username' => 'demo'
        ]);
        
    }
}
