import { LimitYearType, DateTypes } from "../calendar.types";

// 연도 리스트 및 최초 페이지 번호 구하기
const getYearList = ({
  limitYear,
  startDate,
}: {
  limitYear: LimitYearType;
  startDate: DateTypes;
}): {
  yearList: Array<number>;
  yearIdx: number;
} => {
  // 연도의 최저, 최대 범위
  let range = 50;
  // 설정 범위가 존재하는 경우 (number 타입으로 전달된 경우)
  if (limitYear !== undefined && typeof limitYear === "number") {
    if (limitYear > 0 && limitYear <= 100) range = limitYear;
  }
  const { year } = startDate;

  // 현재 연도에서의 최저 및 최대 연도 저장
  let [min, max] = [year - range, year + range];

  // 설정해 놓은 연도가 있다면
  if (limitYear && typeof limitYear === "object") {
    if (limitYear.min) {
      // 최저치 구하기

      // 현재 연도가 최저 연도보다 더 높을 경우에만 연산
      if (year >= limitYear.min) {
        // 현재 연도와 최저 연도와의 차이가 100 이상을 넘지 않을 경우에만
        if (year - limitYear.min <= 100) {
          min = limitYear.min;
        }
      }
    }

    if (limitYear.max) {
      // 최대치 구하기

      // 현재 연도보다 최대 연도가 더 높을 경우에만 연산
      if (limitYear.max >= year) {
        // 최대 연도와 현재 연도와의 차이가 100 이상을 넘지 않을 경우에만
        if (limitYear.max - year <= 100) {
          max = limitYear.max;
        }
      }
    }
  }

  // 리스트 구성하기
  const len = max - min + 1;
  // 연도 리스트 구하기
  const yearList = Array.from(new Array(len), (_, idx) => min + idx);

  return {
    yearList,
    yearIdx: yearList.indexOf(year) + 1,
  };
};

export { getYearList };
