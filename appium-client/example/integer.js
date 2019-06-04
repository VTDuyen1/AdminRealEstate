"use strict";

require("./helpers/setup");

var wd = require("wd"),
	Q = require('q'),
	actions = require('./helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.scrollTo);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		require("./helpers/logging").configure(driver);
		var desired = {
			browserName: '',
			platformName: 'Android',
			platformVersion: '6.0.1',
			deviceName: 'Nexus 7',
			udid: '07d9024f',
			noReset: true,
			appActivity: 'vn.rta.cpms.activities.FormSelectionActivity',
			appPackage: 'vn.rta.rtsurvey'
		};
		return driver
			.init(desired)	
			.setImplicitWaitTimeout(2000);
	});

	it("Open form", function () {
		return driver
			.elementByXPath('//android.widget.TextView[@text=\'AIO - Appearance (G4 v1712141604)\']')
			.click()
			.sleep(3000);
	});
	it("Start filling form", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/form_start_bling')
			.flick(-500, 1, 500);
	});
	it("sections_select", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return els[3].click();
					});
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/toolbar')
			.flick(-500, 1, 500);
	});
	it("int_d9", function () {
		return driver
			.elementByAccessibilityId('int_d9')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.EditText')
					.clear()
					.setImmediateValue('113')
					.hideKeyboard();
			})
	});
	
});
