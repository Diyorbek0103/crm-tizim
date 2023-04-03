import React from 'react'

const AddDavomat = () => {
  return (
    <div className='add-davomat'>
          <div className="add-davomat-title">
            Davomat 
          </div>
          <form className="add-davomat-form">
             <label htmlFor="name">
               <div className="form-title">
                Talaba FIO
               </div>
               <select name="name" id="name">
                 <option value="">Talabani tanlang</option>
                 <option value="">Haitov Salohiddin</option>
                 <option value="">Asliddinov Behzod</option>
               </select>
             </label>
             <label htmlFor="kurs">
               <div className="form-title">
                Kursni tanlang
               </div>
               <select name="kurs" id="kurs">
                 <option value="">Kursni tanlang</option>
                 <option value="">English </option>
                 <option value=""> Matematika</option>
               </select>
             </label>
             <label htmlFor="sinf">
               <div className="form-title">
                Sinfni tanlang
               </div>
               <select name="sinf" id="sinf">
                 <option value="">Sinfni tanlang</option>
                 <option value="">2022 </option>
                 <option value=""> 2023</option>
               </select>
             </label>
             <div   className="davomat-choose">
                <label className='keldi' htmlFor="keldi">
                  <input type="radio" checked name='keldi' id='keldi'  /> Kelgan
                </label>
                <label className='kelmadi' htmlFor="kelmagan"> 
                  <input type="radio" name='keldi' id='kelmagan' />
                  Kelmagan
                </label>
             </div>
             <label htmlFor="sabab">
                <div className="form-title">
                 Sabab (ixtiyoriy)
                </div>
                <textarea name="sabab" id="sabab"  ></textarea>
             </label>
             <button className='add-davomat-btn'>
              Malumotlarni saqlash
             </button>
          </form>
 
    </div>

  )
}

export default AddDavomat