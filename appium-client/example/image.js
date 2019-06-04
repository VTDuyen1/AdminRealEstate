"use strict";

require("./helpers/setup");

var wd = require("wd"),
	Q = require('q'),
	dateTime = require('./helpers/datetime'),
	actions = require('./helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.scrollTo);
wd.addPromiseChainMethod('draw', actions.draw);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(300000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		// require("./helpers/logging").configure(driver);
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
			.sleep(5000);
	});
	it("Start filling form", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500);
	});
	it("sections_select", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([
							els[9].click()
						])
					});
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500);
	});
	
	it("image_j1", function () {
		return driver
			.elementByAccessibilityId('image_j1')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j2');
	});
	it("image_j2", function () {
		return driver
			.elementByAccessibilityId('image_j2')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j3');
	});
	it("image_j3", function () {
		return driver
			.elementByAccessibilityId('image_j3')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j4');
	});
	it("image_j4", function () {
		return driver
			.elementByAccessibilityId('image_j4')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j5');
	});
	it("image_j5", function () {
		return driver
			.elementByAccessibilityId('image_j5')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("image_j6", function () {
		return driver
			.elementByAccessibilityId('image_j6')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("image_j7", function () {
		return driver
			.elementByAccessibilityId('image_j7')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("image_j8", function () {
		return driver
			.elementByAccessibilityId('image_j8')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("image_j9", function () {
		return driver
			.elementByAccessibilityId('image_j9')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j10');
	});
	it("image_j10", function () {
		return driver
			.elementByAccessibilityId('image_j10')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j11');
	});
	it("image_j11", function () {
		return driver
			.elementByAccessibilityId('image_j11')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j12');
	});
	it("image_j12", function () {
		return driver
			.elementByAccessibilityId('image_j12')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j13');
	});
	it("image_j13", function () {
		return driver
			.elementByAccessibilityId('image_j13')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("image_j14", function () {
		return driver
			.elementByAccessibilityId('image_j14')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("image_j15", function () {
		return driver
			.elementByAccessibilityId('image_j15')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("image_j16", function () {
		return driver
			.elementByAccessibilityId('image_j16')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("image_j17", function () {
		return driver
			.elementByAccessibilityId('image_j17')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j18');
	});
	it("image_j18", function () {
		return driver
			.elementByAccessibilityId('image_j18')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(1000)
			.draw()
			.elementById('vn.rta.rtsurvey:id/fab_actions')
			.tap()
			.elementById('vn.rta.rtsurvey:id/fab_save_and_close')
			.tap();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j19');
	});
	it("image_j19", function () {
		return driver
			.elementByAccessibilityId('image_j19')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j20');
	});
	it("image_j20", function () {
		return driver
			.elementByAccessibilityId('image_j20')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j21');
	});
	it("image_j21", function () {
		return driver
			.elementByAccessibilityId('image_j21')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j22');
	});
	it("image_j22", function () {
		return driver
			.elementByAccessibilityId('image_j22')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j23');
	});
	it("image_j23", function () {
		return driver
			.elementByAccessibilityId('image_j23')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("image_j24", function () {
		return driver
			.elementByAccessibilityId('image_j24')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("image_j25", function () {
		return driver
			.elementByAccessibilityId('image_j25')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("image_j26", function () {
		return driver
			.elementByAccessibilityId('image_j26')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("image_j27", function () {
		return driver
			.elementByAccessibilityId('image_j27')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j28');
	});
	it("image_j28", function () {
		return driver
			.elementByAccessibilityId('image_j28')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j29');
	});
	it("image_j29", function () {
		return driver
			.elementByAccessibilityId('image_j29')
			.then(el => el.elementByClassName('android.widget.Button').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j30');
	});
	it("image_j30", function () {
		return driver
			.elementByAccessibilityId('image_j30')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('image_j31');
	});
	it("image_j31", function () {
		return driver
			.elementByAccessibilityId('image_j31')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.sleep(3000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.click()
			.sleep(1000);
	});
});
