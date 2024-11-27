import type { Person } from '@/types/Person';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useDroppable } from '@dnd-kit/core';
import DraggablePersonBadge from './DraggablePersonBadge';

function DroppableAreaCard({ title, people }: { title: string; people: Person[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  const filterdPeople = people.filter((person) => person.assign === title);
  const sortedPeople = filterdPeople.sort((p1, p2) => {
    if (p1.generation !== p2.generation) {
      return p1.generation - p2.generation;
    }

    if (p1.name < p2.name) {
      return -1;
    }
    return 1;
  });

  return (
    <div ref={setNodeRef} className="h-fit w-1/3">
      <Card className={`${isOver ? 'box-border border border-black' : ''} w-full`}>
        <CardHeader>
          <CardTitle className="text-nowrap text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedPeople.map((person) => (
            <DraggablePersonBadge key={`${title} ${person.generation} ${person.name}`} person={person} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default DroppableAreaCard;
