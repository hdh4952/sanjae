import './App.css';
import { DndContext } from '@dnd-kit/core';
import DroppableAreaCard from './components/dnd/DroppableAreaCard';
import { Person } from './types/Person';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './components/ui/dialog';
import { DialogTrigger } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';

function App() {
  const [open, setOpen] = useState(false);
  const [generation, setGeneration] = useState('');
  const [name, setName] = useState('');

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-0">인원 추가</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>인원 추가하기</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              changeAssign({ generation: parseInt(generation), name, assign: '' }, '휴가or근무');
              setGeneration('');
              setName('');
              setOpen(false);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="generation" className="text-right">
                  기수
                </Label>
                <Input
                  id="generation"
                  value={generation}
                  className="col-span-3"
                  onChange={(e) => setGeneration(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  이름
                </Label>
                <Input id="name" value={name} className="col-span-3" onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">추가하기</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
