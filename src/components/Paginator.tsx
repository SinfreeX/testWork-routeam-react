import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {projectSlice} from '../store/reducers/ProjectSlice'
import {searchProjects} from "../store/reducers/ActionCreators";

const Paginator = () => {
    const {projectCount, countPerPage, currentPage} = useAppSelector(state => state.projectReducer)
    const dispatch = useAppDispatch()
    const {setCountItems, setCurrentPage} = projectSlice.actions

    const lastPage = Math.round(projectCount / countPerPage)

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCountItems(Number(e.target.value)))
        dispatch(searchProjects())
    }

    const pageSelect =  {
        prev: () => {
            if (currentPage !== 1) {
                dispatch(setCurrentPage(currentPage - 1))
                dispatch(searchProjects())
            }
        },
        select: (page: number) => {
            if (currentPage !== page) {
                dispatch(setCurrentPage(page))
                dispatch(searchProjects())
            }
        },
        next: () => {
            if (currentPage < lastPage) {
                dispatch(setCurrentPage(currentPage + 1))
                dispatch(searchProjects())
            }
        }
    }


    return (
        <>
            <div className={'perCount'}>
                <select name="count" defaultValue={countPerPage} onChange={onChangeHandle}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className={'navPages'}>
                <button onClick={() => pageSelect.prev()}>
                    <span className={'material-icons'}>arrow_back_ios</span>
                </button>

                <button
                    onClick={() => pageSelect.select(1)}
                    { ...(currentPage === 1 ? {className: 'active'} : null) }
                >1</button>

                {currentPage-1 <= 1 && currentPage !== lastPage ? null
                    : <div className={'space'} > ... </div>
                }

                {lastPage < currentPage || currentPage === lastPage ? null :
                    <button
                        onClick={() => pageSelect.select(currentPage+1)}
                        { ...( currentPage !== 1 ? {className: 'active'} : null )}
                    >
                        { currentPage === 1 ? 2 : currentPage}
                    </button>
                }


                {lastPage < currentPage || currentPage === lastPage? null
                    : <div className={'space'}> ... </div>
                }

                {lastPage < currentPage ? null :
                    <button
                        onClick={() => pageSelect.select(lastPage)}
                        { ...( currentPage === lastPage ? {className: 'active'} : null )}
                    >{lastPage}</button>
                }

                <button
                    onClick={() => pageSelect.next()}
                    disabled={(lastPage <= currentPage)}
                >
                    <span className={'material-icons'}>arrow_forward_ios</span>
                </button>
            </div>
            <div></div>
        </>
    );
};

export default Paginator;