"use strict";

require("../helpers/setup");

var wd = require("wd");


describe("iOS Simulator", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		require("../helpers/logging").configure(driver);

		var desired = {
				automationName: 'XCUITest', 
				browserName: 'safari',
				// browserName: '',
				platformName: 'iOS',
				platformVersion: '12.1',
				deviceName: 'iPhone XR',
				noReset: true,
				// bundleId: 'com.rtsmartsurvey.rtsurvey.ios'
			};
				
		return driver
			.init(desired)
			.setImplicitWaitTimeout(3000);
	});

	it("should get the url", function () {
    return driver
      .get('https://www.google.com')
      .sleep(1000)
      .waitForElementByName('q', 5000)
        .sendKeys('sauce labs')
        .sendKeys(wd.SPECIAL_KEYS.Return)
      .sleep(1000)
      .title().should.eventually.include('sauce labs');
  });
	

});
