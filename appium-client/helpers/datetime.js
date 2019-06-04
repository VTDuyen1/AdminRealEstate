"use strict";

const scrollYear = (driver, id) => {
	let date   = new Date();
	let year   = date.getFullYear();
	let value  = (year > id) ? 200 : -200;
    return driver
		.elementById('vn.rta.rtsurvey:id/month_text_view')
		.flick(1, value, 200)
		.elementByAccessibilityId(id)
		.click()
		.catch(scrollYear.bind(this, driver, id));
};

const scrollMonth = (driver, desc) => {
	let month        = (new Date(desc)).getMonth();
	let currentMonth = (new Date()).getMonth();
	let value = (currentMonth > month) ? 180 : -180;
	return driver
		.elementByXPath('//android.view.View[@index=20]')
		.flick(1, value, 180)
		.elementByAccessibilityId(desc)
		.click()
		.catch(scrollMonth.bind(this, driver, desc))
};

const findMonth = (driver, desc) => {
	let month        = (new Date(desc)).getMonth();
	let currentMonth = (new Date()).getMonth();
	let action = (currentMonth > month) ? 'prev' : 'next';
	return driver
		.elementById('android:id/' + action)
		.click()
		.elementByAccessibilityId(desc)
		.click()
		.catch(findMonth.bind(this, driver, desc))
};
const changeTime = (driver, desc, type, value) => {
	let date   = new Date();
	let hour   = date.getHours();
	let minute = date.getMinutes();
    let action = (value > ((type == 'hour') ? hour : minute)) ? 'plus' : 'minus';
	return driver
		.elementByAccessibilityId(desc)
		.then(function (el) {
			return el
				.elementById('vn.rta.rtsurvey:id/'+ type + '_' + action).tap()
		})
		.elementByAccessibilityId(desc)
		.then(function (el) {
			return el
				.elementById('vn.rta.rtsurvey:id/'+ type + '_display')
				.text().should.become(value)
		})
		.catch(changeTime.bind(this, driver, desc, type, value))
		// .elementByXPath('//*[@content-desc="' + desc + '"]//*[contains(@resource-id, "' + type + '_' + action + '")]')
		// .tap()
		// .elementByXPath('//*[@content-desc="' + desc + '"]//*[contains(@resource-id, "' + type + '_display")]')
		// .text().should.become(value)
		// .catch(changeTime.bind(this, driver, desc, type, value))
}

exports.scrollYear      = scrollYear;
exports.scrollMonth     = scrollMonth;
exports.findMonth       = findMonth;
exports.changeTime      = changeTime;
