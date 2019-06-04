"use strict";

require("../helpers/setup");

var wd = require("wd"),
	Q = require('q'),
	dateTime = require('../helpers/datetime'),
	actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);
wd.addPromiseChainMethod('scrollDown', actions.iScrollDown);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(300000);
	var driver;

	before(function () {
        driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
        // require("../helpers/logging").configure(driver);

        // let desired = {
        //         automationName: 'XCUITest', 
        //         browserName: '',
        //         platformName: 'iOS',
        //         platformVersion: '12.1',
        //         deviceName: 'iPhone XR',
        //         noReset: true,
        //         bundleId: 'com.rtsmartsurvey.rtsurvey.ios'
        //     };

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
            .setImplicitWaitTimeout(5000);
    });

	// it("Enter pin number", function () {
 //        return driver
 //          .elementByAccessibilityId('1')
 //          .tap()
 //          .elementByAccessibilityId('2')
 //          .tap()
 //          .elementByAccessibilityId('3')
 //          .tap()
 //          .elementByAccessibilityId('4')
 //          .tap()
 //          .sleep(3000)
 //    });
    it("Fill new form", function () {
        return driver
            .elementByAccessibilityId('cell_fill_form')
            .tap()
    });
	it("Scroll down", function () {
		return driver.scrollDown();
	});
    it("Open form", function () {
        return driver
            .elementByXPath('//XCUIElementTypeStaticText[contains(@name, "AIO - Appearance")]')
            .tap()
            .sleep(10000)
    });
    it("Next Question", function () {
        return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
    });
    it("sections_select", function () {
        return driver
            .elementByAccessibilityId('sections_select')
            .then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[6]//XCUIElementTypeStaticText').tap())
    });
    it("Next Question", function () {
        return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
    });
	it("bar_f1", function () {
		return driver
			.elementByAccessibilityId('bar_f1')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
	});
	it("bar_f2", function () {
		return driver
			.elementByAccessibilityId('bar_f2')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
	});
	it("bar_f3", function () {
		return driver
			.elementByAccessibilityId('bar_f3')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
	});
	it("bar_f4", function () {
		return driver
			.elementByAccessibilityId('bar_f4')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
	});
	it("bar_f5", function () {
		return driver
			.elementByAccessibilityId('bar_f5')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.sleep(5000)
	});
});
