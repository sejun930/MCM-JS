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
var modal_styles_1 = require("./modal.styles");
var images_1 = __importDefault(require("../../../../commons/images"));
var image_1 = __importDefault(require("../../../../commons/units/image"));
var react_1 = require("react");
function ModalPage(_a) {
    var children = _a.children, styles = _a.styles, hideCloseButton = _a.hideCloseButton, closeButtonStyles = _a.closeButtonStyles, onCloseModal = _a.onCloseModal, offAutoClose = _a.offAutoClose, show = _a.show;
    var _ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (!offAutoClose) {
            // 외부 클릭시 실행되는 이벤트
            document.addEventListener("click", handleClickEvent, true);
            return function () {
                document.removeEventListener("click", handleClickEvent, true);
            };
        }
    }, [offAutoClose]);
    var handleClickEvent = function (event) {
        if (_ref.current && !_ref.current.contains(event.target)) {
            if (onCloseModal)
                onCloseModal();
            document.removeEventListener("click", handleClickEvent, true);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(modal_styles_1.Item, __assign({ className: "cmm-modal-item", style: styles, ref: _ref }, { children: [!hideCloseButton && ((0, jsx_runtime_1.jsx)(modal_styles_1.CloseButtonWrapper, __assign({ className: "cmm-modal-close-wrapper" }, { children: (0, jsx_runtime_1.jsx)(modal_styles_1.CloseButton, __assign({ className: "cmm-modal-close-button", onClick: onCloseModal }, { children: (0, jsx_runtime_1.jsx)(image_1.default, { src: (closeButtonStyles === null || closeButtonStyles === void 0 ? void 0 : closeButtonStyles.src) || images_1.default["close-button"], className: "cmm-modal-close-img" }) })) }))), (0, jsx_runtime_1.jsx)(modal_styles_1.ContentWrapper, __assign({ className: "cmm-modal-content-wrapper" }, { children: children }))] })));
}
exports.default = ModalPage;
