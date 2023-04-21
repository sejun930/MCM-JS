// interface ModalClassTypes {
//   wrapper: "mcm-modal-wrapper";
//   items: "mcm-modal-items";
//   closeButtonWrapper: "mcm-modal-close-button-wrapper";
//   closeButtonMentButton: "mcm-modal-close-ment-button";
// }

// UI 클래스 모음
export const modalClassList = {
  wrapper: "mcm-modal-wrapper",
  items: "mcm-modal-items",
  closeButtonWrapper: "mcm-modal-close-button-wrapper",
  closeButtonMentButton: "mcm-modal-close-ment-button",
  closeButtonMent: "mcm-modal-close-ment",
  closeButton: "mcm-modal-close-button",
  contents: "mcm-modal-contents",
};

// 화면 렌더용 클래스 모음
export const modalFuncClass = {
  windowOpen: "mcm-modal-window-type",
  open: "mcm-modal-open",
  animation: "mcm-modal-animation",
  minimum: "mcm-modal-item-minimum",
  itemShow: "mcm-modal-item-show",
  bgClose: "mcm-modal-bg-close",
};

modalClassList as typeof modalClassList;
modalFuncClass as typeof modalFuncClass;
