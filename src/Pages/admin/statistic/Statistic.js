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

const Statistic = () => {
  
   const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' ,
        },
        title: {
          display: true,
          text: 'Moliya bo`limi statistikasi',
        },
      },
   }
   
   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

   const data = {
    labels,
    datasets: [
      {
        label: 'Kirim',
        data:  [6,7,3,15,3,6,9],
        backgroundColor: '#1fc035',
      },
      {
        label: 'Chiqim',
        data: [3,6,9,3,1,4,8],
        backgroundColor: '#ED5E5E',
      },
     
    ],
   }


  return (
    <div className='home'>
      <StatisticNav title={'moliya'} />
      <div className="statistic-moliya">
        <div className="statistic-moliya-left"></div>
        <div className="statistic-moliya-right">
           <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Statistic