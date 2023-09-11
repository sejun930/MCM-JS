import { AlertPropsType } from "./components/alert.types";
import { openAlert, closeAlert, clearAlert } from "./func";

const Alert: {
  openAlert: (props: AlertPropsType) => void;
  closeAlert: (props: number | { id?: string; className?: string }) => void;
  clearAlert: () => void;
} = {
  openAlert,
  closeAlert,
  clearAlert,
};

export default Alert;
