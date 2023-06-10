import { CSSProperties, MouseEvent, MutableRefObject } from "react";
import OriginModal from "./modal.container";

export interface ModalPropsType {
  children?: React.ReactNode;
  // 렌더될 하위 컴포넌트, 디폴트 값으로 설정되며 Component가 있으면 Component를 렌더한다.
  className?: string;
  // wrapper에 삽입될 className
  id?: string;
  // wrapper에 삽입될 id
  name?: string;
  // wrapper에 삽입될 data-name
  modalSize?: {
    width?: string;
    height?: string;
  };
  // 모달에 적용되는 스타일
  modalStyles?: CSSProperties;
  // 모달 사이즈 (width, height) 지정
  mobileModalSize?: {
    width?: string;
    height?: string;
  };
  // 모바일 환경에서 적용될 사이즈 (width, height) 지정 (767px 이하부터 적용)
  show: boolean;
  // ** 모달 실행 스위스 변수, true일 경우 실행되며 false일 경우 종료된다. (default : false)
  onCloseModal: () => void;
  // ** 모달을 종료시키는 함수
  closeMent?: string;
  // 닫기 버튼 앞으로 출력될 문자열
  hideCloseButton?: boolean;
  // 모달 닫기 아이콘 감추기, true일 경우 제거 (default : false)
  offAutoClose?: boolean;
  // 모달 외의 영역을 클릭했을 때 모달이 종료되지 않게 설정 (default : false)
  showBGAnimation?: boolean;
  // 모달 실행시 배경화면 애니메이션 작동 (default : false)
  showModalOpenAnimation?: boolean;
  // 모달 실행시 모달창 오픈 애니메이션 작동 (default : false)
  closeButtonInfo?: {
    buttonSize?: string | number;
    buttonWeight?: string | number;
    buttonColor?: string;
  };
  // 닫기 버튼에 관한 사이즈, 굵기, 색상에 대한 설정
  _wmo?: boolean;
  // (window modal open) window 형식의 오픈 여부
  openIdx?: number;
  // state 렌더가 아닌 window 형식의 오픈시 제거할 id 값
  onAfterCloseEvent?: () => void;
  // 모달이 종료된 다음 시점에 실행될 이벤트
  onFixWindow?: boolean;
  // 모달이 열려있는 상태에서 스크롤 이동을 방지할 건지에 대한 여부
}

export interface ModalPropsUITypes {
  _modalWrapperRef?: MutableRefObject<HTMLDivElement>;
  _itemRef?: MutableRefObject<HTMLDivElement>;
  _wrapperRef?: MutableRefObject<HTMLDivElement>;
  _contentsRef?: MutableRefObject<HTMLDivElement>;
  handleClickEvent: (event: MouseEvent) => void;
  _onCloseModal: () => void;
}

type ModalOmitOpenWindowType = Omit<ModalPropsType, "openIdx" | "_mwo">;
export type ModalPartialWithToggleType = Partial<ModalOmitOpenWindowType>;

export type ModalType = typeof OriginModal & {
  open: (props?: ModalPartialWithToggleType) => void;
  close: (props?: ModalCloseFuncType) => boolean;
};

export interface ModalCloseFuncType {
  id?: string;
  className?: string;
  // onCloseModal?: () => void;
}
