import React from "react";

import { render } from "@testing-library/react";
import Modal from "../../../../../src/components/modules/modal/modal.container";

export default describe("Main Home Page", () => {
  // 스냅샷
  test("Modal Page - Snapshot", () => {
    const { container } = render(
      <Modal show={true} onCloseModal={() => {}} closeMent="모달 닫기" />
    );
    expect(container).toMatchSnapshot();
  });
});
