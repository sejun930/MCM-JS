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
var jsx_runtime_1 = require("react/jsx-runtime");
var images_1 = __importDefault(require("../../../commons/images"));
var modal_styles_1 = require("./modal.styles");
var image_1 = __importDefault(require("../../../commons/units/image"));
var _ModalUIPage = function (props) {
    var _a = props.props, show = _a.show, onBGAnimation = _a.onBGAnimation, _ref = _a._ref, styles = _a.styles, children = _a.children, _contentsRef = _a._contentsRef, onModalOpenAnimation = _a.onModalOpenAnimation, hideCloseButton = _a.hideCloseButton, onCloseModal = _a.onCloseModal, closeButtonSize = _a.closeButtonSize, closeButtonSrc = _a.closeButtonSrc;
    var closeModalStyles = {};
    if (closeButtonSize) {
        var _closeButtonSize = closeButtonSize;
        if (!closeButtonSize.includes("px"))
            _closeButtonSize = closeButtonSize + "px";
        closeModalStyles.width = _closeButtonSize;
        closeModalStyles.height = _closeButtonSize;
    }
    return ((0, jsx_runtime_1.jsx)(modal_styles_1.Wrapper, __assign({ className: "cmm-modal-wrapper", isOpen: show, onBGAnimation: onBGAnimation || false }, { children: (0, jsx_runtime_1.jsxs)(modal_styles_1.Item, __assign({ className: "cmm-modal-item", ref: _ref }, { children: [show && ((0, jsx_runtime_1.jsx)(modal_styles_1.CloseButtonWrapper, __assign({ className: "cmm-modal-close-wrapper" }, { children: !hideCloseButton && ((0, jsx_runtime_1.jsx)(modal_styles_1.CloseButton, __assign({ className: "cmm-modal-close-button", onClick: onCloseModal, style: closeModalStyles || {} }, { children: (0, jsx_runtime_1.jsx)(image_1.default, { src: closeButtonSrc || images_1.default["close-button"], className: "cmm-modal-close-img" }) }))) }))), (0, jsx_runtime_1.jsx)(modal_styles_1.ContentsWrapper, __assign({ className: "cmm-modal-contents-wrapper", style: styles }, { children: (0, jsx_runtime_1.jsx)(modal_styles_1.Content, __assign({ className: "cmm-modal-content", ref: _contentsRef, onModalOpenAnimation: onModalOpenAnimation }, { children: show ? children : null })) }))] })) })));
};
exports.default = _ModalUIPage;
