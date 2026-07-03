import React from 'react'

export default function ValidateMessage({field}) {
  return  <>
     {field && <p className="text-red-500 text-xs mt-1">{field?.message}</p>}
  </>
}
