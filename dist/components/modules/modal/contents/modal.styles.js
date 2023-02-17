"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = exports.CloseButtonWrapper = exports.ContentWrapper = exports.Item = exports.Wrapper = void 0;
var styled_1 = __importDefault(require("@emotion/styled"));
var responsiveBreakPoints_1 = require("../../../../commons/breakPoints/responsiveBreakPoints");
exports.Wrapper = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: unset;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: -1;\n\n  transition: ", ";\n\n  ", "\n"], ["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: unset;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: -1;\n\n  transition: ", ";\n\n  ", "\n"])), function (props) {
    return props.offAnimation ? "unset" : "all 0.3s ease-out";
}, function (props) {
    return props.isOpen && {
        backgroundColor: "rgba(0, 0, 0, .45)",
        zIndex: 999,
    };
});
exports.Item = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 560px;\n  height: 560px;\n  position: relative;\n  /* transition: all 0.3s ease-out;\n  position: absolute;\n  width: 1%;\n  height: 1%; */\n\n  @media ", " {\n    width: 80%;\n    height: 300px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 560px;\n  height: 560px;\n  position: relative;\n  /* transition: all 0.3s ease-out;\n  position: absolute;\n  width: 1%;\n  height: 1%; */\n\n  @media ", " {\n    width: 80%;\n    height: 300px;\n  }\n"])), responsiveBreakPoints_1.breakPoints.mobile);
exports.ContentWrapper = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: white;\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  padding: 1rem;\n  position: relative;\n"], ["\n  background-color: white;\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  padding: 1rem;\n  position: relative;\n"])));
exports.CloseButtonWrapper = styled_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  display: flex;\n  top: -30px;\n  right: 0px;\n  justify-content: flex-end;\n"], ["\n  position: absolute;\n  display: flex;\n  top: -30px;\n  right: 0px;\n  justify-content: flex-end;\n"])));
exports.CloseButton = styled_1.default.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 25px;\n  height: 25px;\n\n  .cmm-unit-image {\n    object-fit: cover;\n  }\n"], ["\n  width: 25px;\n  height: 25px;\n\n  .cmm-unit-image {\n    object-fit: cover;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
