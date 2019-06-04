"use strict";

require("../helpers/setup");

var wd = require("wd");

describe("Test Form Features", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		require("../helpers/logging").configure(driver);

		var desired = {
				automationName: 'XCUITest', 
				browserName: '',
				platformName: 'iOS',
				platformVersion: '12.1',
				deviceName: 'iPhone XR',
				app: '/Users/quangbui/Downloads/rtSurvey_NoMaps.app'
			};
				
		return driver
			.init(desired)
			.setImplicitWaitTimeout(3000);
	});

	it("Login account", function () {
		return driver
			.sleep(3000)
	});

});
