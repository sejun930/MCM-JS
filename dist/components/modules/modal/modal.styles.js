"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = exports.CloseButtonWrapper = exports.Content = exports.ContentsWrapper = exports.Item = exports.Wrapper = void 0;
var styled_1 = __importDefault(require("@emotion/styled"));
var responsiveBreakPoints_1 = require("../../../commons/breakPoints/responsiveBreakPoints");
exports.Wrapper = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: unset;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: -1;\n\n  transition: ", ";\n\n  ", "\n"], ["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: unset;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: -1;\n\n  transition: ", ";\n\n  ", "\n"])), function (props) {
    return !props.onBGAnimation ? "unset" : "all 0.2s ease-out";
}, function (props) {
    return props.isOpen && {
        backgroundColor: "rgba(0, 0, 0, .45)",
        zIndex: 999,
    };
});
exports.Item = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n\n  .oepn-modal-animation {\n    width: 100%;\n    height: 100%;\n    left: 0%;\n    top: 0%;\n  }\n\n  @media ", " {\n    width: 90%;\n  }\n"], ["\n  position: relative;\n\n  .oepn-modal-animation {\n    width: 100%;\n    height: 100%;\n    left: 0%;\n    top: 0%;\n  }\n\n  @media ", " {\n    width: 90%;\n  }\n"])), responsiveBreakPoints_1.breakPoints.mobile);
exports.ContentsWrapper = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 500px;\n  height: 500px;\n\n  @media ", " {\n    width: 100%;\n  }\n"], ["\n  width: 500px;\n  height: 500px;\n\n  @media ", " {\n    width: 100%;\n  }\n"])), responsiveBreakPoints_1.breakPoints.mobile);
exports.Content = styled_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: white;\n  border-radius: 10px;\n  position: relative;\n  overflow: auto;\n  transition: all 0.2s ease-out;\n  width: 0px;\n  height: 0px;\n  left: 50%;\n  top: 50%;\n  padding: 1rem;\n\n  ", "\n"], ["\n  background-color: white;\n  border-radius: 10px;\n  position: relative;\n  overflow: auto;\n  transition: all 0.2s ease-out;\n  width: 0px;\n  height: 0px;\n  left: 50%;\n  top: 50%;\n  padding: 1rem;\n\n  ", "\n"])), function (props) {
    return !props.onModalOpenAnimation && {
        width: "100%",
        height: "100%",
        left: "auto",
        top: "auto",
    };
});
exports.CloseButtonWrapper = styled_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  /* position: absolute; */\n  display: flex;\n  justify-content: flex-end;\n"], ["\n  /* position: absolute; */\n  display: flex;\n  justify-content: flex-end;\n"])));
exports.CloseButton = styled_1.default.button(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  background-color: unset;\n  border: unset;\n\n  .cmm-unit-image {\n    object-fit: cover;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  background-color: unset;\n  border: unset;\n\n  .cmm-unit-image {\n    object-fit: cover;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
