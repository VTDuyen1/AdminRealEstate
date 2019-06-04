"use strict";

require("../helpers/setup");

var wd = require("wd"),
	Q = require('q'),
	actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.scrollTo);
wd.addPromiseChainMethod('scrollDown', actions.scrollDown);

describe("Test Form Features", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		// require("../helpers/logging").configure(driver);

		var desired = {
			automationName: 'XCUITest', 
			browserName: '',
			platformName: 'iOS',
			platformVersion: '12.1',
			deviceName: 'iPhone XR',
			noReset: true,
			bundleId: 'com.rtsmartsurvey.rtsurvey.ios'
		};

		return driver
			.init(desired)
			.setImplicitWaitTimeout(5000);
	});

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
			.elementByXPath('//XCUIElementTypeStaticText[contains(@name, "Search_Autocomplete")]')
			.tap()
			.sleep(8000)
	});

	it("Next Question", function () {
		return driver.swipe({ startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000}).sleep(1000)
	});

	// it("key2", function () {
	// 	return driver
	// 		.elementByAccessibilityId('key2')
	// 		.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
	// 		.sendKeys("ph")
	// });

	it("Next Question", function () {
		return driver.swipe({ startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});

	// it("a1", function () {
	// 	return driver
	// 		.elementByAccessibilityId('a1')
	// 		.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
	// 		.sendKeys("a")
	// 		.elementByClassName('XCUIElementTypeTable')
	// 		.elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
	// 		.hideKeyboard()
	// });

	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("a4", function () {
		return driver
			.elementByAccessibilityId('a4')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
			.sendKeys("a")
			.elementByClassName('XCUIElementTypeTable')
			.elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
	});


	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("a10", function () {
		return driver
			.elementByAccessibilityId('a10')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
			.sendKeys("a")
			.elementByClassName('XCUIElementTypeTable')
			.elementByXPath('>', '//XCUIElementTypeCell[4]').tap()
	});

});
