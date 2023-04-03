import React from 'react'
import { Link } from 'react-router-dom'

const StatisticNav = ({title}) => {


    if(title == 'moliya'){
        var NavLinks = [
            {
                id:1,
                title: 'Moliya',
                class: 'active',
                link: '/admin/statistic'
            },
            {
                id:2,
                title: 'Talabalar',
                class: '',
                link: '/admin/statistic/student'
            }
        ]
    } if(title == 'talabalar') {
        var NavLinks = [
            {
                id:1,
                title: 'Moliya',
                class: '',
                link: '/admin/statistic'
            },
            {
                id:2,
                title: 'Talabalar',
                class: 'active',
                link: '/admin/statistic/student'
            }
        ]
    }


  return (
    <div className='nav'>
        {NavLinks.map(item => (
            <Link to={item.link} key={item.id} className={`statistic-nav ${item.class}`} >
                {item.title}
            </Link>
        ))}
    </div>
  )
}

export default StatisticNav