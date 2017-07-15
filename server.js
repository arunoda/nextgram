const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: 'np-dicom-images',
    // headers: {'Access-Control-Allow-Origin': '*'}
    signatureVersion: 'v4',
    region: 'us-east-2'
  }))
  server.get('/p/:id', (req, res) => {
    const query = { id: req.params.id }
    return app.render(req, res, '/photo', query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
