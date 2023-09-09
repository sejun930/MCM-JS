import _Alert from "../components";

import { AlertPropsType } from "../components/alert.types";
import { createRoot } from "react-dom/client";

// 현재 실행되어 있는 alert 리스트
let openList: Array<null | ReturnType<typeof setTimeout>> = [];

// 초기 셋팅
const initAlert = () => {
  if (!document.getElementById(`mcm-alert-area`)) {
    const area = document.createElement("div");
    area.id = `mcm-alert-area`;

    document.body.append(area);
  }
};

// alert 띄우기
const openAlert = (props: AlertPropsType) => {
  initAlert(); // 초기 셋팅 확인하기

  const { closeDelayTime, id } = props;
  if (id) {
    // 해당 아이디 값으로 이미 실행되고 있는 alert이 있는지 검증
    const target = document.getElementById(id);
    // 중복된 id 값이 있다면 실행하지 않는다.
    if (target) return;
  }
  const _div = document.createElement("div");

  // 현재 실행되는 alert의 순서도 구하기
  const sequence = 0 + openList.length;

  _div.className = `mcm-alert mcm-alert-${sequence + 1}`;

  // 삭제 타이머 이벤트 저장
  openList[sequence] = setTimeout(() => {
    _div.remove();
    // 삭제 후 비워두기
    clearTimeout(openList[sequence]);
  }, closeDelayTime || 5000000);

  // 설정된 alert 추가하기
  const area = document.getElementById(`mcm-alert-area`);
  area.append(_div);

  // alert 컴포넌트 렌더
  createRoot(_div).render(<_Alert sequence={sequence} {...props} />);
};

// alert 삭제하기
const removeAlert = (props: number | { id: string }) => {
  // alert 순서 또는 id 값을 통해 현재 alert 제거
  let target: null | HTMLDivElement | HTMLElement = null;
  let sequence = null;
  if (typeof props === "number") {
    // 순서가 전달된 경우
    target = document.querySelector(`.mcm-alert-${props}`);
    sequence = props;
  } else if (typeof props === "object" && props.id) {
    // 아이디 값이 전달된 경우
    target = document.querySelector(`#${props.id}`);

    if (target && target?.parentElement) {
      target = target.parentElement;

      if (target.classList) {
        // 아이디 값으로 삭제된 alert의 순서 가져오기
        const classList = Array.from(target.classList);
        classList.some((el) => {
          if (el.includes("mcm-alert-")) {
            sequence = Number(el.substring("mcm-alert-".length)) - 1;
          }
        });
      }
    }
  }

  if (target && sequence !== null && typeof sequence === "number") {
    target.remove();
    // 삭제 후 비워두기
    clearTimeout(openList[sequence]);
  }
};

// alert 전체 초기화
const clearAlert = () => {
  // 모든 닫기 타이머 이벤트 중지하기
  openList.forEach((el) => {
    if (el) clearTimeout(el);
  });
  openList = [];

  // 전체 틀 삭제하기
  if (document.getElementById("mcm-alert-area")) {
    document.getElementById("mcm-alert-area").remove();
  }
};

export { openAlert, removeAlert, clearAlert };
