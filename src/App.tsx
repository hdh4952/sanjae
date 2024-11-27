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
    { generation: 853, name: '강민재', assign: '내무실' },
    { generation: 853, name: '박지원', assign: '내무실' },
    { generation: 853, name: '박민우', assign: '내무실' },
    { generation: 853, name: '이동근', assign: '내무실' },
    { generation: 854, name: '강민석', assign: '공공실A' },
    { generation: 854, name: '김한결', assign: '공공실B' },
    { generation: 854, name: '유예찬', assign: '생활관주변' },
    { generation: 855, name: '박준영', assign: '복도' },
    { generation: 855, name: '심현성', assign: '공공실B' },
    { generation: 856, name: '김재헌', assign: '복도' },
    { generation: 856, name: '주현욱', assign: '복도' },
    { generation: 856, name: '최민제', assign: '복도' },
    { generation: 856, name: '홍승환', assign: '1층화장실' },
    { generation: 857, name: '이훈영', assign: '1층화장실' },
    { generation: 857, name: '한대희', assign: '1층화장실' },
    { generation: 858, name: '김지환', assign: '1층화장실' },
    { generation: 858, name: '이강현', assign: '2층화장실' },
    { generation: 858, name: '이상준', assign: '공공실A' },
    { generation: 858, name: '최진서', assign: '공공실B' },
    { generation: 859, name: '김서진', assign: '2층화장실' },
    { generation: 859, name: '박병언', assign: '2층화장실' },
    { generation: 859, name: '박정욱', assign: '2층화장실' },
    { generation: 860, name: '김규민', assign: '세면장' },
    { generation: 860, name: '박호현', assign: '세면장' },
    { generation: 861, name: '이성원', assign: '세면장' },
    { generation: 861, name: '한승재', assign: '생활관주변' },
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
