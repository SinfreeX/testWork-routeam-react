import React, {FC, useMemo, useState} from 'react';
import {IProject} from "../../models/IGitApi";
import css from './Card.module.css'
import Modal from "../modal/Modal";
import Comment from "../comment/Comment";

interface cardProps {
    project: IProject
    setCurrentCard: any
    setTargetCard: any
}

const Card: FC<cardProps> = ({project, setCurrentCard, setTargetCard}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)


    /////////////////////////////////////////////////////////////
    /// тут что то костылей наворотил, знаю можно решить проще но не пойму как...
    /// после всех проверок добавил элемент в локал сторедж, но как реакту сообщить об этом?
    /// В теории можно класть комменты в стор и дублировать в локал сторедж, а доставать
    /// в момент фетчинга результатов поиска с сервера, но это расход памяти, короче туплю
    ////////////////////////////////////////////////////////////
    const [update, setUpdate] = useState<number>(1)

    const comments = useMemo(() => {
        if (update){}
        const data = JSON.parse(localStorage.getItem(String(project.id)) as string)
        if (Array.isArray(data)) return data
        return []
    }, [project.id, update])

    const commentsUpdate = () => {
        setUpdate((prev) => prev+1)
    }
    /////////////////////////////////////////////////////////////



    const dragEndHandle = (e: any) => {
        if (e.target.className === css.card)
            e.target.style.border = '1px solid #A2A3A4'
    }

    const dragOverHandle = (e: any) => {
        e.preventDefault()
        if (e.target.className === css.card)
            e.target.style.border = '1px solid red'
    }


    const dragStartHandle = (e: any, card: IProject) => {
        setCurrentCard(card)
    }

    const dropHandle = (e: any, card: IProject) => {
        e.preventDefault()
        setTargetCard(card)
        if (e.target.className === css.card)
            e.target.style.border = '1px solid #A2A3A4'
    }

    const onClickHand = () => {
        window.open(project.html_url)
    }

    return (
        <div
            id={String(project.id)}
            draggable={true}
            onDragStart={(e) => dragStartHandle(e, project)}
            onDragLeave={(e) => dragEndHandle(e)}
            onDragEnd={(e) => dragEndHandle(e)}
            onDragOver={(e) => dragOverHandle(e)}
            onDrop={(e) => dropHandle(e, project)}
            className={css.card}
            onClick={onClickHand}
            style={{'cursor': 'pointer'}}
        >
            <h2>{project.name}</h2>
            <div className={css.author}>
                <img src={project.owner.avatar_url} alt="avatar"/>
                <p>{project.owner.login}</p>
            </div>
            <div className={css.metrics}>
                <div>
                    <span className="material-icons">star</span>
                    <p>{project.watchers}</p>
                </div>
                <div>
                    <span className="material-icons">visibility</span>
                    <p>{project.stargazers_count}</p>
                </div>
                <div onClick={ (e) => {e.stopPropagation() }} className={css.commentCount}>
                    <span className="material-icons">comment</span>
                    <a href={'#'} onClick={() => comments.length > 0 ? setModalVisible(true) : null}>{comments.length}</a>
                    <span className={css.tooltip}>
                        {comments.length === 0 ? null : comments.map((comment) => (
                            <p key={comment}>{comment}</p>
                        ))}
                    </span>
                </div>
            </div>
            <Comment id={project.id} updateCounter={commentsUpdate}/>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                {comments.length === 0 ? null : comments.map((comment) => (
                    <p key={comment}>{comment}</p>
                ))}
            </Modal>
        </div>
    );
};

export default Card;