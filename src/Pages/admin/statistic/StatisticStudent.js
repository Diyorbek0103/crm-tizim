import React from 'react'
import '../../../styles/admin/statistic/statistic.scss'
import StatisticNav from '../../../Components/Admin/statistic/StatisticNav'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticStudent = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Talabalar bo`limi statistikasi',
      },
    },
 }
 
 const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Kelgan Talabalar',
      data:  [603,706,306,150,363,663,987],
      backgroundColor: '#6691E7',
    },
    {
      label: 'Ketgan Talabalar',
      data: [30,60,90,30,16,40,80],
      backgroundColor: '#ccc',
    },
   
  ],
 }


  return (
    <div className='home'>
      <StatisticNav title={'talabalar'} />

      <div className="statistic-moliya">
        <div className="statistic-moliya-left"></div>
        <div className="statistic-moliya-right">
           <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default StatisticStudent