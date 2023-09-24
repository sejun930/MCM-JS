import { ListInfoType, ListTypeWithIdx } from "./split.types";

export interface InitInfoTypes {
  widthList: { [key: number]: number };
  uid: string;
}

export const initInfo: InitInfoTypes = {
  widthList: {}, // Contents 최소 넓이값 지정
  uid: "", // uid 고정
};

// 현재 가져온 전체 컴포넌트의 최소 크기값 정하기
export const getAllWidthList = (list: Array<ListInfoType>) => {
  const _minWidthList: { [key: number]: number } = {};

  let percent = 100;
  let min = Math.floor(100 / list.length); // 리스트 개수만큼 나눈 값이 최소값

  if (list.length > 1) {
    // 각각의 리스트에 순번 지정하기
    list = list.map((el: ListTypeWithIdx, idx) => {
      el.idx = idx;

      if (el.startWidth !== undefined) {
        // 0이 전달된다면 무효화 처리
        if (el.startWidth === 0) delete el.startWidth;
        else {
          if (el.startWidth > 90) el.startWidth = 90; // 90% 초과시 90% 적용
          else if (el.startWidth <= 10) el.startWidth = 10; // 10% 미만시 10% 적용
        }
      }

      return el;
    });

    // 최소값이 높은 순서대로 정렬
    const sortMax = [...list].sort((a, b) => {
      const num1 = a.startWidth || 0;
      const num2 = b.startWidth || 0;

      return num1 < num2 ? 1 : -1;
    });

    // (startWidth) 최소값 우선 계산
    const filterStartWithList = sortMax.filter((el) => el.startWidth);
    let startWithLen = filterStartWithList.length;

    if (filterStartWithList.length)
      filterStartWithList.forEach((el: ListTypeWithIdx) => {
        let { startWidth, idx } = el;

        if (startWidth !== undefined) {
          // 수동으로 조절할 경우
          if (percent - startWidth >= 0) {
            percent -= startWidth;
            startWithLen--;

            _minWidthList[idx] = startWidth;
          } else {
            // 0프로 미만으로 넘어갈 경우
            min = Math.floor(percent / startWithLen);
            _minWidthList[idx] = min;
          }
        }
      });

    // 수동으로 조정되지 않는 컴포넌트일 경우
    const originList = sortMax.filter((el) => el.startWidth === undefined);
    min = Math.floor(percent / originList.length);
    if (min < 10) min = 10; // 10%보다 작다면 최소값 10% 적용
    if (min > 90) min = 90; // 90%보다 크다면 최대값 90% 적용

    if (originList.length)
      originList.forEach((el: ListTypeWithIdx) => {
        const { idx } = el;
        _minWidthList[idx] = min;
      });
  }
  return _minWidthList;
};

export interface SplitBarInfosTypes {
  isStart: boolean;
  leftNode: null | HTMLElement;
  rightNode: null | HTMLElement;
  maxWidth: number;
}

// Bar 이동을 위한 여러 정보 저장
export const splitBarInitInfos: SplitBarInfosTypes = {
  isStart: false, // 드래그 시작 여부
  leftNode: null, // 왼쪽 컴포넌트 node;
  rightNode: null, // 오른쪽 컴포넌트 node;
  maxWidth: 0,
};
