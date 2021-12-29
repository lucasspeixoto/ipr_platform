type Severity = 'success' | 'warning' | 'info' | 'error';

export interface SnackBarMessageProps {
  message: string;
  severity: Severity;
  open: boolean;
  onClose?: any;
}
