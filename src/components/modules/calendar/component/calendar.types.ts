import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

// 시간 타입
export interface DateTypes {
  year?: number;
  month?: number;
  day?: number;
}
// limitYear 객체 props 타입
interface LimitYearObjType {
  min?: number; // 최저치, 선택하지 않으면 -50년 까지
  max?: number; // 최대치, 선택하지 않으면 +50년 까지
}
// limitYear props 전체 타입
export type LimitYearType = number | LimitYearObjType;

export interface UseInputObjType {
  year?: boolean; // 연도 기입하는 input으로 변경
  month?: boolean; // 월 기입하는 input으로 변경
  day?: boolean; // 일 기입하는 input으로 변경
}
export type UseInputTypes =
  | boolean // true 전환시 연, 월, 일 전체를 input 태그로 변환
  | UseInputObjType;

// 시간 초기 설정
export const dateInitTypes: DateTypes = {
  year: 0,
  month: 0,
  day: 0,
};

export type CalendarPropsTypes = CommonsSelectorTypes & {
  // 시작일 설정
  startDate?: Date | DateTypes;
  // 종료일 설정
  endDate?: Date | DateTypes;
  // 선택할 수 있는 최저, 최대 연도의 범위 설정 및 강제 고정
  // number 타입 전달시 연도의 범위로 사용
  // 객체 타입 전달시 연도의 최저, 최대 연도 수동 사용
  limitYear?: LimitYearType;
  // 연, 월, 일을 직접 기입할 수 있도록 input 태그로 변환할 건지 선택
  useInput?: UseInputTypes;
};

interface CalendarInitDataTypes {
  // 시작일 설정
  startDate?: DateTypes;
  // uuid
  uuid: string;
}

// 데이터 정보 종합 객체
export const calendarInitData: CalendarInitDataTypes = {
  startDate: { ...dateInitTypes },
  uuid: "",
};
