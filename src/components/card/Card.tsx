import React, {FC} from 'react';
import {IProjects} from "../models/IGitApi";

interface cardProps {
    project: IProjects
}

const Card: FC<cardProps> = ({project}) => {
    return (
        <div>
            <h2>{project.name}</h2>
            <div>
                <img src={project.owner.avatar_url} alt="icon"/>
                <p>{project.owner.login}</p>
            </div>
            <div>
                <p>{project.watchers}</p>
                <p>{project.stargazers_count}</p>
            </div>
            <div>
                <input type="text" placeholder={'Комментарий к проекту'}/>
                <button>go</button>
            </div>
        </div>
    );
};

export default Card;