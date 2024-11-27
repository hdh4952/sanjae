import { Person } from '@/types/Person';
import { useDraggable } from '@dnd-kit/core';
import { Badge } from '../ui/badge';

function DraggablePersonBadge({ person }: { person: Person }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${person.generation} ${person.name}`,
    data: person,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Badge className="text-nowrap">
        {person.generation} {person.name}
      </Badge>
    </div>
  );
}

export default DraggablePersonBadge;
