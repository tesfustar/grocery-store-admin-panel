import React from 'react'
import NewProductRequestForm from '../../../forms/branchAdminForm/NewProductRequestForm'
import BreedCrumb from '../../../utils/BreedCrumb'

const NewRequest = () => {
  return (
    <div>
        <BreedCrumb />
        <NewProductRequestForm />
    </div>
  )
}

export default NewRequest