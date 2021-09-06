import Modal from 'react-modal'
import Loader from 'react-loader-spinner'
import styles from './styles.module.scss'

interface LoadingModalProps{
  isOpen: boolean
}

export function LoadingModal({ isOpen }: LoadingModalProps){
  return(
    <Modal 
      isOpen={isOpen}
      className={styles.content}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <h1>Inicializando ...</h1>
      <Loader 
        type="Circles"
        color="#21ac28"
        height={100}
        width={100}
        timeout={3000} 
      />
    </Modal>
  )
}