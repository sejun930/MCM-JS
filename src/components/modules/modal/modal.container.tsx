import {
  ContentWrapper,
  Item,
  Wrapper,
  CloseButtonWrapper,
  CloseButton,
} from "./styles";

interface ICurrentTypes {
  closeModal: () => void;
}

import { IProps } from ".";

export default function ModalPage({
  children,
  styles,
  showCloseButton,
  closeModal,
}: IProps & ICurrentTypes) {
  return (
    <Wrapper className="cmm-modal-wrapper">
      <Item className="cmm-modal-item" style={styles}>
        {showCloseButton && (
          <CloseButtonWrapper className="cmm-modal-close-wrapper">
            <CloseButton className="cmm-modal-close-button"></CloseButton>
          </CloseButtonWrapper>
        )}
        <ContentWrapper className="cmm-modal-content-wrapper">
          {children}
        </ContentWrapper>
      </Item>
    </Wrapper>
  );
}
