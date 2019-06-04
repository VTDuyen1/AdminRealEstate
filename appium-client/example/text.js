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
		// require("../helpers/logging").configure(driver);
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
	it("sections_select : 15,16", function () {
		return driver
			.elementByAccessibilityId('sections_select')
			.then(function (el) {
				return el
					.elementsByClassName('android.widget.CheckBox')
					.then(function (els) {
						return Q.all([els[15].tap(), els[16].tap()])
					})
			})
	});
	it("Next Question", function () {
		return driver
			.elementById('vn.rta.rtsurvey:id/questionholder')
			.flick(-500, 1, 500)
			.elementByAccessibilityId('text_p1')
			.should.eventually.exist
	});
	it("text_p1 : eget velit non ex semper cursus. Praesent ultricies diam leo, et congue elit ultrices non. Pellentesque egestas venenatis turpis. Aenean", function () {
		return driver
			.elementByAccessibilityId('text_p1')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("eget velit non ex semper cursus. Praesent ultricies diam leo, et congue elit ultrices non. Pellentesque egestas venenatis turpis. Aenean")
			.hideKeyboard();
	})
	it("text_p2 : -1558159800", function () {
		return driver
			.elementByAccessibilityId('text_p2')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("-1558159800")
			.hideKeyboard();
	})
	it("text_p3 : -869310709", function () {
		return driver
			.elementByAccessibilityId('text_p3')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("-869310709")
			.hideKeyboard();
	})
	it("text_p4 : 684075004", function () {
		return driver
			.elementByAccessibilityId('text_p4')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("684075004")
			.hideKeyboard();
	})
	it("text_p5 : 0", function () {
		return driver
			.elementByAccessibilityId('text_p5')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.elementByAccessibilityId('text_p5')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.EditText')
					.getLocation()
					.then(function (loc) {
						var action = new wd.TouchAction(driver);
						action.tap({x: loc.x + 20, y: loc.y + 100});
						return driver.performTouchAction(action);
					});
			})
	});
	it("text_p6 : 0", function () {
		return driver
			.elementByAccessibilityId('text_p6')
			.then(el => el.elementsByClassName('android.widget.RadioButton'))
			.at(1)
			.tap()
	});
	it("text_p7 : 1", function () {
		return driver
			.elementByAccessibilityId('text_p7')
			.then(el => el.elementByClassName('android.widget.ImageButton').tap())
			.elementByAccessibilityId('text_p7')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.getLocation()
			.then(function (loc) {
				var action = new wd.TouchAction(driver);
				action.tap({x: loc.x + 20, y: loc.y + 160});
				return driver.performTouchAction(action);
			});
	});
	it("text_p8 : 1", function () {
		return driver
			.elementByAccessibilityId('text_p8')
			.then(el => el.elementByXPath('//android.widget.RadioButton[1]').tap())
	});
	it("text_p8 : 2", function () {
		return driver
			.elementByAccessibilityId('text_p8')
			.then(el => el.elementByXPath('//android.widget.RadioButton[2]').tap())
	});
	it("text_p8 : 3", function () {
		return driver
			.elementByAccessibilityId('text_p8')
			.then(el => el.elementByXPath('//android.widget.RadioGroup//android.widget.RadioButton[3]').tap())
	});
	it("text_p8 : 4", function () {
		return driver
			.elementByAccessibilityId('text_p8')
			.then(el => el.elementByXPath('//android.widget.RadioGroup//android.widget.RadioButton[4]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="text_p9"]');
	});
	it("text_p9 : bibendum, placerat enim vitae, tristique sapien. Proin aliquet non risus sit amet porttitor. Donec malesuada leo sit amet lacus venenatis,", function () {
		return driver
			.elementByAccessibilityId('text_p9')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("bibendum, placerat enim vitae, tristique sapien. Proin aliquet non risus sit amet porttitor. Donec malesuada leo sit amet lacus venenatis,")
			.elementById('vn.rta.rtsurvey:id/btOk')
			.tap();
	})
	it("text_p10 : non ipsum at massa egestas feugiat eu in velit. Maecenas molestie magna et neque auctor vestibulum. Proin eget velit non", function () {
		return driver
			.elementByAccessibilityId('text_p10')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("non ipsum at massa egestas feugiat eu in velit. Maecenas molestie magna et neque auctor vestibulum. Proin eget velit non")
			.hideKeyboard();
	})
	it("text_p11 : semper cursus. Praesent ultricies diam leo, et congue elit ultrices non. Pellentesque egestas venenatis turpis. Aenean ultricies sapien quis diam", function () {
		return driver
			.elementByAccessibilityId('text_p11')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("semper cursus. Praesent ultricies diam leo, et congue elit ultrices non. Pellentesque egestas venenatis turpis. Aenean ultricies sapien quis diam")
			.hideKeyboard();
	})
	it("text_p12 : elit. Cras varius eget ex et cursus. Curabitur nec accumsan lectus. Morbi vehicula, nunc vel accumsan laoreet, eros purus bibendum", function () {
		return driver
			.elementByAccessibilityId('text_p12')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("elit. Cras varius eget ex et cursus. Curabitur nec accumsan lectus. Morbi vehicula, nunc vel accumsan laoreet, eros purus bibendum")
			.hideKeyboard();
	})
	it("text_p13 : turpis. Fusce non eros justo. Aenean vitae tellus porta, consectetur metus ut, viverra tortor. Aenean tincidunt dui augue, eget facilisis", function () {
		return driver
			.elementByAccessibilityId('text_p13')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("turpis. Fusce non eros justo. Aenean vitae tellus porta, consectetur metus ut, viverra tortor. Aenean tincidunt dui augue, eget facilisis")
			.hideKeyboard();
	})
	it("text_p14 : nibh. Nullam vitae lorem ac justo pulvinar luctus. Donec et pharetra sapien. Curabitur nec risus felis. Proin maximus rhoncus nisi,", function () {
		return driver
			.elementByAccessibilityId('text_p14')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("nibh. Nullam vitae lorem ac justo pulvinar luctus. Donec et pharetra sapien. Curabitur nec risus felis. Proin maximus rhoncus nisi,")
			.hideKeyboard();
	})
	it("text_p15 : 30", function () {
		return driver
			.elementByAccessibilityId('text_p15')
			.then(el => el.elementByClassName('android.widget.SeekBar'))
			.then(function (el) {
				return Q.all([el.getSize(), el.getLocation()])
					.then(function (res) {
						var unit = parseInt(res[0].width / 100);
						var action = new wd.TouchAction(driver);
						action.tap({x: res[1].x + 30*unit, y: res[1].y + 18});
						return driver.performTouchAction(action);
					})
			})
	});
	it("text_p16 : 40", function () {
		return driver
			.elementByAccessibilityId('text_p16')
			.then(el => el.elementByClassName('android.widget.SeekBar'))
			.then(function (el) {
				return Q.all([el.getSize(), el.getLocation()])
					.then(function (res) {
						var unit = parseInt(res[0].width / 100);
						var action = new wd.TouchAction(driver);
						action.tap({x: res[1].x + 40*unit, y: res[1].y + 18});
						return driver.performTouchAction(action);
					})
			})
	});
	it("text_p17 : 50", function () {
		return driver
			.elementByAccessibilityId('text_p17')
			.then(el => el.elementByClassName('android.widget.SeekBar'))
			.then(function (el) {
				return Q.all([el.getSize(), el.getLocation()])
					.then(function (res) {
						var unit = parseInt(res[0].width / 100);
						var action = new wd.TouchAction(driver);
						action.tap({x: res[1].x + 50*unit, y: res[1].y + 18});
						return driver.performTouchAction(action);
					})
			})
	});
	it("text_p18 : 80", function () {
		return driver
			.elementByAccessibilityId('text_p18')
			.then(el => el.elementByClassName('android.widget.SeekBar'))
			.then(function (el) {
				return Q.all([el.getSize(), el.getLocation()])
					.then(function (res) {
						var unit = parseInt(res[0].width / 100);
						var action = new wd.TouchAction(driver);
						action.tap({x: res[1].x + 80*unit, y: res[1].y + 18});
						return driver.performTouchAction(action);
					})
			})
	});
	it("text_p19 : 100", function () {
		return driver
			.elementByAccessibilityId('text_p19')
			.then(el => el.elementByClassName('android.widget.SeekBar'))
			.then(function (el) {
				return Q.all([el.getSize(), el.getLocation()])
					.then(function (res) {
						var unit = parseInt(res[0].width / 100);
						var action = new wd.TouchAction(driver);
						action.tap({x: res[1].x + 100*unit, y: res[1].y + 18});
						return driver.performTouchAction(action);
					})
			})
	});
	it("text_p20 : eros, egestas ultricies nisl. Phasellus aliquam elit nibh, eget tempus enim blandit a. Fusce convallis vestibulum commodo. Morbi ac nibh", function () {
		return driver
			.elementByAccessibilityId('text_p20')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("eros, egestas ultricies nisl. Phasellus aliquam elit nibh, eget tempus enim blandit a. Fusce convallis vestibulum commodo. Morbi ac nibh")
			.hideKeyboard();
	})
	it("text_p21 : odio nec, porttitor ultrices libero. Phasellus lobortis orci dui, eget tempor dolor lobortis sed. Pellentesque nec magna est. Duis ac", function () {
		return driver
			.elementByAccessibilityId('text_p21')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("odio nec, porttitor ultrices libero. Phasellus lobortis orci dui, eget tempor dolor lobortis sed. Pellentesque nec magna est. Duis ac")
			.hideKeyboard();
	})
	it("text_p22 : vestibulum commodo. Morbi ac nibh", function () {
		return driver
			.elementByAccessibilityId('text_p22')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("vestibulum commodo. Morbi ac nibh")
			.hideKeyboard();
	})
	it("text_p23 : massa. Nam placerat vestibulum sollicitudin.", function () {
		return driver
			.elementByAccessibilityId('text_p23')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("massa. Nam placerat vestibulum sollicitudin.")
			.hideKeyboard();
	})
	it("text_p24 : sit amet suscipit lectus blandit. Curabitur tristique suscipit auctor. Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat", function () {
		return driver
			.elementByAccessibilityId('text_p24')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("sit amet suscipit lectus blandit. Curabitur tristique suscipit auctor. Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat")
			.hideKeyboard();
	})
	it("text_p25 : suscipit lectus blandit. Curabitur tristique suscipit auctor. Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat vestibulum sollicitudin.", function () {
		return driver
			.elementByAccessibilityId('text_p25')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("suscipit lectus blandit. Curabitur tristique suscipit auctor. Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat vestibulum sollicitudin.")
			.hideKeyboard();
	})
	it("text_p26 : non. Pellentesque egestas venenatis turpis. Aenean ultricies sapien quis diam maximus finibus. Donec lacus odio, scelerisque id euismod ac, vestibulum", function () {
		return driver
			.elementByAccessibilityId('text_p26')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("non. Pellentesque egestas venenatis turpis. Aenean ultricies sapien quis diam maximus finibus. Donec lacus odio, scelerisque id euismod ac, vestibulum")
			.hideKeyboard();
	})
	it("text_p27 : ngocnguyen@rta.vn", function () {
		return driver
			.elementByAccessibilityId('text_p27')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.then(function (el) {
				return Q.all([el.setImmediateValue("ngocnguyen@rta.vn"), el.getSize(), el.getLocation()])
					.then(function (res) {
						let size = res[1];
						let loc  = res[2];
						let action = new wd.TouchAction(driver);
						action.tap({x:loc.x + size.width - 30, y: loc.y + size.height / 2});
						return driver.performTouchAction(action).hideKeyboard();
					})
			})
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="text_p65"]');
	});
	it("text_p65 : ", function () {
		return driver
			.elementByAccessibilityId('text_p65')
			.then(el => el.elementByClassName('android.widget.TextView').tap())
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
			.then(el => el.elementByClassName('android.widget.TextView').tap())
	});
});
