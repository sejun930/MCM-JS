"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentWrapper = exports.Item = exports.Wrapper = void 0;
var styled_1 = __importDefault(require("@emotion/styled"));
var responsiveBreakPoints_1 = require("../../../commons/breakPoints/responsiveBreakPoints");
exports.Wrapper = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.35);\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.35);\n"])));
exports.Item = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n"])));
exports.ContentWrapper = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: white;\n  width: 600px;\n  height: 600px;\n  border-radius: 10px;\n  padding: 1rem;\n\n  @media ", " {\n    width: 320px;\n    height: 320px;\n  }\n"], ["\n  background-color: white;\n  width: 600px;\n  height: 600px;\n  border-radius: 10px;\n  padding: 1rem;\n\n  @media ", " {\n    width: 320px;\n    height: 320px;\n  }\n"])), responsiveBreakPoints_1.breakPoints.mobile);
var templateObject_1, templateObject_2, templateObject_3;
