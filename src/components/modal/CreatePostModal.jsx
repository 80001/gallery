import React from 'react'
import Button from '../Button'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { setCreatePostModal, setPhoto } from '../../store/modals/modals.action'
import CreatePostForm from '../Forms/CreatePost'
import { useNavigate } from 'react-router-dom'

const CreatePostModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setCreatePostModal(false))
    dispatch(setPhoto(null))
    //window.history.replaceState(null, '', x)
    navigate(-1)
  }




  return (
    <div className='bg-modal' onClick={closeModal}>
      <div className="modal-form modal-form-post" onClick={e => e.stopPropagation()}>
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModal}>Close</Button>
        <CreatePostForm />
      </div>
    </div>
  )
}

export default CreatePostModal