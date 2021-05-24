import { useState } from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'

const MdeEditor = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <ReactMde
        value={value}
        onChange={setValue}
        disablePreview={true}
      />
    </>
  )
}

export default MdeEditor
