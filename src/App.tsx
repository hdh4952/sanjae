import './App.css';
import { DndContext } from '@dnd-kit/core';
import DroppableAreaCard from './components/dnd/DroppableAreaCard';
import { Person } from './types/Person';
import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [people, setPeople] = useState<Person[]>([
    { generation: 857, name: '공군1', assign: '공공실A' },
    { generation: 857, name: '공군2', assign: '공공실A' },
    { generation: 857, name: '공군3', assign: '공공실A' },
    { generation: 857, name: '공군4', assign: '공공실A' },
    { generation: 857, name: '공군5', assign: '공공실B' },
    { generation: 857, name: '공군6', assign: '공공실B' },
    { generation: 857, name: '공군7', assign: '공공실B' },
    { generation: 857, name: '공군8', assign: '공공실B' },
    { generation: 858, name: '공군1', assign: '생활관주변' },
    { generation: 858, name: '공군2', assign: '생활관주변' },
    { generation: 858, name: '공군3', assign: '생활관주변' },
    { generation: 858, name: '공군4', assign: '생활관주변' },
    { generation: 858, name: '공군5', assign: '복도' },
    { generation: 858, name: '공군6', assign: '복도' },
    { generation: 858, name: '공군7', assign: '복도' },
    { generation: 858, name: '공군8', assign: '복도' },
  ]);

  const changeAssign = (person: Person, toArea: string): void => {
    const filtered = people.filter((p) => p.generation !== person.generation || p.name !== person.name);
    setPeople(() => [...filtered, { ...person, assign: toArea }]);
  };

  const handleDragEnd = (event) => {
    if (event.over) {
      const toArea: string = event.over.id;
      const person: Person = event.active.data.current;
      changeAssign(person, toArea);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-full w-full flex-wrap content-start">
          <DroppableAreaCard title="내무실" people={people} />
          <DroppableAreaCard title="공공실A" people={people} />
          <DroppableAreaCard title="공공실B" people={people} />
          <DroppableAreaCard title="생활관주변" people={people} />
          <DroppableAreaCard title="복도" people={people} />
          <DroppableAreaCard title="2층화장실" people={people} />
          <DroppableAreaCard title="1층화장실" people={people} />
          <DroppableAreaCard title="세면장" people={people} />
          <DroppableAreaCard title="휴가or근무" people={people} />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
