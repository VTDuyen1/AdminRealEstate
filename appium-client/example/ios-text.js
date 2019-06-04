"use strict";

require("../helpers/setup");

let wd = require("wd"),
	Q = require('q'),
	dateTime = require('../helpers/datetime'),
	actions  = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(2400000);
	var driver;
	var allPassed = true;

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
			.setImplicitWaitTimeout(3000);
	});

	after(function () {
		console.log(allPassed ? '[PASSED]' : '[FAILED]');
	});

	afterEach(function () {
		allPassed = allPassed && this.currentTest.state === 'passed';
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
			.sleep(3000)
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("sections_select", function () {
		return driver
			.elementByAccessibilityId('sections_select')
            .then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[16]//XCUIElementTypeStaticText').tap())
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("close error popup", function () {
		return driver.elementByName('OK').tap()
	})
	it("text_p1", function () {
		return driver
			.elementByAccessibilityId('text_p1')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
			.sendKeys('-1234 appium')
			// .sendKeys(wd.SPECIAL_KEYS.Return)
			// .sendKeys(wd.SPECIAL_KEYS.Cancel)
			// .sendKeys(wd.SPECIAL_KEYS.Clear)
			// .sendKeys(wd.SPECIAL_KEYS.Subtract)
			// .sendKeys(wd.SPECIAL_KEYS.Add)
			// .hideKeyboard({"key":"Done","strategy":"pressKey"})
			// .hideKeyboard({strategy: "pressKey", key: "Home"})
			// .hideKeyboard({keyName: "Done"})
			// .getValue().should.become('1234 appium')
            // .elementByName('Done').click().sleep(1000);
	})
	// it("text_p1 : magna lorem sit amet enim", function () {
	// 	return driver
	// 		.elementByAccessibilityId('text_p1')
	// 		.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
	// 		.sendKeys("magna lorem sit amet enim")
	// })
	
	/*it("text_p2 : 2100716311", function () {
		return driver
			.elementByAccessibilityId('text_p2')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView').tap()
			.elementByName('2').tap().elementByName('1').tap().elementByName('0').tap().elementByName('0').tap().elementByName('7').tap().elementByName('1').tap().elementByName('6').tap().elementByName('3').tap().elementByName('1').tap().elementByName('1').tap()
	})
	it("text_p3 : 1361119944", function () {
		return driver
			.elementByAccessibilityId('text_p3')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView').tap()
			.elementByName('1').tap().elementByName('3').tap().elementByName('6').tap().elementByName('1').tap().elementByName('1').tap().elementByName('1').tap().elementByName('9').tap().elementByName('9').tap().elementByName('4').tap().elementByName('4').tap()
	})
	it("text_p4 : 728812929", function () {
		return driver
			.elementByAccessibilityId('text_p4')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView')
			.sendKeys("728812929")
	})
	it("text_p7", function () {
		return driver
			.elementByAccessibilityId('text_p7')
			.elementByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeTextView//XCUIElementTypeButton').tap()
			.elementByClassName('XCUIElementTypeTable')
			.elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
	});*/
	/*it("Scroll To Specific Question", function () {
		return driver.scrollTo('text_p9');
	});
	it("text_p9", function () {
		return driver
			.elementByAccessibilityId('text_p9')
			.elementByClassName('>', 'XCUIElementTypeTextView').tap()
			.elementByAccessibilityId('text_popup_view')
			.elementByClassName('>', 'XCUIElementTypeTextView')
			.sendKeys("nisl dapibus volutpat non non felis. Vivamus dictum ac elit ac bibendum. Suspendisse potenti. Donec vitae tortor vitae sem blandit")
			.elementByAccessibilityId('text_popup_view')
			.elementByName('>', 'Done').tap()
	})
	it("text_p10", function () {
		return driver
			.elementByAccessibilityId('text_p10')
			.elementByClassName('>', 'XCUIElementTypeTextView')
			.sendKeys("commodo justo. Pellentesque non ipsum at massa egestas feugiat eu in velit. Maecenas molestie magna et neque auctor vestibulum. Proin")
	})*/
	
});
