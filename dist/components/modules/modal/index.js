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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "/Users/sejuns/Desktop/myProject/my_modules/cmm-js/src/components/modules/modal/index.tsx";
var modal_contents_1 = __importDefault(require("./contents/modal.contents"));
var react_1 = require("react");
var modal_styles_1 = require("./contents/modal.styles");
function _Modal(_a) {
    var children = _a.children, show = _a.show, onCloseModal = _a.onCloseModal, styles = _a.styles, hideCloseButton = _a.hideCloseButton, closeButtonStyles = _a.closeButtonStyles, offAutoClose = _a.offAutoClose, offAnimation = _a.offAnimation;
    var _b = (0, react_1.useState)(false), _show = _b[0], setShow = _b[1];
    // show의 변화에 따라 모달 toggle
    (0, react_1.useEffect)(function () {
        setShow(show);
    }, [show]);
    return ((0, jsx_dev_runtime_1.jsxDEV)(modal_styles_1.Wrapper, __assign({ className: "cmm-modal-wrapper", isOpen: show, offAnimation: offAnimation || false }, { children: (_show && ((0, jsx_dev_runtime_1.jsxDEV)(modal_contents_1.default, { show: _show, styles: styles, children: children, hideCloseButton: hideCloseButton, onCloseModal: onCloseModal, closeButtonStyles: closeButtonStyles, offAutoClose: offAutoClose || false }, void 0, false, { fileName: _jsxFileName, lineNumber: 30, columnNumber: 19 }, this))) || (0, jsx_dev_runtime_1.jsxDEV)(jsx_dev_runtime_1.Fragment, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 40, columnNumber: 12 }, this) }), void 0, false, { fileName: _jsxFileName, lineNumber: 24, columnNumber: 11 }, this));
}
exports.default = _Modal;
