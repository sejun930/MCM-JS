import _Alert from "../components";
import { alertClassList } from "../components/alert.class";

import { AlertPropsType } from "../components/alert.types";
import { createRoot } from "react-dom/client";

// 현재 실행되어 있는 alert 리스트
let openList: Array<null | ReturnType<typeof setTimeout>> = [];
// 초기 설정 여부
let hasAlertArea = false;

// 초기 셋팅
const initAlertArea = () => {
  if (!document.getElementById(`mcm-alert-area`) && !hasAlertArea) {
    const area = document.createElement("div");
    area.id = `mcm-alert-area`;

    hasAlertArea = true;
    document.body.append(area);
  }
};

// 순서 찾기
const searchSequence = (target: HTMLElement) => {
  let sequence = 0;

  if (target.classList) {
    // 아이디 값으로 삭제된 alert의 순서 가져오기
    const classList = Array.from(target.classList);
    classList.some((el) => {
      if (el.includes("mcm-alert-")) {
        sequence = Number(el.substring("mcm-alert-".length));
      }
    });
  }
  return sequence;
};

// alert 띄우기
const openAlert = (props: AlertPropsType) => {
  if (!hasAlertArea) initAlertArea(); // 초기 셋팅 확인하기

  const { closeDelayTime, id } = props;

  if (id) {
    // 해당 아이디 값으로 이미 실행되고 있는 alert이 있는지 검증
    const target = document.getElementById(id);
    // 중복된 id 값이 있다면 실행하지 않는다.
    if (target) return;
  }
  const _div = document.createElement("div");

  // 현재 실행되는 alert의 순서도 구하기
  const sequence = (openList.length - 1 < 0 ? 0 : openList.length - 1) + 1;
  _div.className = `mcm-alert mcm-alert-${sequence} open-alert`;

  // 삭제 타이머 이벤트 저장
  if (closeDelayTime !== "infinite")
    openList[sequence] = setTimeout(() => {
      closeAlert(sequence);
    }, closeDelayTime || 3000);
  else openList[sequence] = null;

  // 설정된 alert 추가하기
  const area = document.getElementById(`mcm-alert-area`);
  area.append(_div);

  // alert 컴포넌트 렌더
  createRoot(_div).render(
    <_Alert
      {...props}
      searchSequence={searchSequence}
      closeAlert={closeAlert}
    />
  );
};

// alert 삭제하기
const closeAlert = (props: number | { id?: string; className?: string }) => {
  // alert 순서 또는 id 값을 통해 현재 alert 제거
  let target: null | HTMLDivElement | HTMLElement = null;
  let sequence = null;

  // 알럿 최종 종료하기
  const closeCompleteAlert = ({
    target,
    sequence,
  }: {
    target: HTMLElement;
    sequence: number;
  }) => {
    if (target && sequence) {
      target.classList.add("close-alert");

      window.setTimeout(() => {
        target.remove();
      }, 340);
      // 삭제 후 비워두기
      clearTimeout(openList[sequence]);
      openList[sequence] = null;
    }
  };

  if (typeof props === "number") {
    // 순서가 전달된 경우
    target = document.querySelector(`.mcm-alert-${props}`);
    closeCompleteAlert({ target, sequence: props });
  } else if (typeof props === "object") {
    // 해당 HTML, 순서 찾아오기
    const getTargetAndSequence = (target: HTMLElement) => {
      let sequence = 0;
      if (target && target?.parentElement) {
        target = target.parentElement;
        sequence = searchSequence(target);
      }
      return { target, sequence };
    };

    if (props.id) {
      // 아이디 값이 전달된 경우
      target = document.querySelector(`#${props.id}`);
      if (target && target?.parentElement) {
        closeCompleteAlert({ ...getTargetAndSequence(target) });
      }
    } else if (props.className) {
      // 클래스 값이 전달된 경우
      Array.from(document.querySelectorAll(`.${props.className}`)).forEach(
        (el) => {
          closeCompleteAlert({ ...getTargetAndSequence(el as HTMLElement) });
        }
      );
    }
  }
};

// alert 전체 초기화
const clearAlert = () => {
  if (!hasAlertArea) return; // 초기 셋팅이 되어 있지 않다면
  const hasAlert = document.getElementsByClassName(alertClassList.wrapper);
  if (!hasAlert.length) return; // 현재 실행중인 알럿이 하나도 없다면

  // 모든 닫기 타이머 이벤트 중지하기
  openList.forEach((el) => {
    if (el) clearTimeout(el);
  });

  // 전체 틀 삭제하기
  if (document.getElementById("mcm-alert-area")) {
    document.getElementById("mcm-alert-area").remove();
  }
  hasAlertArea = false;
  openList = [];
};

export { openAlert, closeAlert, clearAlert };
