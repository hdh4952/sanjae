import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function DroppableCard({ title, children }: { title: string; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'draggable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`${isOver ? 'box-border w-fit border border-black' : 'w-fit'}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default DroppableCard;
