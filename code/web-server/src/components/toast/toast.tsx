import { Alert, Slide, Snackbar } from "@mui/material";

type ToastProps = {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
  onClose: () => void;
};

export default function Toast({
  message,
  severity,
  open,
  onClose,
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
