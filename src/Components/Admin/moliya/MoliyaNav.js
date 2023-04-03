import React from 'react'
import { Link } from 'react-router-dom'

const MoliyaNav = ({active}) => {





    if(active == 'kirim'){
        var NavLinks = [
            {
                id:1,
                text:'Kirim',
                status: 'active' ,
                slug:'/admin/economic'
            },
            {
                id:3,
                text:'Chiqim',
                status: '' ,
                slug:'/admin/economic/chiqim'
            },
            {
                id:3,
                text:'Tranzaksiya',
                status: '' ,
                slug:'/admin/economic/tranzaksiya'
            }
        ]
    } if(active == 'chiqim') {
        var NavLinks = [
            {
                id:1,
                text:'Kirim',
                status: '' ,
                slug:'/admin/economic'
            },
            {
                id:3,
                text:'Chiqim',
                status: 'active' ,
                slug:'/admin/economic/chiqim'
            },
            {
                id:3,
                text:'Tranzaksiya',
                status: '' ,
                slug:'/admin/economic/tranzaksiya'
            }
        ]
    } if(active == 'tranzaksiya'){
        var NavLinks = [
            {
                id:1,
                text:'Kirim',
                status: '' ,
                slug:'/admin/economic'
            },
            {
                id:3,
                text:'Chiqim',
                status: '' ,
                slug:'/admin/economic/chiqim'
            },
            {
                id:3,
                text:'Tranzaksiya',
                status: 'active' ,
                slug:'/admin/economic/tranzaksiya'
            }
        ]
    }

  return (
    <div className='moliya-nav'>
         <div className="moliya-nav-top">Moliya bo'limi</div>
         <div className="moliya-nav-links">
            {
                NavLinks.map(item=>{
                    return(
                        <Link to={item.slug} key={item.id}  className={item.status}>
                          {item.text}
                        </Link>
                    )
                })
              }
         </div>
    </div>
  )
}

export default MoliyaNav