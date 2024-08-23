import './App.css'
import { config } from './data/config';
import { baseArea } from './data/base';

const generations = Object.keys(config);
const areaList = Object.keys(baseArea);

function App() {
  console.log(generations);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
      <h3>기본 청소구역</h3>
      {areaList.map(area => {
        return <div key={area} style={{paddingBottom: '8px'}}>
          {area}: {baseArea[area].assign.join(',')}
        </div>
      })}

      <h3>오늘의 청소구역 배정</h3>
    </div>
  )
}

export default App
