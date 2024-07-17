import React from 'react'
import SelectBatch from '../../../../../../ComonComponent/SelectBatch/SelectBatch'
import { useNavigate } from 'react-router-dom'

const SelectBatchGet = () => {
    
    const navigate = useNavigate();

  return (
    <div>
      <SelectBatch route={"student-attendence-display"}/>
    </div>
  )
}

export default SelectBatchGet
