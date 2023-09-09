import { AlertPropsType } from "./components/alert.types";
import { openAlert, removeAlert, clearAlert } from "./func";

const Alert: {
  openAlert: (props: AlertPropsType) => void;
  removeAlert: (props: number | { id: string }) => void;
  clearAlert: () => void;
} = {
  openAlert,
  removeAlert,
  clearAlert,
};

export default Alert;
