import { ReactElement } from "react";

export interface ModalPropsType {
  children?: JSX.Element | string;
  // 렌더될 하위 컴포넌트, 디폴트 값으로 설정되며 Component가 있으면 Component를 렌더한다.
  styles?: {
    width: string;
    height: string;
  };
  // 내부 콘텐츠 내용 스타일 지정
  show: boolean;
  // ** 모달 실행 스위스 변수, true일 경우 실행되며 false일 경우 종료된다. (default : false)
  onCloseModal: () => void;
  // ** 모달을 종료시키는 함수
  hideCloseButton?: boolean;
  // 모달 닫기 아이콘 감추기, true일 경우 제거 (default : false)
  closeButtonStyles?: {
    // 모달 닫는 아이콘에 대한 스타일 및 이미지 경로 지정
    width?: string;
    height?: string;
    src?: string; // 아이콘 이미지를 변경할 수 있음
  };
  offAutoClose?: boolean;
  // 모달 외의 영역을 클릭했을 때 모달이 종료되지 않게 설정 (default : false)
  offAnimation?: boolean;
  // 모달 실행시 애니메이션 작동 끄기 (default : false)
}
