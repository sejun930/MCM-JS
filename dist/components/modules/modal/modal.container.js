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
var react_1 = require("react");
var modal_presenter_1 = __importDefault(require("./modal.presenter"));
function _Modal(props) {
    var show = props.show, onModalOpenAnimation = props.onModalOpenAnimation, offAutoClose = props.offAutoClose, onCloseModal = props.onCloseModal;
    var _a = (0, react_1.useState)(show || false), isOpen = _a[0], setIsOpen = _a[1];
    var _ref = (0, react_1.useRef)();
    var _contentsRef = (0, react_1.useRef)();
    // show의 값에 따라 모달 오픈 여부 결정
    (0, react_1.useEffect)(function () {
        var _a;
        setIsOpen(show);
        // 모달 오픈시 실행 애니메이션 작동하기
        if (show && onModalOpenAnimation) {
            if (_contentsRef.current) {
                (_a = _contentsRef === null || _contentsRef === void 0 ? void 0 : _contentsRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("oepn-modal-animation");
                return function () {
                    var _a;
                    (_a = _contentsRef === null || _contentsRef === void 0 ? void 0 : _contentsRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("oepn-modal-animation");
                };
            }
        }
    }, [show]);
    (0, react_1.useEffect)(function () {
        if (!offAutoClose) {
            // 외부 클릭시 실행되는 이벤트
            document.addEventListener("mousedown", handleClickEvent, true);
            return function () {
                document.removeEventListener("mousedown", handleClickEvent, true);
            };
        }
    }, [show, offAutoClose]);
    var handleClickEvent = function (event) {
        if (_ref.current && !_ref.current.contains(event.target)) {
            if (onCloseModal)
                onCloseModal();
            document.removeEventListener("mousedown", handleClickEvent, true);
        }
    };
    var _props = __assign({}, props);
    _props.show = isOpen;
    _props._ref = _ref;
    _props._contentsRef = _contentsRef;
    return (0, jsx_runtime_1.jsx)(modal_presenter_1.default, { props: __assign({}, _props) });
}
exports.default = _Modal;
