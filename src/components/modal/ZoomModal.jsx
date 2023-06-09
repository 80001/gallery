import React, { useState } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loading'
import { closeModal, openModal } from '../../store/modals/modals.action'
import { selectSearchMap } from '../../store/search/search.selector'
import { Link } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

const ZoomModal = ({ params }) => {
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState(params)
  const photoMap = useSelector(selectSearchMap)
  const [findPhoto, setFindPhoto] = useState(null)
  const [isLoad, setIsLoad] = useState(true)

  const { urls, id, user, description, alt_description, links } = photo ?? {}
  const closeModals = () => {
    dispatch(closeModal('zoom'))
    document.body.style.overflow = '';
    //window.history.back()
  }
  const closeModalsBg = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal('zoom'))
      document.body.style.overflow = ''
    }
  }
  const openPostModal = () => {
    dispatch(openModal('create', photo.urls.full))
    //window.history.pushState(null, '', `create_post/${id}`)
  }
  const handleSwipe = useSwipeable({
    onSwipedLeft: () => prewImage(),
    onSwipedRight: () => nextImage()
  })
  const nextImage = (e) => {
    e.stopPropagation()
    if (findPhoto === photoMap.length - 1) {
      setPhoto(photoMap[0])
      setFindPhoto(0)
    } else {
      const nextPhoto = photoMap[findPhoto + 1]
      if (nextPhoto) {
        setPhoto(photoMap[findPhoto + 1])
        setFindPhoto(findPhoto + 1)
      }
    }
  }
  const prewImage = (e) => {
    e.stopPropagation()
    if (findPhoto === 0) {
      setPhoto(photoMap[photoMap.length - 1])
      setFindPhoto(photoMap.length - 1)
    } else {
      const prewPhoto = photoMap[findPhoto - 1]
      if (prewPhoto) {
        setPhoto(photoMap[findPhoto - 1])
        setFindPhoto(findPhoto - 1)
      }
    }
  }
  const handleLoadImage = () => {
    setIsLoad(false)
  }
  return (
    <div className='bg-modal' {...handleSwipe}
      onClick={closeModalsBg}>
      <div className="modal" >
        {isLoad && <Loader />}
        <div className="modal-zoom" >
          <span className='modal-zoom__prew-image click' placeholder='previous' onClick={prewImage} disabled>
            <svg width="32" height="32"
              viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <desc lang="en-US">Chevron left</desc>
              <path d="M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z">
              </path>
            </svg>
          </span>
          <img
            onClick={closeModals}
            onLoad={handleLoadImage}
            src={urls?.full}
            alt="img"
            title='CLICK ON IMAGE TO ZOOM OUT'
            className="modal-zoom__img" />
          <span className='modal-zoom__next-image click' placeholder='next' onClick={nextImage}>
            <svg width="32" height="32"
              viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <desc lang="en-US">Chevron right</desc>
              <path d="M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z">
              </path>
            </svg>
          </span>
          <div className="modal-zoom__btns modal-zoom__post"
            to={`create_post/${id}`}
            onClick={openPostModal}>
            <p>Create Post</p>
          </div>
          <Link
            to={links?.download}
            className="modal-zoom__btns modal-zoom__download"
            title={'dwnld'}
          >Down⌊✓⌋load</Link>
          <Link
            to={`https://unsplash.com/@${user?.username}`}
            target='_blank'
            title="Author"
            rel="noreferrer"
            className="modal-zoom__btns modal-zoom__credit">{user?.username}
          </Link>
          <span className='modal-zoom__description'>
            {description || alt_description || 'Description`s gone!'}
          </span>
        </div>
      </div >
    </div >
  )
}


export default ZoomModal