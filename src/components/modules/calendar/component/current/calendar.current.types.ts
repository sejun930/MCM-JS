import { DateTypes } from "../calendar.types";
import { LimitYearType, UseInputObjType } from "../calendar.types";

export interface CalendarCurrentTypes {
  startDate: DateTypes;
  limitYear: LimitYearType;
  useInputInfo: UseInputObjType;
  changeDate: ({ key, value }: { key: string; value: number }) => void;
}
