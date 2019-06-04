"use strict";

require("../helpers/setup");

var wd = require("wd"),
    Q = require('q'),
    actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);

describe("Test Form Features", function () {
  this.timeout(300000);
  var driver;

  before(function () {
    driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
    require("../helpers/logging").configure(driver);

    /*var desired = {
        automationName: 'XCUITest',
        browserName: '',
        platformName: 'iOS',
        platformVersion: '9.3.5',
        deviceName: 'RTA',
        xcodeOrgId: 'C253N945M7',
        // xcodeSigningId: 'iPhone Developer',
        udid: 'auto',
        // udid: 'fc2975409bf76f6a07b65ed1f4f44787ed7d5d53',
        bundleId: 'com.rtsmartsurvey.rtsurvey.ios',
        // app: '/Users/quangbui/Downloads/rtSurvey_NoMaps.app',
        noReset: true
    };*/
    var desired = {
        automationName: 'XCUITest',
        browserName: '',
        platformName: 'iOS',
        platformVersion: '12.1',
        deviceName: 'Quang',
        xcodeOrgId: 'C253N945M7',
        udid: 'f1bc07e78f4cea9968e3c96bb76326e7be46dcaa',
        bundleId: 'com.rtsmartsurvey.rtsurvey.ios',
        noReset: true
    };
        
    return driver
      .init(desired)
      .setImplicitWaitTimeout(5000);
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
      .sleep(5000)
  });
  it("Next Question", function () {
    return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
  });
  it("sections_select : 1,16,", function () {
    return driver
      .elementByAccessibilityId('sections_select')
      .then(function (el) {
        return el
          .elementsByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
          .then(function (els) {
            return Q.all([els[1].tap(), els[16].tap()])
          })
      })
  });
  it("Next Question", function () {
    return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
  });
    it("se_one_b2 : 4", function () {
        return driver
            .elementByAccessibilityId('se_one_b2')
            .then(el => el.elementByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeOther[5]//XCUIElementTypeButton').tap())
    });
    it("se_one_b3 : 4", function () {
        return driver
            .elementByAccessibilityId('se_one_b3')
            .then(el => el.elementByXPath('//XCUIElementTypeButton[5]').tap())
    });
    it("se_one_b4 : 2", function () {
        return driver
            .elementByAccessibilityId('se_one_b4')
            .then(el => el.elementByXPath('//XCUIElementTypeButton[3]').tap())
    });

});
