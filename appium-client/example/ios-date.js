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

		// var desired = {
		// 		automationName: 'XCUITest', 
		// 		browserName: '',
		// 		platformName: 'iOS',
		// 		platformVersion: '12.1',
		// 		deviceName: 'iPhone XR',
		// 		noReset: true,
		// 		clearSystemFiles: true,
		// 		bundleId: 'com.rtsmartsurvey.rtsurvey.ios'
		// 	};
        let desired = {
            automationName: 'XCUITest',
            browserName: '',
            platformName: 'iOS',
            platformVersion: '10.3.3',
            deviceName: 'QC Team',
            xcodeOrgId: 'C253N945M7',
			udid: 'auto',
            bundleId: 'com.rtsmartsurvey.rtsurvey.ios',
            noReset: true
        };
				
		return driver
			.init(desired)
			.setImplicitWaitTimeout(10000);
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
			.elementByXPath('//XCUIElementTypeStaticText[contains(@name, "AIO - Appearance")]')
			.tap()
			.sleep(8000)
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});

	it("sections_select : 12,13,14", function () {
        return driver
            .elementByAccessibilityId('sections_select')
            .then(function (el) {
                return el
                    .elementsByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
                    .then(function (els) {
                        return Q.all([els[12].tap(), els[13].tap(), els[14].tap()])
                    })
            })
    });
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("date_m3", function () {
		return driver
			.elementByAccessibilityId('date_m3')
			.elementByAccessibilityId('>', 'day_view')
			.elementByAccessibilityId('>', 'cong')
			.tap().tap().tap()
			.elementByAccessibilityId('date_m3')
			.elementByAccessibilityId('>', 'month_view')
			.elementByAccessibilityId('>', 'cong')
			.tap().tap()
			.elementByAccessibilityId('date_m3')
			.elementByAccessibilityId('>', 'year_view')
			.elementByAccessibilityId('>', 'tru')
			.tap()
	});
	it("date_m8", function () {
		return driver
			.elementByAccessibilityId('date_m8')
			.elementByAccessibilityId('>', 'day_view')
			.elementByAccessibilityId('>', 'cong')
			.tap().tap().tap()
			.elementByAccessibilityId('date_m8')
			.elementByAccessibilityId('>', 'month_view')
			.elementByAccessibilityId('>', 'cong')
			.tap().tap()
			.elementByAccessibilityId('date_m8')
			.elementByAccessibilityId('>', 'year_view')
			.elementByAccessibilityId('>', 'tru')
			.tap()
	});
	// it("Next Question", function () {
	// 	return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	// });
	// it("time_n3", function () {
	// 	return driver
	// 		.elementByAccessibilityId('time_n3')
	// 		.elementByAccessibilityId('>', 'hour_view')
	// 		.elementByAccessibilityId('>', 'cong')
	// 		.tap().tap()
	// 		.elementByAccessibilityId('time_n3')
	// 		.elementByAccessibilityId('>', 'minute_view')
	// 		.elementByAccessibilityId('>', 'tru')
	// 		.tap().tap()
	// });
});
