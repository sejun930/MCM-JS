import styled from "@emotion/styled";

import { CurrentWrapper, CurrentItems } from "..";
import { calendarClassList } from "../calendar.class";
import { CalendarCurrentTypes } from "./calendar.current.types";

import Slider from "../../../slider";
import { _SpanText, _Input } from "mcm-js-commons";

import { getYearList } from "./calendar.current.func";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function CalendarCurrentPage(props: CalendarCurrentTypes) {
  const { startDate, limitYear } = props;

  // 연도 리스트 및 인덱스 정보
  const yearInfo = getYearList({ limitYear, startDate }) || {
    yearList: [],
    yearIdx: 0,
  };
  const { yearList, yearIdx } = yearInfo;

  // 월 범위 구하기 (12개월 고정)
  const monthList = Array.from(new Array(12), (_, num) => 1 + num);

  return (
    <CurrentWrapper className={calendarClassList.currentWrapper}>
      <CurrentItems className={calendarClassList.currentItems}>
        {yearList && yearList.length >= 1 && (
          <Slider
            useAnimation
            firstPage={yearIdx}
            // changePageEvent={(idx) =>
            //   changeTempDate({ key: "year", value: yearList[idx] })
            // }
            setArrow={{ showHover: true }}
          >
            {yearList.map((num) => (
              <Current>{num}</Current>
            ))}
          </Slider>
        )}
        <Mark className="mcm-calendar-mark">Year</Mark>
      </CurrentItems>

      <CurrentItems className={calendarClassList.currentItems} isMonth={true}>
        {monthList && monthList.length === 12 && (
          <Slider
            useAnimation
            firstPage={startDate.month}
            // changePageEvent={(idx) =>
            //   changeTempDate({ key: "year", value: yearList[idx] })
            // }
            setArrow={{ showHover: true }}
          >
            {monthList.map((num) => {
              const month = String(num).padStart(2, "0");
              return <Current>{month}</Current>;
            })}
          </Slider>
        )}
        <Mark className="mcm-calendar-mark">Month</Mark>
      </CurrentItems>
    </CurrentWrapper>
  );
}

export const Current = styled(_SpanText)`
  font-size: 24px;
  font-weight: 700;
`;

export const Mark = styled(_SpanText)`
  position: absolute;
  right: 30px;
  bottom: 4px;
  font-size: 40px;
  font-weight: 700;
  color: #777777;
  text-shadow: 0px 0px 4px gray;
  opacity: 0;

  pointer-events: none; // PC 이미지 다운로드 금지
  -webkit-touch-callout: none; // 아이폰 다운로드 금지
  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;

  @media ${breakPoints.mobileLarge} {
    font-size: 32px;
    right: 24px;
  }
`;

// export const InputWrapper = styled.div`
//   position: absolute;
//   z-index: 100;
// `;

// export const Input = styled.input`
//   font-size: 24px;
//   font-weight: 700;
//   width: 100%;
//   text-align: center;
//   padding: 2px;
//   border: unset;
// `;
