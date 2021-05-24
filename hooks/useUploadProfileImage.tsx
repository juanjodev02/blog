import { useState } from 'react'
import { User } from '.prisma/client'

type Response = {
  handleUpload: (e: any) => Promise<void>,
  loading: boolean,
  error: string
}

export const useUploadProfileImage = (user: User): Response => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    setLoading(true)
    const file = e.target.files[0]
    const fileExtension = file.name.split('.')[1] || ''
    const newName = `${user.username}.${fileExtension}`
    const renamedFile = new File([file], newName)
    const data = new FormData()
    data.append('file', renamedFile)
    data.append('name', newName)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data
    })
    const jsonData = await res.json()
    if (!jsonData) setError('Algo ha salido mal, inténtalo de nuevo')
    setLoading(false)
  }
  return {
    handleUpload,
    loading,
    error
  }
}
