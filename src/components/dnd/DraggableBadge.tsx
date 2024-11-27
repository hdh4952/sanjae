import { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Badge } from '../ui/badge';

function DraggableBadge({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Badge>{children}</Badge>
    </div>
  );
}

export default DraggableBadge;
