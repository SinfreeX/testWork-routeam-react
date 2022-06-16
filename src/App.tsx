import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./components/card/Card";
import Search from "./components/Search";
import Paginator from "./components/Paginator";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {IProject} from "./models/IGitApi";
import {projectSlice} from "./store/reducers/ProjectSlice";

function App() {
    const dispatch = useAppDispatch()
    const {projects, isLoading, error, query} = useAppSelector(state => state.projectReducer)
    const {setSortOrder} = projectSlice.actions
    const sortableProjects = [...projects] // костыль т.к. реакт не дает сортировать массив сразу из стейта

    const [currentCard, setCurrentCard] = useState(null)
    const [targetCard, setTargetCard] = useState(null)



    useEffect(() => {
        if (currentCard && targetCard){
            dispatch(setSortOrder({target: targetCard, current: currentCard}))
            setTargetCard(null)
            setCurrentCard(null)
        }
    }, [currentCard, dispatch, setSortOrder, targetCard])

    const sortCard = (a: IProject, b: IProject) => a.order < b.order ? 1 : -1


    return (
    <div className="App">
        <div className={'container'}>
            <main>
                <div className={'search col-12 text-center'}>
                    <div>
                        <Search/>
                    </div>
                </div>
                <div className={'row content'}>
                        {!query ? <h2>Давай попробуем что ни будь найти</h2> :
                            isLoading ? <h2>Идет загрузка...</h2> :
                                error ? <h2>{error}</h2> :
                                    !projects.length ? <h2>Похоже ничего не нашлось :(</h2> :
                                        <>
                                            {sortableProjects.sort(sortCard).map((project: IProject) => (
                                                <div key={String(project.id)} className={'col-xxl-4 col-xl-6 col-xs-12'}>
                                                    <Card project={project} setCurrentCard={setCurrentCard} setTargetCard={setTargetCard}/>
                                                </div>

                                            ))}
                                            <div className={'row'}>
                                                <div className={'col-12 paginator'}>
                                                    <Paginator/>
                                                </div>
                                            </div>
                                        </>
                        }
                </div>
            </main>
        </div>
    </div>
  );
}

export default App;
