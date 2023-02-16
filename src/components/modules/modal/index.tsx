import ModalPage from "./modal.container";
import { ReactElement, ReactNode, useState } from "react";

export interface IProps {
  children?: ReactElement<any, any> | string;
  // 렌더될 하위 컴포넌트, 디폴트 값으로 설정되며 Component가 있으면 Component를 렌더한다.
  styles?: {
    width: string;
    height: string;
  };
  // 내부 콘텐츠 내용 스타일 지정
  show: boolean; // 모달 실행 스위스 변수, true일 경우 실행되며 false일 경우 종료된다. (default : false)
  showCloseButton?: boolean; // 모달 닫는 아이콘 출력 여부, true일 경우 표현 (default : false)
}

export default function _Modal({
  children,
  show,
  styles,
  showCloseButton,
}: IProps) {
  const [_show, setShow] = useState<boolean>(show ?? false);

  // 모달 무조건 종료하기
  const closeModal = () => setShow(false);

  return (
    (show && (
      <ModalPage
        show={_show}
        styles={styles}
        children={children}
        showCloseButton={showCloseButton}
        closeModal={closeModal}
      />
    )) || <></>
  );
}
