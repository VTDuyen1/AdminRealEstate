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

describe("Test  [GMB-2MC] TRAINING BASELINE SURVEY (G9 - 1903260308) Form", function () {
	this.timeout(2400000);
	var driver;
	var allPassed = true;

	before(function () {
		driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
		var desired = {
			browserName: '',
			platformName: 'Android',
			platformVersion: '8.0.0',
			deviceName: 'Samsung J8',
			udid: '87e790ee',
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
			.sleep(5000)
			.elementByAccessibilityId("menu_item_form_fillnew")
			.tap();
	});
	it("Open form", function () {
		return driver
			.elementByXPath('//android.widget.TextView[contains(@text, "[GMB-2MC] TRAINING BASELINE SURVEY")]')
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
					.elementByXPath('//android.widget.TextView[contains(@text, "[GMB-2MC] TRAINING BASELINE SURVEY")]')
			})
			.tap()
			.sleep(5000);
	});
	it("Close off line: ", function () {
		return driver
			.elementById('btn_close')
			.click()
			.sleep(15000)
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="gmb_lga_id"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("gmb_lga_id : 0", function () {
		return driver
			.elementByAccessibilityId('gmb_lga_id')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="gmb_district_id"]//android.widget.EditText');
	});
	it("gmb_district_id : 1", function () {
		return driver
			.elementByAccessibilityId('gmb_district_id')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue(''))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[2]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="gmb_settlement_id"]//android.widget.EditText');
	});
	it("gmb_settlement_id : 3", function () {
		return driver
			.elementByAccessibilityId('gmb_settlement_id')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue(''))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[4]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_id"]//android.widget.EditText');
	});
	it("house_id : 0", function () {
		return driver
			.elementByAccessibilityId('house_id')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue(''))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="gmb_compound_name"]');
	});
	it("gmb_compound_name : lectus tincidunt, laoreet risus sed, tempor lorem. In accumsan lorem", function () {
		return driver
			.elementByAccessibilityId('gmb_compound_name')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("lectus tincidunt, laoreet risus sed, tempor lorem. In accumsan lorem")
			.hideKeyboard();
	})
	it("Scroll Down", function () {
		return driver.scrollDown()
	});
	it("int_lang : 0", function () {
		return driver
			.elementByAccessibilityId('int_lang')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="gps"]');
	});
	it("gps", function () {
		return driver
			.elementByAccessibilityId('gps')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
					.sleep(7000)
					.elementById('vn.rta.rtsurvey:id/accept_location')
					.tap();
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img"]//android.widget.GridView//android.widget.TextView');
	});
	it("house_img : 0", function () {
		return driver
			.elementByAccessibilityId('house_img')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img_01"]');
	});
	it("house_img_01", function () {
		return driver
			.elementByAccessibilityId('house_img_01')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.sleep(4000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(2000)
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img_02"]');
	});
	it("house_img_02", function () {
		return driver
			.elementByAccessibilityId('house_img_02')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.sleep(4000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(2000)
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img_03"]');
	});
	it("house_img_03", function () {
		return driver
			.elementByAccessibilityId('house_img_03')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.sleep(4000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(2000)
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img_04"]');
	});
	it("house_img_04", function () {
		return driver
			.elementByAccessibilityId('house_img_04')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.sleep(4000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(2000)
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_img_05"]');
	});
	it("house_img_05", function () {
		return driver
			.elementByAccessibilityId('house_img_05')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.sleep(4000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(2000)
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="house_video"]');
	});
	it("house_video : 10", function () {
		return driver
			.elementByAccessibilityId('house_video')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.ImageButton')
					.tap()
			})
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(10000)
			.elementById('vn.rta.rtsurvey:id/take_photo')
			.tap()
			.sleep(4000)
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a1a : 1", function () {
		return driver
			.elementByAccessibilityId('a1a')
			.then(el => el.elementByClassName('android.widget.EditText').setImmediateValue(''))
			.sleep(1000)
			.elementById('vn.rta.rtsurvey:id/recycler_view')
			.then(el => el.elementByXPath('//android.widget.RelativeLayout[1]//android.widget.TextView').tap())
	});
	it("a1b : 0", function () {
		return driver
			.elementByAccessibilityId('a1b')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a1b1 : Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat vestibulum sollicitudin. Morbi efficitur", function () {
		return driver
			.elementByAccessibilityId('a1b1')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("Maecenas vitae lectus pulvinar, maximus tellus a, mollis massa. Nam placerat vestibulum sollicitudin. Morbi efficitur")
			.hideKeyboard();
	})
	it("a2a0 : 0", function () {
		return driver
			.elementByAccessibilityId('a2a0')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll Down", function () {
		return driver.scrollDown()
	});
	it("a2a : 15/01/1900", function () {
		return driver
			.elementByAccessibilityId('a2a')
			.then(function (el) {
				return el
					.elementById('vn.rta.rtsurvey:id/month_display')
					.tap()
					.elementByXPath('//android.widget.TextView[@text=\'Jan\']')
					.tap()
					.elementById('vn.rta.rtsurvey:id/btn_ok')
					.tap()
					.elementByXPath('//android.widget.TextView[@text=\'1\']')
					.tap()
					.elementById('vn.rta.rtsurvey:id/btn_ok')
					.tap()
					.elementByXPath('//android.widget.TextView[@text=\'1900\']')
					.tap()
					.catch(dateTime.scrollYear.bind(this, driver, '1900'))
					.elementById('vn.rta.rtsurvey:id/btn_ok')
					.tap()
			})
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a3a : 0", function () {
		return driver
			.elementByAccessibilityId('a3a')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a3b11 : 987169307", function () {
		return driver
			.elementByAccessibilityId('a3b11')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("987169307")
			.hideKeyboard();
	})
	it("a3b12 : 1", function () {
		return driver
			.elementByAccessibilityId('a3b12')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a3b21 : 973807701", function () {
		return driver
			.elementByAccessibilityId('a3b21')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("973807701")
			.hideKeyboard();
	})
	it("a3b22 : 1", function () {
		return driver
			.elementByAccessibilityId('a3b22')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a4a : 0", function () {
		return driver
			.elementByAccessibilityId('a4a')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a4a1 : rta.intern25@gmail.com", function () {
		return driver
			.elementByAccessibilityId('a4a1')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("rta.intern25@gmail.com")
			.hideKeyboard();
	})
	it("a4a2 : rta.intern20@gmail.com", function () {
		return driver
			.elementByAccessibilityId('a4a2')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("rta.intern20@gmail.com")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a4b1 : 1", function () {
		return driver
			.elementByAccessibilityId('a4b1')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a4b2 : 2", function () {
		return driver
			.elementByAccessibilityId('a4b2')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[3]').tap())
	});
	it("a4b3 : 0", function () {
		return driver
			.elementByAccessibilityId('a4b3')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a4b31 : diam. Fusce mollis dui eget vehicula vehicula. Quisque dignissim viverra purus sit amet semper. Nullam", function () {
		return driver
			.elementByAccessibilityId('a4b31')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("diam. Fusce mollis dui eget vehicula vehicula. Quisque dignissim viverra purus sit amet semper. Nullam")
			.hideKeyboard();
	})
	it("a4b_ot : 0", function () {
		return driver
			.elementByAccessibilityId('a4b_ot')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a4b_ot1 : Pellentesque non ipsum at massa egestas feugiat eu in velit. Maecenas molestie magna et neque", function () {
		return driver
			.elementByAccessibilityId('a4b_ot1')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("Pellentesque non ipsum at massa egestas feugiat eu in velit. Maecenas molestie magna et neque")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add value 2", function () {
		return driver
			.elementByXPath('(//android.widget.LinearLayout[@content-desc="a5"])[1]')
			.tap()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue('3')
			.hideKeyboard();
	});
	it("Add value 3", function () {
		return driver
			.elementByXPath('(//android.widget.LinearLayout[@content-desc="a5"])[2]')
			.tap()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue('3')
			.hideKeyboard();
	});
	it("Add value 4", function () {
		return driver
			.elementByXPath('(//android.widget.LinearLayout[@content-desc="a5"])[3]')
			.tap()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue('3')
			.hideKeyboard();
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a6a : 1", function () {
		return driver
			.elementByAccessibilityId('a6a')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("a6b : 0", function () {
		return driver
			.elementByAccessibilityId('a6b')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a6b1 : 2018", function () {
		return driver
			.elementByAccessibilityId('a6b1')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("2018")
			.hideKeyboard();
	})
	it("a6b2 : 30", function () {
		return driver
			.elementByAccessibilityId('a6b2')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("30")
			.hideKeyboard();
	})
	it("a6b3 : teamwork, leader", function () {
		return driver
			.elementByAccessibilityId('a6b3')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("teamwork, leader")
			.hideKeyboard();
	})
	it("a6b4 : knowledge", function () {
		return driver
			.elementByAccessibilityId('a6b4')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("knowledge")
			.hideKeyboard();
	})
	it("a6b5 : 5000", function () {
		return driver
			.elementByAccessibilityId('a6b5')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("5000")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a7a : 0", function () {
		return driver
			.elementByAccessibilityId('a7a')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a7b : 1", function () {
		return driver
			.elementByAccessibilityId('a7b')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a7c : 2", function () {
		return driver
			.elementByAccessibilityId('a7c')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[3]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a8 : 1", function () {
		return driver
			.elementByAccessibilityId('a8')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("a9 : 2", function () {
		return driver
			.elementByAccessibilityId('a9')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("2")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a101"]');
	});
	it("a101 : 22", function () {
		return driver
			.elementByAccessibilityId('a101')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("22")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a102"]');
	});
	it("a102 : 13", function () {
		return driver
			.elementByAccessibilityId('a102')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("13")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a103"]');
	});
	it("a103 : 23", function () {
		return driver
			.elementByAccessibilityId('a103')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("23")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a104"]');
	});
	it("a104 : 23", function () {
		return driver
			.elementByAccessibilityId('a104')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("23")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a105"]');
	});
	it("a105 : 8", function () {
		return driver
			.elementByAccessibilityId('a105')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("8")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a106"]');
	});
	it("a106 : 6", function () {
		return driver
			.elementByAccessibilityId('a106')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("6")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a107"]');
	});
	it("a107 : 455", function () {
		return driver
			.elementByAccessibilityId('a107')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("455")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a108"]');
	});
	it("a108 : 123", function () {
		return driver
			.elementByAccessibilityId('a108')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("123")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a109"]');
	});
	it("a109 : 34", function () {
		return driver
			.elementByAccessibilityId('a109')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("34")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a1010"]');
	});
	it("a1010 : 98", function () {
		return driver
			.elementByAccessibilityId('a1010')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("98")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a1011"]');
	});
	it("a1011 : 78", function () {
		return driver
			.elementByAccessibilityId('a1011')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("78")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a1012"]');
	});
	it("a1012 : 56", function () {
		return driver
			.elementByAccessibilityId('a1012')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("56")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a1013"]');
	});
	it("a1013 : 45", function () {
		return driver
			.elementByAccessibilityId('a1013')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("45")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a1014"]');
	});
	it("a1014 : 34", function () {
		return driver
			.elementByAccessibilityId('a1014')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("34")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a111"]');
	});
	it("a111 : 1018", function () {
		return driver
			.elementByAccessibilityId('a111')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("1018")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a112"]');
	});
	it("a112 : 1000", function () {
		return driver
			.elementByAccessibilityId('a112')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("1000")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a113"]');
	});
	it("a113 : 18", function () {
		return driver
			.elementByAccessibilityId('a113')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("18")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a114"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("a114 : 4", function () {
		return driver
			.elementByAccessibilityId('a114')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[5]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a11a"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("a11a : 1", function () {
		return driver
			.elementByAccessibilityId('a11a')
		.then(el => el.elementByXPath('//android.widget.LinearLayout[2]/android.widget.TextView').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a12"]//android.widget.GridView//android.widget.TextView');
	});
	it("a12 : 2", function () {
		return driver
			.elementByAccessibilityId('a12')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[3]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a12_ot"]');
	});
	it("a12_ot : mauris tortor, vulputate sed venenatis eu, fringilla ut magna.", function () {
		return driver
			.elementByAccessibilityId('a12_ot')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("mauris tortor, vulputate sed venenatis eu, fringilla ut magna.")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a13a"]//android.widget.LinearLayout[2]//android.widget.TextView');
	});
	it("a13a : 2", function () {
		return driver
			.elementByAccessibilityId('a13a')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a14"]//android.widget.GridView//android.widget.TextView');
	});
	it("a14 : 4", function () {
		return driver
			.elementByAccessibilityId('a14')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[5]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a145"]');
	});
	it("a145 : turpis ligula, mollis eget dolor ut, porta accumsan turpis.", function () {
		return driver
			.elementByAccessibilityId('a145')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("turpis ligula, mollis eget dolor ut, porta accumsan turpis.")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a15"]//android.widget.GridView//android.widget.TextView');
	});
	it("a15 : 0", function () {
		return driver
			.elementByAccessibilityId('a15')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a15a"]');
	});
	it("a15a : 92", function () {
		return driver
			.elementByAccessibilityId('a15a')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("92")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a15b"]');
	});
	it("a15b : 129", function () {
		return driver
			.elementByAccessibilityId('a15b')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("129")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a16 : 0", function () {
		return driver
			.elementByAccessibilityId('a16')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a16a : 5", function () {
		return driver
			.elementByAccessibilityId('a16a')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("5")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add new task 1", function () {
		return driver
			.elementByAccessibilityId('rta_addrp_bttn')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap()
			})
			.catch(function(){
				return driver
					.elementById('button_add')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16b"]');
	});
	it("a16b : 54", function () {
		return driver
			.elementsByAccessibilityId('a16b').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("54")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16c"]');
	});
	it("a16c : elit ac bibendum. Suspendisse potenti. Donec vitae tortor vitae", function () {
		return driver
			.elementsByAccessibilityId('a16c').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("elit ac bibendum. Suspendisse potenti. Donec vitae tortor vitae")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16d"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16d : 0", function () {
		return driver
			.elementsByAccessibilityId('a16d').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16e"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16e : 0", function () {
		return driver
			.elementsByAccessibilityId('a16e').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16f"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16f : 0", function () {
		return driver
			.elementsByAccessibilityId('a16f').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16g"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16g : 1", function () {
		return driver
			.elementsByAccessibilityId('a16g').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16h"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16h : 0", function () {
		return driver
			.elementsByAccessibilityId('a16h').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a16i : 1", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 1", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add new task 2", function () {
		return driver
			.elementByAccessibilityId('rta_addrp_bttn')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap()
			})
			.catch(function(){
				return driver
					.elementById('button_add')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16b"]');
	});
	it("a16b : 75", function () {
		return driver
			.elementsByAccessibilityId('a16b').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("75")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16c"]');
	});
	it("a16c : ligula. Proin efficitur tortor turpis, sit amet laoreet lectus", function () {
		return driver
			.elementsByAccessibilityId('a16c').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("ligula. Proin efficitur tortor turpis, sit amet laoreet lectus")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16d"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16d : 1", function () {
		return driver
			.elementsByAccessibilityId('a16d').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16e"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16e : 0", function () {
		return driver
			.elementsByAccessibilityId('a16e').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16f"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16f : 0", function () {
		return driver
			.elementsByAccessibilityId('a16f').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16g"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16g : 1", function () {
		return driver
			.elementsByAccessibilityId('a16g').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16h"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16h : 1", function () {
		return driver
			.elementsByAccessibilityId('a16h').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add new task 3", function () {
		return driver
			.elementByAccessibilityId('rta_addrp_bttn')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap()
			})
			.catch(function(){
				return driver
					.elementById('button_add')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16b"]');
	});
	it("a16b : 47", function () {
		return driver
			.elementsByAccessibilityId('a16b').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("47")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16c"]');
	});
	it("a16c : risus bibendum porta. Phasellus eget consequat augue, quis commodo", function () {
		return driver
			.elementsByAccessibilityId('a16c').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("risus bibendum porta. Phasellus eget consequat augue, quis commodo")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16d"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16d : 0", function () {
		return driver
			.elementsByAccessibilityId('a16d').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16e"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16e : 0", function () {
		return driver
			.elementsByAccessibilityId('a16e').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16f"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16f : 0", function () {
		return driver
			.elementsByAccessibilityId('a16f').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16g"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16g : 1", function () {
		return driver
			.elementsByAccessibilityId('a16g').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16h"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16h : 1", function () {
		return driver
			.elementsByAccessibilityId('a16h').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add new task 4", function () {
		return driver
			.elementByAccessibilityId('rta_addrp_bttn')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap()
			})
			.catch(function(){
				return driver
					.elementById('button_add')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16b"]');
	});
	it("a16b : 88", function () {
		return driver
			.elementsByAccessibilityId('a16b').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("88")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16c"]');
	});
	it("a16c : turpis elementum, vel tincidunt nulla vehicula. Pellentesque condimentum sed", function () {
		return driver
			.elementsByAccessibilityId('a16c').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("turpis elementum, vel tincidunt nulla vehicula. Pellentesque condimentum sed")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16d"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16d : 0", function () {
		return driver
			.elementsByAccessibilityId('a16d').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16e"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16e : 1", function () {
		return driver
			.elementsByAccessibilityId('a16e').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16f"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16f : 0", function () {
		return driver
			.elementsByAccessibilityId('a16f').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16g"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16g : 1", function () {
		return driver
			.elementsByAccessibilityId('a16g').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16h"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16h : 1", function () {
		return driver
			.elementsByAccessibilityId('a16h').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 1", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 1", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Add new task 5", function () {
		return driver
			.elementByAccessibilityId('rta_addrp_bttn')
			.then(function (el) {
				return el
					.elementByClassName('android.widget.TextView')
					.tap()
			})
			.catch(function(){
				return driver
					.elementById('button_add')
					.tap()
			})
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16b"]');
	});
	it("a16b : 28", function () {
		return driver
			.elementsByAccessibilityId('a16b').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("28")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16c"]');
	});
	it("a16c : viverra tortor. Aenean tincidunt dui augue, eget facilisis nisi", function () {
		return driver
			.elementsByAccessibilityId('a16c').last()
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("viverra tortor. Aenean tincidunt dui augue, eget facilisis nisi")
			.hideKeyboard();
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16d"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16d : 1", function () {
		return driver
			.elementsByAccessibilityId('a16d').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16e"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16e : 1", function () {
		return driver
			.elementsByAccessibilityId('a16e').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16f"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16f : 0", function () {
		return driver
			.elementsByAccessibilityId('a16f').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16g"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16g : 1", function () {
		return driver
			.elementsByAccessibilityId('a16g').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16h"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16h : 1", function () {
		return driver
			.elementsByAccessibilityId('a16h').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a16i : 0", function () {
		return driver
			.elementsByAccessibilityId('a16i').last()
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("Scroll To Specific Question", function () {
		return driver.scrollTo('//*[@content-desc="a16j"]//android.widget.GridView//android.widget.TextView');
	});
	it("a16j : 1", function () {
		return driver
			.elementByAccessibilityId('a16j')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a17 : 0", function () {
		return driver
			.elementByAccessibilityId('a17')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a171 : rta_qcteam@gmail.com", function () {
		return driver
			.elementByAccessibilityId('a171')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("rta_qcteam@gmail.com")
			.hideKeyboard();
	})
	it("a18a : 0", function () {
		return driver
			.elementByAccessibilityId('a18a')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a18b : 1", function () {
		return driver
			.elementByAccessibilityId('a18b')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a18c : 1", function () {
		return driver
			.elementByAccessibilityId('a18c')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a18d : 1", function () {
		return driver
			.elementByAccessibilityId('a18d')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a18e : 1", function () {
		return driver
			.elementByAccessibilityId('a18e')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("Scroll Down", function () {
		return driver.scrollDown()
	});
	it("a18f : 1", function () {
		return driver
			.elementByAccessibilityId('a18f')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a19 : 4", function () {
		return driver
			.elementByAccessibilityId('a19')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[5]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a20 : 1", function () {
		return driver
			.elementByAccessibilityId('a20')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a21 : 0", function () {
		return driver
			.elementByAccessibilityId('a21')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a21a : 74", function () {
		return driver
			.elementByAccessibilityId('a21a')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("74")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a23a : 73", function () {
		return driver
			.elementByAccessibilityId('a23a')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("73")
			.hideKeyboard();
	})
	it("a23b : 1", function () {
		return driver
			.elementByAccessibilityId('a23b')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("a23c : 0", function () {
		return driver
			.elementByAccessibilityId('a23c')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[1]').tap())
	});
	it("a23d : 2", function () {
		return driver
			.elementByAccessibilityId('a23d')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("a23e : 1", function () {
		return driver
			.elementByAccessibilityId('a23e')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("a23f : 3", function () {
		return driver
			.elementByAccessibilityId('a23f')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[4]').tap())
	});
	it("a23g : 1", function () {
		return driver
			.elementByAccessibilityId('a23g')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[2]').tap())
	});
	it("a23h : 2", function () {
		return driver
			.elementByAccessibilityId('a23h')
			.then(el => el.elementByXPath('//android.widget.LinearLayout[2]//android.widget.TextView[3]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a24a : 1", function () {
		return driver
			.elementByAccessibilityId('a24a')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a24b : 1", function () {
		return driver
			.elementByAccessibilityId('a24b')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a24c : 1", function () {
		return driver
			.elementByAccessibilityId('a24c')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a24d : 1", function () {
		return driver
			.elementByAccessibilityId('a24d')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a24e : 0", function () {
		return driver
			.elementByAccessibilityId('a24e')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24f : 0", function () {
		return driver
			.elementByAccessibilityId('a24f')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24g : 0", function () {
		return driver
			.elementByAccessibilityId('a24g')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24h : 0", function () {
		return driver
			.elementByAccessibilityId('a24h')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24i : 0", function () {
		return driver
			.elementByAccessibilityId('a24i')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24k : 0", function () {
		return driver
			.elementByAccessibilityId('a24k')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a24e_quant : 52", function () {
		return driver
			.elementByAccessibilityId('a24e_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("52")
			.hideKeyboard();
	})
	it("a24f_quant : 92", function () {
		return driver
			.elementByAccessibilityId('a24f_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("92")
			.hideKeyboard();
	})
	it("a24g_quant : 105", function () {
		return driver
			.elementByAccessibilityId('a24g_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("105")
			.hideKeyboard();
	})
	it("a24h_quant : 98", function () {
		return driver
			.elementByAccessibilityId('a24h_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("98")
			.hideKeyboard();
	})
	it("a24i_quant : 89", function () {
		return driver
			.elementByAccessibilityId('a24i_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("89")
			.hideKeyboard();
	})
	it("a24k_quant : 92", function () {
		return driver
			.elementByAccessibilityId('a24k_quant')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("92")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a251 : 0", function () {
		return driver
			.elementByAccessibilityId('a251')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a252 : 0", function () {
		return driver
			.elementByAccessibilityId('a252')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a253 : 1", function () {
		return driver
			.elementByAccessibilityId('a253')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a254 : 1", function () {
		return driver
			.elementByAccessibilityId('a254')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a255 : 1", function () {
		return driver
			.elementByAccessibilityId('a255')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a256 : 1", function () {
		return driver
			.elementByAccessibilityId('a256')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a257 : 1", function () {
		return driver
			.elementByAccessibilityId('a257')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a258 : 0", function () {
		return driver
			.elementByAccessibilityId('a258')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a259 : 0", function () {
		return driver
			.elementByAccessibilityId('a259')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a2510 : 0", function () {
		return driver
			.elementByAccessibilityId('a2510')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a2511 : 1", function () {
		return driver
			.elementByAccessibilityId('a2511')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a2512 : 0", function () {
		return driver
			.elementByAccessibilityId('a2512')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a2513 : 1", function () {
		return driver
			.elementByAccessibilityId('a2513')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a2514 : 1", function () {
		return driver
			.elementByAccessibilityId('a2514')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a2515 : 1", function () {
		return driver
			.elementByAccessibilityId('a2515')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a2516 : 0", function () {
		return driver
			.elementByAccessibilityId('a2516')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("a2517 : 1", function () {
		return driver
			.elementByAccessibilityId('a2517')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[2]').tap())
	});
	it("a2518 : 0", function () {
		return driver
			.elementByAccessibilityId('a2518')
			.then(el => el.elementByXPath('//android.widget.GridView//android.widget.TextView[1]').tap())
	});
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
	it("a26 : 2", function () {
		return driver
			.elementByAccessibilityId('a26')
			.then(el => el.elementByClassName('android.widget.EditText'))
			.setImmediateValue("2")
			.hideKeyboard();
	})
	it("Next Screen:", function () {
		return driver
		.elementByAccessibilityId('Next')
		.click()
	})
});