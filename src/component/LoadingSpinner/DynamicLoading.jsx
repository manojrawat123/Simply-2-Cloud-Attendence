import React from 'react'
import Loading from './LoadingSpinner'

const DynamicLoading = () => {
  return (
            <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
                <Loading />
            </div>
  )
}

export default DynamicLoading
