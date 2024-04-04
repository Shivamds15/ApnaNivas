import React, {useEffect, useRef} from 'react'
import PropTypes from "prop-types"
import '../../CSS/Modal.css'

const Modal = ({images, onClose}) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'visible';
    };
  }, []);

  const modalRef = useRef(null);

  useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


  return (
    <div className='modal-backdrop'>
        <div className='modal-content' ref={modalRef}>
            <button className='close-button' onClick={onClose}>
                <span>&times;</span>
            </button>
            <div className='modal-image-container'>
                {
                    images.map((image, index) => (
                        <img key={index} src={image.url} alt={`${index+1}`} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

Modal.prototype = {
    images: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal