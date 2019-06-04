"use strict";

require("../helpers/setup");

var wd = require("wd"),
	Q  = require('q'),
    _p = require('../helpers/promise-utils'),
	actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);
wd.addPromiseChainMethod('scrollDown', actions.iScrollDown);


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
				noReset: true,
				clearSystemFiles: true,
				bundleId: 'com.rtsmartsurvey.rtsurvey.ios'
			};
   //      let desired = {
   //          automationName: 'XCUITest',
   //          browserName: '',
   //          platformName: 'iOS',
   //          platformVersion: '10.3.3',
   //          deviceName: 'QC Team',
   //          xcodeOrgId: 'C253N945M7',
			// udid: 'auto',
   //          bundleId: 'com.rtsmartsurvey.rtsurvey.ios',
   //          noReset: true
   //      };
				
		return driver
			.init(desired)
			.setImplicitWaitTimeout(10000);
	});

	// afterEach(function () {
	// 	return driver.sleep(1000);
	// });

	it("Enter pin number", function () {
		return driver
			.elementByAccessibilityId('1')
			.tap()
			.elementByAccessibilityId('2')
			.tap()
			.elementByAccessibilityId('3')
			.tap()
			.elementByAccessibilityId('4')
			.tap()
			.sleep(3000)
	});
	
	it("Fill new form", function () {
		return driver
			.elementByAccessibilityId('cell_fill_form')
			.tap()
	});
	
	it("Open form", function () {
		return driver
			.elementByXPath('//XCUIElementTypeStaticText[contains(@name, "AIO - Appearance")]')
			.tap()
			.sleep(8000)
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("sections_select", function () {
		return driver
			.elementByAccessibilityId('sections_select')
            .elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeOther[9]//XCUIElementTypeStaticText').tap()
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("gpoint_1", function () {
		return driver
			.elementByAccessibilityId('gpoint_1')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('ic mylocation').tap()
			.sleep(5000)
			.elementByName('ic menu save').tap()
	});
	it("gpoint_2", function () {
		return driver
			.elementByAccessibilityId('gpoint_2')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('ic mylocation').tap()
			.sleep(5000)
			.elementByName('ic menu save').tap()
	});
	it("gpoint_3", function () {
		return driver
			.elementByAccessibilityId('gpoint_3')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('SET').tap()
	});
	it("gpoint_4", function () {
		return driver
			.elementByAccessibilityId('gpoint_4')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('CANCEL').tap()
	});
	it("gpoint_5", function () {
		return driver
			.elementByAccessibilityId('gpoint_5')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('ic mylocation').tap()
			.sleep(5000)
			.elementByName('ic menu save').tap()
	});
	it("Scroll down", function () {
		return driver.scrollDown();
	});
	it("gpoint_6", function () {
		return driver
			.elementByAccessibilityId('gpoint_6')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
			.elementByName('ic mylocation').tap()
			.sleep(5000)
			.elementByName('ic menu save').tap()
	});
});
