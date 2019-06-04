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
            .then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[12]//XCUIElementTypeStaticText').tap())
    });
    it("Next Question", function () {
        return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
    });
	it("video_l1", function () {
		return driver
			.elementByAccessibilityId('video_l1')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
	});
	it("video_l6", function () {
		return driver
			.elementByAccessibilityId('video_l6')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
	});
	// auto-start-recording
	it("video_l10", function () {
		return driver
			.elementByAccessibilityId('video_l10')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
	});
	// end-stop-10s
	it("video_l12", function () {
		return driver
			.elementByAccessibilityId('video_l12')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
			.sleep(11000)
	});
	// end-stop-20s
	it("video_l13", function () {
		return driver
			.elementByAccessibilityId('video_l13')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('FEOverlayCameraView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
			.sleep(21000)
	});
});
