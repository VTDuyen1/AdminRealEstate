"use strict";

var wd = require('wd'),
    Q = require('q');

exports.swipe = function (opts) {
  var action = new wd.TouchAction();
  action
    .press({x: opts.startX, y: opts.startY})
    .wait(opts.duration)
    .moveTo({x: opts.endX, y: opts.endY})
    .release();
  return this.performTouchAction(action);
};

exports.pinch = function (el) {
  return Q.all([
    el.getSize(),
    el.getLocation(),
  ]).then(function (res) {
    var size = res[0];
    var loc = res[1];
    var center = {
      x: loc.x + size.width / 2,
      y: loc.y + size.height / 2
    };
    var a1 = new wd.TouchAction(this);
    a1.press({el: el, x: center.x, y: center.y - 100}).moveTo({el: el}).release();
    var a2 = new wd.TouchAction(this);
    a2.press({el: el, x: center.x, y: center.y + 100}).moveTo({el: el}).release();
    var m = new wd.MultiAction(this);
    m.add(a1, a2);
    return m.perform();
  }.bind(this));
};

exports.zoom = function (el) {
  return Q.all([
    this.getWindowSize(),
    this.getLocation(el),
  ]).then(function (res) {
    var size = res[0];
    var loc = res[1];
    var center = {
      x: loc.x + size.width / 2,
      y: loc.y + size.height / 2
    };
    var a1 = new wd.TouchAction(this);
    a1.press({el: el}).moveTo({el: el, x: center.x, y: center.y - 100}).release();
    var a2 = new wd.TouchAction(this);
    a2.press({el: el}).moveTo({el: el, x: center.x, y: center.y + 100}).release();
    var m = new wd.MultiAction(this);
    m.add(a1, a2);
    return m.perform();
  }.bind(this));
};

function findElement (element, index, done) {
    return this
        .elementById('vn.rta.rtsurvey:id/questionholder')
        // .elementById('vn.rta.rtwork:id/view_pager')
        .catch(function(){
            return this
                .elementById('android:id/list')
        }.bind(this))
        .catch(function(){
            return this
                .elementById('vn.rta.rtwork:id/questionholder')
        }.bind(this))
        /*.sleep(1000)
        .elementById('vn.rta.rtsurvey:id/container')
        .catch(function(){
            return driver
                .elementById('vn.rta.rtsurvey:id/questionholder')
        })*/
        .getLocation()
        .then(function (loc) {
            index = index + 1;
            var action = new wd.TouchAction();
            action
                .press({x: loc.x, y: loc.y + 600})
                .wait(600)
                .moveTo({x: loc.x, y: loc.y})
                .release();
            return this.performTouchAction(action)
        }.bind(this))
        // .elementByAccessibilityId(element)
        .elementByXPath(element)
        .catch(function () {
            if (index == 15 || done) {
                return false;
            }
            return findElement.call(this, element, index, done);
        }.bind(this));
}

exports.scrollTo = function (element) { // element : question name
    return this
        // .elementByAccessibilityId(element)
        .elementByXPath(element)
        .catch(findElement.bind(this, element, 0, false));
};
exports.scrollUp = function () {
    return this
        .elementById('vn.rta.rtsurvey:id/questionholder')
        .catch(function(){
            return this
                .elementById('android:id/list')
        }.bind(this))
        .catch(function(){
            return this
                .elementById('vn.rta.rtwork:id/questionholder')
        }.bind(this))
        .getLocation()
        .then(function (loc) {
            var action = new wd.TouchAction();
            action
                .press({x: loc.x, y: loc.y})
                .wait(1000)
                .moveTo({x: loc.x, y: loc.y + 1000})
                .release();
            return this.performTouchAction(action)
        }.bind(this))
};
exports.scrollDown = function () {
    return this
        .elementById('vn.rta.rtsurvey:id/questionholder')
        .catch(function(){
            return this
                .elementById('android:id/list')
        }.bind(this))
        .catch(function(){
            return this
                .elementById('vn.rta.rtwork:id/questionholder')
        }.bind(this))
        .sleep(1000)
        .getLocation()
        .then(function (loc) {
            var action = new wd.TouchAction();
            action
                .press({x: loc.x, y: loc.y + 1000})
                .wait(1000)
                .moveTo({x: loc.x, y: loc.y})
                .release();
            return this.performTouchAction(action)
        }.bind(this))
};
exports.draw = function () {
    var action = new wd.TouchAction();
    action
        .press({x:250, y:750})
        .moveTo({x:250, y:250})
        .wait(1000)
        .moveTo({x:400, y:250})
        .wait(1000)
        .moveTo({x:400, y:500})
        .wait(1000)
        .moveTo({x:250, y:500})
        .wait(1000)
        .moveTo({x:400, y:750})
        .release();
    return this.performTouchAction(action);
};
function iFindElement (id) {
    return this
        .swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
        .then(function () {
            return this
                .elementByAccessibilityId(id)
                .isDisplayed()
                .then(res  => (res ? res : iFindElement.call(this, id)))
        }.bind(this))
}
exports.iScrollTo = function (element) {
    return this
        .elementByAccessibilityId(element)
        .isDisplayed()
        .then(res  => (res ? res : iFindElement.call(this, element)))
};
exports.iScrollDown = function () {
    return this
        .swipe({startX: 100, startY: 600, endX: 100, endY: 100, duration: 1000})
};
