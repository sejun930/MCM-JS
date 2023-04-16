import _Modal from "../modal.container";

export const modalOpen = () => {
  return _Modal({ show: true, onCloseModal: () => {} });
};
