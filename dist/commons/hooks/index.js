"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "/Users/sejuns/Desktop/myProject/my_modules/cmm-js/src/commons/hooks/index.tsx";
// 공용으로 사용되는 함수들이 저장되는 컴포넌트입니다.
function CommonsHooksComponents() {
    var _this = this;
    // 컴포넌트 렌더하기
    var componentRender = function (Component) {
        return (0, jsx_dev_runtime_1.jsxDEV)(Component, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 11 }, _this);
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
