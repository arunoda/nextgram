import React from 'react'
import Router from 'next/router'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import { Circle } from 'react-progressbar.js'
import Modal from '../components/modal'
import 'isomorphic-fetch'

const Display = ({progress, uploadedFiles}) => (
  <div>{
    progress ? <Circle progress={progress / 100} />
    : !uploadedFiles.length ? <p>Upload Some Files</p>
    : <p>Processing Files</p>
  }</div>)
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (!this.props.url.query.photoId) return
    if (e.keyCode === 27) {
      this.props.url.back()
    }
  }

  dismissModal () {
    Router.push('/', '/', { shallow: true })
  }

  showPhoto (e, id) {
    e.preventDefault()
    Router.push(`/?photoId=${id}`, `/p/${id}`, { shallow: true })
  }

  render () {
    // const { url, photos } = this.props
    return (
      <DropzoneS3Uploader s3Url='http://np-dicom-images.s3-us-east-2.amazonaws.com'>
        <Display />
        {/*  <div className='list'>
          {
          url.query.photoId &&
            <Modal
              id={url.query.photoId}
              onDismiss={() => this.dismissModal()}
            />
        }
          {
          photos.map((id) => (
            <div key={id} className='photo'>
              <a
                className='photoLink'
                href={`/photo?id=${id}`}
                onClick={(e) => this.showPhoto(e, id)}
              >
                <img src={`https://thumbs.gfycat.com/${id}-thumb360.jpg`} />
              </a>
            </div>
          ))
        }
          <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 120px;
            line-height: 120px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .photoLink img {
            width: 250px;
          }

          .photoLink:hover {
            borderColor: blue;
          }
        `}</style>
        </div>  */}
      </DropzoneS3Uploader>
    )
  }
}
