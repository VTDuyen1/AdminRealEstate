"use strict";

require("../helpers/setup");

var wd = require("wd"),
	Q  = require('q'),
    _p = require('../helpers/promise-utils'),
	actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);


describe("Test Form Features", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		require("../helpers/logging").configure(driver);

		var desired = {
				automationName: 'XCUITest', 
				// browserName: 'safari',
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
			.sleep(3000)
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	it("sections_select", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.elementsByClassName('>', 'XCUIElementTypeStaticText')
			.then(function (els) {
				return Q.all([els[2].tap(), els[3].tap()])
			});
	});
	it("Next Question", function () {
		return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
	});
	// it("se_one_b2", function () {
	// 	return driver
	// 		.elementsByAccessibilityId('se_one_b2')
	// 		.then(_p.filterDisplayed)
	// 		.then(function (els) {els.should.have.length(1); return els;})
	// 		.first()
	// 		.elementsByClassName('>', 'XCUIElementTypeButton')
	// 		.at(1).tap()
	// });
	/*it("se_one_b2 1", function () {
		return driver
			// .elementsByAccessibilityId('se_one_b2')
			// .then(_p.filterDisplayed)
			// .then(function (els) {els.should.have.length(1); return els;})
			// .first()
			.elementByAccessibilityId('se_one_b2')
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(1).tap()
	});*/
	it("se_one_b2 2", function () {
		return driver
			// .elementsByAccessibilityId('se_one_b2')
			// .then(_p.filterDisplayed)
			// .then(function (els) {els.should.have.length(1); return els;})
			// .first()
			.elementByAccessibilityId('se_one_b2')
			.then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[3]//XCUIElementTypeButton').tap())
	});
	it("se_one_b3", function () {
		return driver
			.elementsByAccessibilityId('se_one_b3')
			.then(_p.filterDisplayed)
			.then(els => {els.should.have.length(1); return els;})
			.first()
			.elementsByClassName('>', 'XCUIElementTypeButton')
			.at(0).tap()
	});
	it("se_one_b4", function () {
		return driver
			.elementByAccessibilityId('se_one_b4')
			.elementsByClassName('>', 'XCUIElementTypeButton').at(1).tap()
	});
	it("se_one_b5", function () {
		return driver
			.elementByAccessibilityId('se_one_b5')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[3]').tap())
	});
	it("se_one_b6", function () {
		return driver
			.elementByAccessibilityId('se_one_b6')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[4]').tap())
	});
	it("se_one_b7", function () {
		return driver
			.elementByAccessibilityId('se_one_b7')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[5]').tap())
	});
	it("se_one_b8", function () {
		return driver
			.elementByAccessibilityId('se_one_b8')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[5]').tap())
	});
	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b9", function () {
		return driver
			.elementByAccessibilityId('se_one_b9')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[5]').tap())
	});
	it("se_one_b10", function () {
		return driver
			.elementByAccessibilityId('se_one_b10')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[5]').tap())
	});
	// it("se_one_b11", function () {
	// 	return driver
	// 		.elementByAccessibilityId('se_one_b11')
	// 		.then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[5]//XCUIElementTypeButton').tap())
	// });
	it("Scroll to b17", function () {
		return driver.scrollTo('se_one_b17');
	});
	
	it("se_one_b17", function () {
		return driver
			.elementByAccessibilityId('se_one_b17')
			.then(el => el.elementByClassName('XCUIElementTypeButton').tap())
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
			.elementByName('Done').tap()
	});
	/*it("se_one_b18", function () {
		return driver
			.elementByAccessibilityId('se_one_b18')
			.then(el => el.elementByClassName('XCUIElementTypeButton').tap())
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[1]').tap())
			.elementByName('Done').tap()
	});
	it("se_one_b19", function () {
		return driver
			.elementByAccessibilityId('se_one_b19')
			.then(el => el.elementByClassName('XCUIElementTypeButton').tap())
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeButton[1]').tap())
			.elementByName('Done').tap()
	});
	it("se_one_b20", function () {
		return driver
			.elementByAccessibilityId('se_one_b20')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b21", function () {
		return driver
			.elementByAccessibilityId('se_one_b21')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b22", function () {
		return driver
			.elementByAccessibilityId('se_one_b22')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b23", function () {
		return driver
			.elementByAccessibilityId('se_one_b23')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b24", function () {
		return driver
			.elementByAccessibilityId('se_one_b24')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b25", function () {
		return driver
			.elementByAccessibilityId('se_one_b25')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b26", function () {
		return driver
			.elementByAccessibilityId('se_one_b26')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b27", function () {
		return driver
			.elementByAccessibilityId('se_one_b27')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b28", function () {
		return driver
			.elementByAccessibilityId('se_one_b28')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b29", function () {
		return driver
			.elementByAccessibilityId('se_one_b29')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b30", function () {
		return driver
			.elementByAccessibilityId('se_one_b30')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b31", function () {
		return driver
			.elementByAccessibilityId('se_one_b31')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b32", function () {
		return driver
			.elementByAccessibilityId('se_one_b32')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b33", function () {
		return driver
			.elementByAccessibilityId('se_one_b33')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b34", function () {
		return driver
			.elementByAccessibilityId('se_one_b34')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b35", function () {
		return driver
			.elementByAccessibilityId('se_one_b35')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b36", function () {
		return driver
			.elementByAccessibilityId('se_one_b36')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b37", function () {
		return driver
			.elementByAccessibilityId('se_one_b37')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b38", function () {
		return driver
			.elementByAccessibilityId('se_one_b38')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b39", function () {
		return driver
			.elementByAccessibilityId('se_one_b39')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b40", function () {
		return driver
			.elementByAccessibilityId('se_one_b40')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b41", function () {
		return driver
			.elementByAccessibilityId('se_one_b41')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b42", function () {
		return driver
			.elementByAccessibilityId('se_one_b42')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b43", function () {
		return driver
			.elementByAccessibilityId('se_one_b43')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b44", function () {
		return driver
			.elementByAccessibilityId('se_one_b44')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b45", function () {
		return driver
			.elementByAccessibilityId('se_one_b45')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b46", function () {
		return driver
			.elementByAccessibilityId('se_one_b46')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b47", function () {
		return driver
			.elementByAccessibilityId('se_one_b47')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b48", function () {
		return driver
			.elementByAccessibilityId('se_one_b48')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b49", function () {
		return driver
			.elementByAccessibilityId('se_one_b49')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b50", function () {
		return driver
			.elementByAccessibilityId('se_one_b50')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b51", function () {
		return driver
			.elementByAccessibilityId('se_one_b51')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b52", function () {
		return driver
			.elementByAccessibilityId('se_one_b52')
			.then(function (el) {
				return el
					.elementsByClassName('XCUIElementTypeCell')
					.then(function (els) {
						return els[0].tap()
					})
			})
	});
	it("se_one_b53", function () {
		return driver
			.elementByAccessibilityId('se_one_b53')
			.then(function (el) {
				return el
					.elementsByClassName('XCUIElementTypeCell')
					.then(function (els) {
						return els[0].tap()
					})
			})
	});
	it("se_one_b54", function () {
		return driver
			.elementByAccessibilityId('se_one_b54')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b55", function () {
		return driver
			.elementByAccessibilityId('se_one_b55')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b56", function () {
		return driver
			.elementByAccessibilityId('se_one_b56')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down 7", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b57", function () {
		return driver
			.elementByAccessibilityId('se_one_b57')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b58", function () {
		return driver
			.elementByAccessibilityId('se_one_b58')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b59", function () {
		return driver
			.elementByAccessibilityId('se_one_b59')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b60", function () {
		return driver
			.elementByAccessibilityId('se_one_b60')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b61", function () {
		return driver
			.elementByAccessibilityId('se_one_b61')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("Scroll Down 8", function () {
		return driver.swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
	});
	it("se_one_b62", function () {
		return driver
			.elementByAccessibilityId('se_one_b62')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b63", function () {
		return driver
			.elementByAccessibilityId('se_one_b63')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b64", function () {
		return driver
			.elementByAccessibilityId('se_one_b64')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b65", function () {
		return driver
			.elementByAccessibilityId('se_one_b65')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b66", function () {
		return driver
			.elementByAccessibilityId('se_one_b66')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b67", function () {
		return driver
			.elementByAccessibilityId('se_one_b67')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b68", function () {
		return driver
			.elementByAccessibilityId('se_one_b68')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b69", function () {
		return driver
			.elementByAccessibilityId('se_one_b69')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b70", function () {
		return driver
			.elementByAccessibilityId('se_one_b70')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});
	it("se_one_b71", function () {
		return driver
			.elementByAccessibilityId('se_one_b71')
			.then(el => el.elementByClassName('XCUIElementTypeTextView').setImmediateValue('a'))
			.elementByClassName('XCUIElementTypeTable')
			.then(el => el.elementByXPath('//XCUIElementTypeCell[1]').tap())
	});*/

});
