import type { Status } from '../../models/types';
import { statusMark } from '../../utils/labels';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  status: Status;
  onToggle: () => void;
  size?: number;
  title?: string;
}

export function Checkbox({ status, onToggle, size = 15, title }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={title}
      className={styles.mark}
      style={{ fontSize: size }}
    >
      {statusMark(status)}
    </button>
  );
}
