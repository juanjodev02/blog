import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path'
import formidable from 'formidable'
import { getViewer } from '../../lib/api'

const uploadPath = join(process.cwd(), 'public/assets/users/')

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  const user = await getViewer(req)
  if (!user) {
    res.end(false)
  } else {
    const form = new formidable.IncomingForm()
    form.on('fileBegin', function (name, file) {
      file.path = join(uploadPath, file.name)
    })
    form.parse(req, (err, fields, files) => {
      if (err) res.send(false)
      res.send(true)
    })
  }
}
