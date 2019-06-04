"use strict";

require("./../helpers/setup");

var wd = require("wd"),
	Q = require('q'),
	actions = require('./../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.scrollTo);
wd.addPromiseChainMethod('scrollUp', actions.scrollUp);
wd.addPromiseChainMethod('scrollDown', actions.scrollDown);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(2400000);
	var driver;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		require("./../helpers/logging").configure(driver);
		var desired = {
			browserName: '',
			platformName: 'Android',
			platformVersion: '5.1',
			deviceName: 'Nexus 7',
			udid: '072161f6',
			noReset: true,
			appActivity: 'vn.rta.cpms.activities.SplashScreenActivity',
			appPackage: 'vn.rta.rtsurvey'
		};
		return driver
			.init(desired)
			.setImplicitWaitTimeout(3000);
	});
	
	it("Enter pin number", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/pin_input')
			.setImmediateValue('1234')
			.sleep(5000);
	});

	it("Fill new form", function () {
		return driver
			.elementByAccessibilityId("menu_item_form_fillnew")
			.tap();
	});
	it("Open form", function () {
		return driver
			.elementByXPath('//android.widget.TextView[contains(@text, "AIO - Appearance")]')
			.tap()
			.sleep(5000);
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('sections_select')
			.should.eventually.exist
	});
	it("sections_select : 1,16", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[1].tap(), els[16].tap()])
					})
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('se_one_b2')
			.should.eventually.exist
	});
	it("se_one_b2 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b2')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[3]//android.widget.RadioButton').tap())
	});
	it("se_one_b2 : 0", function () {
		return driver
			.elementByAccessibilityId('se_one_b2')
			.then(el => el.elementsByClassName('android.widget.RadioButton'))
			.then(els => els[0].tap())

	});
	it("se_one_b2 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b2')
			.then(el => el.elementsByClassName('android.widget.RadioButton'))
			.at(1)
			.tap()

	});
	/*it("se_one_b3 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b3')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+2*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b4 : 5", function () {
		return driver
			.elementByAccessibilityId('se_one_b4')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+4*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b5 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b5')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b6 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b6')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b7 : 5", function () {
		return driver
			.elementByAccessibilityId('se_one_b7')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+4*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b8 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b8')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+3*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("se_one_b9 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b9')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+3*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b10"]//android.widget.RatingBar');
	});
	it("se_one_b10 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b10')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.RatingBar')
					.then(function (el) {
						return Q.all([
								el.getSize(),
								el.getLocation()
							])
							.then(function (res) {
								let size = res[0];
								let loc  = res[1];
								let yCenter = size.height / 2;
								let starWidth = size.width / 5;
								let action = new wd.TouchAction(driver);
								action.tap({x:loc.x+3*starWidth+yCenter, y:loc.y+yCenter});
								return driver.performTouchAction(action);
							})
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b17"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_one_b17 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b17')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView').tap())
			.elementByXPath('//android.widget.ListView//android.widget.CheckedTextView[3]').tap()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b18"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_one_b18 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b18')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView').tap())
			.elementByXPath('//android.widget.ListView//android.widget.CheckedTextView[1]').tap()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b19"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_one_b19 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b19')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView').tap())
			.elementByXPath('//android.widget.ListView//android.widget.CheckedTextView[4]').tap()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b20"]//android.widget.GridView//android.widget.TextView[4]');
	});
	it("se_one_b20 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b20')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b21"]//android.widget.GridView//android.widget.TextView[4]');
	});
	it("se_one_b21 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b21')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b22"]//android.widget.GridView//android.widget.TextView[2]');
	});
	it("se_one_b22 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b22')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b23"]//android.widget.GridView//android.widget.TextView[1]');
	});
	it("se_one_b23 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b23')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b24"]//android.widget.GridView//android.widget.TextView[1]');
	});
	it("se_one_b24 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b24')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b25"]//android.widget.GridView//android.widget.TextView[2]');
	});
	it("se_one_b25 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b25')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b26"]//android.widget.GridView//android.widget.TextView[4]');
	});
	it("se_one_b26 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b26')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b27"]//android.widget.GridView//android.widget.TextView[1]');
	});
	it("se_one_b27 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b27')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b28"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b28 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b28')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b29"]//android.widget.LinearLayout[2]//android.widget.TextView[1]');
	});
	it("se_one_b29 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b29')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b30"]//android.widget.LinearLayout[2]//android.widget.TextView[4]');
	});
	it("se_one_b30 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b30')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b31"]//android.widget.LinearLayout[2]//android.widget.TextView[3]');
	});
	it("se_one_b31 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b31')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b32"]//android.widget.LinearLayout[2]//android.widget.TextView[3]');
	});
	it("se_one_b32 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b32')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b33"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b33 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b33')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b34"]//android.widget.LinearLayout[2]//android.widget.TextView[1]');
	});
	// error
	it("se_one_b34 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b34')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b35"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b35 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b35')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b36"]//android.widget.LinearLayout[2]//android.widget.TextView[1]');
	});
	it("se_one_b36 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b36')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b37"]//android.widget.LinearLayout[2]//android.widget.TextView[3]');
	});
	it("se_one_b37 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b37')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b38"]//android.widget.LinearLayout[2]//android.widget.TextView[1]');
	});
	it("se_one_b38 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b38')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b39"]//android.widget.LinearLayout[2]//android.widget.TextView[4]');
	});
	it("se_one_b39 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b39')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b40"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b40 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b40')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction(driver);
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b41"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b41 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b41')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290}).release();
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b42"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b42 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b42')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290}).release();
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b43"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b43 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b43')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 205}).release();
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b44"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b44 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b44')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b45"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b45 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b45')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b46"]//android.widget.EditText');
	});
	it("se_one_b46 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b46')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b47"]//android.widget.EditText');
	});
	it("se_one_b47 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b47')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[2]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b48"]//android.widget.EditText');
	});
	it("se_one_b48 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b48')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[3]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b49"]//android.widget.EditText');
	});
	it("se_one_b49 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b49')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b50"]//android.widget.LinearLayout[2]//android.widget.TextView[4]');
	});
	it("se_one_b50 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b50')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b51"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b51 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b51')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b52"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b52 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b52')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b53"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b53 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b53')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b50"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b54 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b54')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b55"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b55 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b55')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b56"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b56 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b56')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b57"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b57 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b57')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b58"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b58 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b58')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b59"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b59 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b59')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b60"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b60 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b60')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b61"]//android.widget.LinearLayout[2]//android.widget.TextView[2]');
	});
	it("se_one_b61 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b61')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b62"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b62 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b62')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b63"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b63 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b63')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b64"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b64 : 0", function () {
		return driver
			.elementByAccessibilityId('se_one_b64')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 120});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b65"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b65 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b65')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b66"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b66 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b66')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 290});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b67"]//*[@resource-id="vn.rta.rtsurvey:id/selection_view"]');
	});
	it("se_one_b67 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b67')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction();
				action.tap({x: loc.x + 100, y: loc.y + 120});
				return driver.performTouchAction(action).sleep(1000)
			})
			.back().back().back()
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b68"]//android.widget.EditText');
	});
	it("se_one_b68 : 1", function () {
		return driver
			.elementByAccessibilityId('se_one_b68')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b69"]//android.widget.EditText');
	});
	it("se_one_b69 : 2", function () {
		return driver
			.elementByAccessibilityId('se_one_b69')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[2]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b70"]//android.widget.EditText');
	});
	it("se_one_b70 : 3", function () {
		return driver
			.elementByAccessibilityId('se_one_b70')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[3]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_one_b71"]//android.widget.EditText');
	});
	it("se_one_b71 : 4", function () {
		return driver
			.elementByAccessibilityId('se_one_b71')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
	});*/
});