import { DateTypes, dateInitTypes, UseInputTypes } from "./calendar.types";

// 전달된 날짜를 객체 형태로 변환
const transformObj = (date): DateTypes => {
  // 연, 월, 일 객체 형태로 저장
  let result = { ...dateInitTypes };

  if (getIsDateObj(date)) {
    // 객체 형태로 전달받은 경우

    // 현재 날짜 가져오기
    const now = new Date();

    result = {
      year: date.year || now.getFullYear(), // 연
      month: date.month || now.getMonth() + 1, // 월
      day: date.day || now.getDate(), // 일
    };
  } else {
    // 날짜 형태로 전달받은 경우
    result = {
      year: date.getFullYear(), // 연
      month: date.getMonth() + 1, // 월
      day: date.getDate(), // 일
    };
  }
  return result;
};

// 전달된 Date 데이터가 year, month, day를 포함한 객체인지를 체크
const getIsDateObj = (date) => {
  return (
    date.year !== undefined ||
    date.month !== undefined ||
    date.day !== undefined
  );
};

// useInput 사용 여부 반환
const getUseInputInfo = (useInput: UseInputTypes) => {
  let info: UseInputTypes = { year: false, month: false, day: false };
  if (!useInput) return info;

  // useInput props를 사용중일 경우
  if (useInput) {
    // 전체를 사용할 경우
    if (typeof useInput === "boolean")
      info = { year: true, month: true, day: true };
    // 부분별로 사용할 경우
    else if (typeof useInput === "object") info = { ...info, ...useInput };
  }

  return info;
};

export { transformObj, getUseInputInfo };
