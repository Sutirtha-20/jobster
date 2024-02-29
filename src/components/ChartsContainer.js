import React, {useState} from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';
import BarChartComp from './BarChartComp';
import AreaChartComp from './AreaChartComp';

function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);   //local state handling what chart to show here
  const { monthlyApplications } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComp data={monthlyApplications} /> : <AreaChartComp data={monthlyApplications} />}
    </Wrapper>
  )
}

export default ChartsContainer