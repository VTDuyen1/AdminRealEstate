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
            .then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[11]//XCUIElementTypeStaticText').tap())
    });
    it("Next Question", function () {
        return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
    });
	it("audio_k1", function () {
		return driver
			.elementByAccessibilityId('audio_k1')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
	});
	it("audio_k2", function () {
		return driver
			.elementByAccessibilityId('audio_k2')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('AudioCaptureView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.first().tap()
	});
	it("audio_k3", function () {
		return driver
			.elementByAccessibilityId('audio_k3')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
	});
	it("audio_k5", function () {
		return driver
			.elementByAccessibilityId('audio_k5')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
	});
	it("audio_k6", function () {
		return driver
			.elementByAccessibilityId('audio_k6')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
	});
	it("audio_k7", function () {
		return driver
			.elementByAccessibilityId('audio_k7')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
			.elementByAccessibilityId('AudioCaptureView')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(0).tap()
	});
	it("audio_k8", function () {
		return driver
			.elementByAccessibilityId('audio_k8')
			.elementByClassName('>', 'XCUIElementTypeButton').tap()
	});
});
