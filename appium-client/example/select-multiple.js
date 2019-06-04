"use strict";

require("../helpers/setup");

let wd = require("wd"),
	Q = require('q'),
	dateTime = require('../helpers/datetime'),
	actions  = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.scrollTo);
wd.addPromiseChainMethod('scrollDown', actions.scrollDown);
wd.addPromiseChainMethod('scrollUp', actions.scrollUp);
wd.addPromiseChainMethod('draw', actions.draw);

describe("Test AIO - Appearance (G4 v1712141604) Form", function () {
	this.timeout(2400000);
	var driver;
	var allPassed = true;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		var desired = {
			browserName: '',
			platformName: 'Android',
			platformVersion: '6.0.1',
			deviceName: 'Nexus 7',
			udid: '07d9024f',
			noReset: true,
			appActivity: 'vn.rta.cpms.activities.SplashScreenActivity',
			appPackage: 'vn.rta.rtsurvey'
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
			.catch(function(){
				return driver
					.elementById('vn.rta.rtsurvey:id/recycler')
					.getLocation()
					.then(function (loc) {
						var action = new wd.TouchAction();
						action
							.press({x: loc.x, y: loc.y + 1000})
							.wait(1000)
							.moveTo({x: loc.x, y: loc.y})
							.release();
						return driver.performTouchAction(action).sleep(1000)
					})
					.elementByXPath('//android.widget.TextView[contains(@text, "AIO - Appearance")]')
			})
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
	it("sections_select : 2,16", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[2].tap(), els[16].tap()])
					})
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('se_mul_c1')
			.should.eventually.exist
	});
	it("se_mul_c1 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c1')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[3].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c3"]');
	});
	it("se_mul_c3 : 1,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c3')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[1].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c4"]');
	});
	it("se_mul_c4 : 4,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c4')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[4].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c5"]');
	});
	it("se_mul_c5 : 2,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c5')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[2].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c6"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c6 : 1,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c6')
			.then(function (el) {
				return el
					.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.tap()
					.elementsByClassName('android.widget.CheckedTextView')
					.then(function (els) {
						return Q.all([els[1].tap(), els[2].tap()])
					})
					.elementByClassName('android.widget.Button')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c7"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c7 : 3,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c7')
			.then(function (el) {
				return el
					.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.tap()
					.elementsByClassName('android.widget.CheckedTextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[3].tap()])
					})
					.elementByClassName('android.widget.Button')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c8"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c8 : 2,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c8')
			.then(function (el) {
				return el
					.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.tap()
					.elementsByClassName('android.widget.CheckedTextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[1].tap()])
					})
					.elementByClassName('android.widget.Button')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c9"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c9 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c9')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[1].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c10"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c10 : 3,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c10')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c11"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c11 : 2,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c11')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c12"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c12 : 3,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c12')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c13"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c13 : 4,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c13')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[4].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c14"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c14 : 0,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c14')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c15"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c15 : 0,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c15')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c16"]//android.widget.GridView//android.widget.TextView');
	});
	it("se_mul_c16 : 4,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c16')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[4].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c17"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c17 : 0,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c17')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c18"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c18 : 2,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c18')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c19"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c19 : 1,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c19')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[1].tap(), els[3].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c20"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c20 : 0,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c20')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c21"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c21 : 2,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c21')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[2].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c22"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c22 : 0,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c22')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c23"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c23 : 2,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c23')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c24"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c24 : 4,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c24')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[4].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c25"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c25 : 4,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c25')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[4].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c26"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c26 : 2,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c26')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c27"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c27 : 2,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c27')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[3].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c28"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c28 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c28')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[1].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c29"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c29 : 2,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c29')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_2 = new wd.TouchAction(driver);
				action_2.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_2)
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c30"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c30 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c30')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c31"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c31 : 2,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c31')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_2 = new wd.TouchAction(driver);
				action_2.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_2)
				var action_2 = new wd.TouchAction(driver);
				action_2.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_2)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c32"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c32 : 3,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c32')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				var action_2 = new wd.TouchAction(driver);
				action_2.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_2)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c33"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c33 : 1,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c33')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c34"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c34 : 1,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c34')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c35"]//android.widget.EditText');
	});
	it("se_mul_c35 : 0,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c35')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c35')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c36"]//android.widget.EditText');
	});
	it("se_mul_c36 : 2,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c36')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[3]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c36')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[2]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c37"]//android.widget.EditText');
	});
	it("se_mul_c37 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c37')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c37')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c38"]//android.widget.EditText');
	});
	it("se_mul_c38 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c38')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c38')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[2]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c39"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c39 : 1,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c39')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[1].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c40"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c40 : 2,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c40')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c41"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c41 : 0,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c41')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c42"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c42 : 0,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c42')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[3].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c43"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c43 : 4,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c43')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[4].tap(), els[3].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c44"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c44 : 2,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c44')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[2].tap(), els[3].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c45"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c45 : 0,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c45')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c46"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c46 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c46')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[1].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c47"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c47 : 0,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c47')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c48"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c48 : 1,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c48')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[1].tap(), els[4].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c49"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c49 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c49')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[3].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c50"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("se_mul_c50 : 0,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c50')
			.then(function (el) {
				return el
					.elementsByXPath('//android.widget.LinearLayout[2]//android.widget.TextView')
					.then(function (els) {
						return Q.all([els[0].tap(), els[0].tap()])
					})
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c51"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c51 : 1,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c51')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				var action_2 = new wd.TouchAction(driver);
				action_2.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_2)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c52"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c52 : 3,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c52')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				var action_4 = new wd.TouchAction(driver);
				action_4.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_4)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c53"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c53 : 1,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c53')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c54"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c54 : 4,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c54')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_4 = new wd.TouchAction(driver);
				action_4.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_4)
				var action_0 = new wd.TouchAction(driver);
				action_0.tap({x: loc.x + 100, y: loc.y + 132}).release();
				ma.add(action_0)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c55"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c55 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c55')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				var action_0 = new wd.TouchAction(driver);
				action_0.tap({x: loc.x + 100, y: loc.y + 132}).release();
				ma.add(action_0)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c56"]//android.widget.MultiAutoCompleteTextView');
	});
	it("se_mul_c56 : 3,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c56')
			.then(el => el.elementById('vn.rta.rtsurvey:id/selection_view').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/selection_view')
			.getLocation()
			.then(function (loc) {
				var ma = new wd.MultiAction(driver);
				var action_3 = new wd.TouchAction(driver);
				action_3.tap({x: loc.x + 100, y: loc.y + 324}).release();
				ma.add(action_3)
				var action_1 = new wd.TouchAction(driver);
				action_1.tap({x: loc.x + 100, y: loc.y + 227}).release();
				ma.add(action_1)
				return driver.performMultiAction(ma).sleep(3000);
			})
			.back().back().back();
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c57"]//android.widget.EditText');
	});
	it("se_mul_c57 : 4,2", function () {
		return driver
			.elementByAccessibilityId('se_mul_c57')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[5]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c57')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[3]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c58"]//android.widget.EditText');
	});
	it("se_mul_c58 : 4,3", function () {
		return driver
			.elementByAccessibilityId('se_mul_c58')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[5]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c58')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="se_mul_c59"]//android.widget.EditText');
	});
	it("se_mul_c59 : 3,4", function () {
		return driver
			.elementByAccessibilityId('se_mul_c59')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c59')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[5]//android.widget.TextView').tap())
	});
	it("se_mul_c60 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c60')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
			.elementByAccessibilityId('se_mul_c60')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue('h'))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('se_mul_c61')
			.should.eventually.exist
	});
	it("se_mul_c61 : 4,1", function () {
		return driver
			.elementByAccessibilityId('se_mul_c61')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[4].tap(), els[1].tap()])
					})
			})
	});
	it("se_mul_c62 : 3,0", function () {
		return driver
			.elementByAccessibilityId('se_mul_c62')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[3].tap(), els[0].tap()])
					})
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('exit1')
			.should.eventually.exist
	});
	it("exit1 : 1", function () {
		return driver
			.elementByAccessibilityId('exit1')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.RadioButton').tap())
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('text_q2')
			.should.eventually.exist
	});
	it("text_q2 : ", function () {
		return driver
			.elementByAccessibilityId('text_q2')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap();
			})
	});
});
