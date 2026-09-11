import { Badge } from '../ui/Badge';
import type { Status } from '../../models/types';
import { statusLabel } from '../../utils/labels';

const TONE: Record<Status, { bg: string; fg: string }> = {
  todo: { bg: 'var(--surface-badge)', fg: 'var(--text-sub)' },
  doing: { bg: 'var(--mustard-badge-bg)', fg: 'var(--mustard-badge-fg)' },
  done: { bg: 'var(--green-tint)', fg: 'var(--green)' },
};

export function TaskStatusBadge({ status }: { status: Status }) {
  const tone = TONE[status];
  return (
    <Badge background={tone.bg} color={tone.fg}>
      {statusLabel(status)}
    </Badge>
  );
}
