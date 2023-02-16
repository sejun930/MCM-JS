"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var modal_container_1 = __importDefault(require("./modal.container"));
function _Modal(_a) {
    var children = _a.children, show = _a.show, styles = _a.styles;
    return ((show && ((0, jsx_runtime_1.jsx)(modal_container_1.default, { show: show !== null && show !== void 0 ? show : false, styles: styles, children: children }))) || (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = _Modal;
