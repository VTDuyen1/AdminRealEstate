"use strict";

require("../helpers/setup");

let wd = require("wd"),
    Q = require('q'),
    actions = require('../helpers/actions');

wd.addPromiseChainMethod('swipe', actions.swipe);
wd.addPromiseChainMethod('scrollTo', actions.iScrollTo);
wd.addPromiseChainMethod('scrollDown', actions.iScrollDown);

describe("Test Form Features", function () {
    this.timeout(300000);
    let driver;

    before(function () {
        driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
        // require("../helpers/logging").configure(driver);

        /*let desired = {
            automationName: 'XCUITest',
            browserName: '',
            platformName: 'iOS',
            platformVersion: '12.1',
            deviceName: 'Quang',
            xcodeOrgId: 'C253N945M7',
            udid: 'f1bc07e78f4cea9968e3c96bb76326e7be46dcaa',
            bundleId: 'com.rtsmartsurvey.rtsurvey.ios',
            noReset: true
        };*/
        let desired = {
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
    it("sections_select : 2,16", function () {
        return driver
            .elementByAccessibilityId('sections_select')
            .then(function (el) {
                return el
                    .elementsByXPath('//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
                    .then(function (els) {
                        return Q.all([els[2].tap(), els[16].tap()])
                    })
            })
    });
    it("Next Question", function () {
        return driver.swipe({startX: 200, startY: 100, endX: 100, endY: 100, duration: 1000})
    });
    it("se_mul_c1", function () {
        return driver
            .elementByAccessibilityId('se_mul_c1')
            .elementsByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("se_mul_c2", function () {
        return driver
            .elementByAccessibilityId('se_mul_c2')
            .elementsByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c3", function () {
        return driver
            .elementByAccessibilityId('se_mul_c3')
            .elementsByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeOther//XCUIElementTypeOther')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("se_mul_c4", function () {
        return driver
            .elementByAccessibilityId('se_mul_c4')
            .elementsByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c5", function () {
        return driver
            .elementByAccessibilityId('se_mul_c5')
            .elementsByXPath('>', '//XCUIElementTypeOther[2]//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c6", function () {
        return driver
            .elementByAccessibilityId('se_mul_c6')
            .then(el => el.elementByClassName('XCUIElementTypeButton').tap())
            .elementByClassName('XCUIElementTypeTable')
            .then(el => el.elementsByClassName('XCUIElementTypeCell'))
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
            .elementByName('Done').tap()
    });
    it("se_mul_c7", function () {
        return driver
            .elementByAccessibilityId('se_mul_c7')
            .then(el => el.elementByClassName('XCUIElementTypeButton').tap())
            .elementByClassName('XCUIElementTypeTable')
            .then(el => el.elementsByClassName('XCUIElementTypeCell'))
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
            .elementByName('Done').tap()
    });
    it("se_mul_c8", function () {
        return driver
            .elementByAccessibilityId('se_mul_c8')
            .then(el => el.elementByClassName('XCUIElementTypeButton').tap())
            .elementByClassName('XCUIElementTypeTable')
            .then(el => el.elementsByClassName('XCUIElementTypeCell'))
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
            .elementByName('Done').tap()
    });
    it("se_mul_c9", function () {
        return driver
            .elementByAccessibilityId('se_mul_c9')
            .elementsByClassName('>', 'XCUIElementTypeCell')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c10", function () {
        return driver
            .elementByAccessibilityId('se_mul_c10')
            .elementsByClassName('>', 'XCUIElementTypeCell')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c11", function () {
        return driver
            .elementByAccessibilityId('se_mul_c11')
            .elementByClassName('>', 'XCUIElementTypeCollectionView')
            .elementsByClassName('>', 'XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("se_mul_c12", function () {
        return driver
            .elementByAccessibilityId('se_mul_c12')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c13", function () {
        return driver
            .elementByAccessibilityId('se_mul_c13')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c14", function () {
        return driver
            .elementByAccessibilityId('se_mul_c14')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c15", function () {
        return driver
            .elementByAccessibilityId('se_mul_c15')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c16", function () {
        return driver
            .elementByAccessibilityId('se_mul_c16')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c17", function () {
        return driver
            .elementByAccessibilityId('se_mul_c17')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("se_mul_c18", function () {
        return driver
            .elementByAccessibilityId('se_mul_c18')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c19", function () {
        return driver
            .elementByAccessibilityId('se_mul_c19')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c20", function () {
        return driver
            .elementByAccessibilityId('se_mul_c20')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c21", function () {
        return driver
            .elementByAccessibilityId('se_mul_c21')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c22", function () {
        return driver
            .elementByAccessibilityId('se_mul_c22')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c23", function () {
        return driver
            .elementByAccessibilityId('se_mul_c23')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap(), els[2].tap(), els[3].tap(), els[4].tap()]))
    });
    it("se_mul_c24", function () {
        return driver
            .elementByAccessibilityId('se_mul_c24')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c25", function () {
        return driver
            .elementByAccessibilityId('se_mul_c25')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c26", function () {
        return driver
            .elementByAccessibilityId('se_mul_c26')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c27", function () {
        return driver
            .elementByAccessibilityId('se_mul_c27')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c28", function () {
        return driver
            .elementByAccessibilityId('se_mul_c28')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c29", function () {
        return driver
            .elementByAccessibilityId('se_mul_c29')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c29')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c30", function () {
        return driver
            .elementByAccessibilityId('se_mul_c30')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c30')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
            .elementByAccessibilityId('se_mul_c30')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[3]').tap()
    });
    it("se_mul_c31", function () {
        return driver
            .elementByAccessibilityId('se_mul_c31')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c31')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c32", function () {
        return driver
            .elementByAccessibilityId('se_mul_c32')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c32')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c33", function () {
        return driver
            .elementByAccessibilityId('se_mul_c33')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c33')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c34", function () {
        return driver
            .elementByAccessibilityId('se_mul_c34')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c34')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c35", function () {
        return driver
            .elementByAccessibilityId('se_mul_c35')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c35')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c36", function () {
        return driver
            .elementByAccessibilityId('se_mul_c36')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c36')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c37", function () {
        return driver
            .elementByAccessibilityId('se_mul_c37')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c37')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });

    it("se_mul_c38", function () {
        return driver
            .elementByAccessibilityId('se_mul_c38')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c38')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("Scroll to se_mul_c39", function () {
        return driver.scrollTo('se_mul_c39');
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c39", function () {
        return driver
            .elementByAccessibilityId('se_mul_c39')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c40", function () {
        return driver
            .elementByAccessibilityId('se_mul_c40')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c41", function () {
        return driver
            .elementByAccessibilityId('se_mul_c41')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c42", function () {
        return driver
            .elementByAccessibilityId('se_mul_c42')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c43", function () {
        return driver
            .elementByAccessibilityId('se_mul_c43')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c44", function () {
        return driver
            .elementByAccessibilityId('se_mul_c44')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c45", function () {
        return driver
            .elementByAccessibilityId('se_mul_c45')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c46", function () {
        return driver
            .elementByAccessibilityId('se_mul_c46')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c47", function () {
        return driver
            .elementByAccessibilityId('se_mul_c47')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c48", function () {
        return driver
            .elementByAccessibilityId('se_mul_c48')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c49", function () {
        return driver
            .elementByAccessibilityId('se_mul_c49')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("se_mul_c50", function () {
        return driver
            .elementByAccessibilityId('se_mul_c50')
            .elementsByXPath('>', '//XCUIElementTypeCollectionView//XCUIElementTypeStaticText')
            .then(els => Q.all([els[0].tap(), els[1].tap()]))
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c51", function () {
        return driver
            .elementByAccessibilityId('se_mul_c51')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c51')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c52", function () {
        return driver
            .elementByAccessibilityId('se_mul_c52')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c52')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c53", function () {
        return driver
            .elementByAccessibilityId('se_mul_c53')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c53')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c54", function () {
        return driver
            .elementByAccessibilityId('se_mul_c54')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c54')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c55", function () {
        return driver
            .elementByAccessibilityId('se_mul_c55')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c55')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c56", function () {
        return driver
            .elementByAccessibilityId('se_mul_c56')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c56')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c57", function () {
        return driver
            .elementByAccessibilityId('se_mul_c57')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c57')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c58", function () {
        return driver
            .elementByAccessibilityId('se_mul_c58')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c58')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("se_mul_c59", function () {
        return driver
            .elementByAccessibilityId('se_mul_c59')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c59')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });
    it("Scroll down", function () {
        return driver.scrollDown();
    });
    it("se_mul_c60", function () {
        return driver
            .elementByAccessibilityId('se_mul_c60')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[1]').tap()
            .elementByAccessibilityId('se_mul_c60')
            .elementByClassName('>', 'XCUIElementTypeTextView').setImmediateValue('h')
            .elementByClassName('XCUIElementTypeTable')
            .elementByXPath('>', '//XCUIElementTypeCell[2]').tap()
    });


});
