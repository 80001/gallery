

import { Link } from "react-router-dom"
import ZoomModal from "../../components/modal/ZoomModal"
import CreatePost from "../../components/modal/CreatePost"
import { useDispatch, useSelector } from "react-redux"
import { selectOpenModal, selectOpenPostModal } from "../../store/gallery/gallery.selector"
import { setOpenModal, setOpenPostModal } from "../../store/gallery/gallery.action"

const PhotoComp = ({ photo }) => {
    const { user, urls, width, height, links } = photo
    const dispatch = useDispatch()
    const dwnld = `Size: ${width}x${height}`
    const isModalOpen = useSelector(selectOpenModal)
    const isPostModalOpen = useSelector(selectOpenPostModal)
    const setModalOpen = (bool) => dispatch(setOpenModal(bool))
    const setPostModalOpen = (bool) => dispatch(setOpenPostModal(bool))

    const openModal = () => {
        setModalOpen(true)
        document.body.style.overflow = 'hidden'
        window.history.pushState(null, '', `/image/${photo.id}`)
    };
    const openPostModal = () => {
        setPostModalOpen(true)
        document.body.style.overflow = 'hidden';
    };

    return (
        <li className={`gallery__item`}>
            <div className="gallery__item-view">
                {isModalOpen && (
                    <ZoomModal urls={urls.regular}
                        setPostModal={setPostModalOpen}
                        links={links.download}
                        setModal={setModalOpen}
                        id={photo.id}
                        username={user.username}
                        user={user.name}
                        dwnld={dwnld}
                        description={photo.description || photo.alt_description} />
                )}
                {isPostModalOpen && (
                    <CreatePost url={urls.regular} />
                )}
                <img
                    src={urls.regular}
                    onClick={openModal}
                    alt="img"
                    className="gallery__img"
                    title="CLICK ON IMAGE TO ZOOM IN"
                />
                <Link className="gallery__btns gallery__post"
                    to={`create_post/${photo.id}`}
                    onClick={openPostModal}>
                    <p>Create Post</p>
                </Link>
                <a
                    href={links.download}
                    className="gallery__btns gallery__download"
                    title={dwnld}
                >Down⌊✓⌋load</a>
                <a
                    href={`https://unsplash.com/@${user.username}`}
                    target='_blank'
                    title="Author"
                    rel="noreferrer"
                    className="gallery__btns gallery__credit">{user.name}
                </a>
            </div>
        </li>
    )
}
export default PhotoComp
