import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ModalPropsType } from "../../../src/components/modules/modal/modal.types";
import SB_Modal from "./Modal";

export default {
  title: "Example/modules/modal",
  component: SB_Modal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SB_Modal>;

const Template: ComponentStory<typeof SB_Modal> = (args) => (
  <SB_Modal {...args} />
);

// 기본형 모달
export const defaultModal = Template.bind({});
defaultModal.args = {
  children: <div>모달이 오픈되었습니다.</div>,
  styles: { height: "200px" },
} as ModalPropsType;

// 애니메이션 적용
export const setAnimationModal = Template.bind({});
setAnimationModal.args = {
  children: <div>애니메이션이 적용된 모달입니다.</div>,
  styles: { height: "200px" },
  showModalOpenAnimation: true,
  showBGAnimation: true,
} as ModalPropsType;

// 모바일 반응형 크기 적용
export const setResponsiveModal = Template.bind({});
setResponsiveModal.args = {
  children: <div>모바일에선 작아집니다.</div>,
  styles: { height: "200px" },
  mobileDefaultStyles: { width: "25%", height: "25%" },
  showModalOpenAnimation: true,
  showBGAnimation: true,
} as ModalPropsType;

// 닫기 라벨 추가
export const setAddCloseMent = Template.bind({});
setAddCloseMent.args = {
  children: <div>닫기 멘트를 추가할 수 있습니다.</div>,
  styles: { height: "200px" },
  closeMent: "모달 닫기",
  showModalOpenAnimation: true,
  showBGAnimation: true,
  hideCloseButton: false,
} as ModalPropsType;

// 닫기 사이즈 변경
export const resizeCloseButton = Template.bind({});
resizeCloseButton.args = {
  children: <div>닫기 버튼의 사이즈를 조정합니다.</div>,
  styles: { height: "200px" },
  closeButtonSize: 30,
  showModalOpenAnimation: true,
  showBGAnimation: true,
  hideCloseButton: false,
} as ModalPropsType;

// 닫기 버튼 감추기
export const HideCloseButton = Template.bind({});
HideCloseButton.args = {
  children: <div>닫기 버튼이 사라집니다.</div>,
  styles: { height: "200px" },
  showModalOpenAnimation: true,
  showBGAnimation: true,
  hideCloseButton: true,
} as ModalPropsType;

// 자동 닫기 끄기
export const OffAutoClose = Template.bind({});
OffAutoClose.args = {
  children: <div>외부 클릭시 자동으로 닫히지 않습니다.</div>,
  styles: { height: "200px" },
  showModalOpenAnimation: true,
  showBGAnimation: true,
  hideCloseButton: false,
  offAutoClose: true,
} as ModalPropsType;
