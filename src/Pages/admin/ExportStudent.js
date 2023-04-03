import React ,{useState,useEffect} from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import axios from 'axios'
import { Main_Url } from '../../axios'

const ExportStudent = ({ fileName}) => {

  const [excelData, setExcelData] = useState([])

  const excelDataFunctoin=()=>{
    axios.get(`${Main_Url}students`)
    .then(data=>{
       console.log(data.data);
       setExcelData(data.data) 
    })
    .catch(err=>{
       console.log(err);
    })
  }

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  const fileExtension=".xlsx"

  // const exportToExcel = async ()=>{ 

  //   const ws = XLSX.utils.json_to_sheet(excelData);
  //   const excelBuffer = XLSX.write(
  //   {
  //   Sheets: { data: ws },
  //   SheetNames: ["data"],
  //   },
  //   { bookType: "xlsx", type: "array" }
  //   );
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // }

  return (
    <div >Export</div>
  )
}

export default ExportStudent