import React, {FC, useState} from 'react';
import css from './Comment.module.css'

interface CommentProps {
    id: number
    updateCounter: () => void
}

const Comment:FC<CommentProps> = ({id, updateCounter}) => {
    const [value, setValue] = useState<string>('')

    const addComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (value ){
            let prev = localStorage.getItem(String(id))
            if (prev) {
                prev = JSON.parse(prev)
                if (Array.isArray(prev))
                    localStorage.setItem(String(id), JSON.stringify([...prev,value]) )
            }else {
                localStorage.setItem(String(id), JSON.stringify([value]))
            }
            setValue('')
            updateCounter()
        }
    }

    return (
        <div className={css.feedBack} onClick={ (e) => e.stopPropagation() } >
            <form onSubmit={addComment}>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type="text"
                    placeholder={'Комментарий к проекту'}
                />
                <button type={'submit'}><span className={'material-icons'}>create</span></button>
            </form>
        </div>
    );
};

export default Comment;