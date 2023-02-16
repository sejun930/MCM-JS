"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var styles_1 = require("./styles");
function ModalPage(_a) {
    var children = _a.children, styles = _a.styles;
    return ((0, jsx_runtime_1.jsx)(styles_1.Wrapper, __assign({ className: "cmm-modal-wrapper" }, { children: (0, jsx_runtime_1.jsx)(styles_1.Item, __assign({ className: "cmm-modal-item" }, { children: (0, jsx_runtime_1.jsx)(styles_1.ContentWrapper, __assign({ className: "cmm-modal-content-wrapper", style: styles }, { children: children })) })) })));
}
exports.default = ModalPage;
