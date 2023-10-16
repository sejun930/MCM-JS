import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

// 시간 타입
export interface DateTypes {
  year?: number;
  month?: number;
  day?: number;
}

// 시간 초기 설정
export const DateInitTypes: DateTypes = {
  year: 0,
  month: 0,
  day: 0,
};

export type CalendarPropsTypes = CommonsSelectorTypes & {
  // 시작일 설정
  startDate?: Date | DateTypes;
};

interface CalendarInitDataTypes {
  // 시작일 설정
  startDate?: DateTypes;
}

// 데이터 정보 종합 객체
export const calendarInitData: CalendarInitDataTypes = {
  startDate: { ...DateInitTypes },
};
