"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
function CommonsHooksComponents() {
    // 컴포넌트 렌더하기
    var componentRender = function (Component) {
        return (0, jsx_runtime_1.jsx)(Component, {});
    };
    // 컴포넌트 클래스 네임 완성
    var getAllComponentsClassName = function (defaultClass, className) {
        // defaultClass : 디폴트로 무조건 적용되는 클래스 이름
        // className : 새로 추가될 클래스 이름
        var _className = "".concat(defaultClass).concat(className ? " ".concat(className) : "");
        return _className;
    };
    return {
        componentRender: componentRender,
        getAllComponentsClassName: getAllComponentsClassName,
    };
}
exports.default = CommonsHooksComponents;
