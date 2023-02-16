"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// 공용으로 사용되는 함수들이 저장되는 컴포넌트입니다.
function CommonsHooksComponents() {
    // 컴포넌트 렌더하기
    var componentRender = function (Component) {
        return (0, jsx_runtime_1.jsx)(Component, {});
    };
    return {
        componentRender: componentRender,
    };
}
exports.default = CommonsHooksComponents;
