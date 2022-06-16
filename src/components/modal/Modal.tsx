import React, {FC} from 'react';
import css from './Modal.module.css'

interface ModalProps {
    children: any
    visible: boolean
    setVisible: any
}

const Modal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [css.modal]
    if (visible)
        rootClasses.push(css.active)

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={(e) => {
                e.stopPropagation()
                setVisible(false)}
            }
        >
            <div className={css.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;