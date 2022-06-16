import React, {ChangeEvent, MouseEventHandler, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {projectSlice} from '../store/reducers/ProjectSlice'

const Paginator = () => {
    const {projectCount, countPerPage, currentPage} = useAppSelector(state => state.projectReducer)
    const dispatch = useAppDispatch()
    const {setCountItems, setCurrentPage} = projectSlice.actions

    const lastPage = Math.round(projectCount / countPerPage)

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCountItems(Number(e.target.value)))
    }

    const pageSelect =  {
        prev: () => {
            if (currentPage !== 1) dispatch(setCurrentPage(currentPage - 1))
        },
        select: (page: number) => {
            if (currentPage !== page) dispatch(setCurrentPage(page))
        },
        next: () => {
            if (currentPage < lastPage) dispatch(setCurrentPage(currentPage + 1))
        }
    }


    return (
        <>
            <div>
                <select name="count" defaultValue={countPerPage} onChange={onChangeHandle}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div>
                <button onClick={() => pageSelect.prev()}>{'<'}</button>

                <button
                    onClick={() => pageSelect.select(1)}
                    { ...(currentPage === 1 ? {className: 'active'} : null) }
                >1</button>

                {currentPage-1 <= 1 && currentPage !== lastPage ? null : <div> ... </div> }

                {lastPage < currentPage || currentPage === lastPage ? null :
                    <button
                        onClick={() => pageSelect.select(currentPage+1)}
                        { ...( currentPage !== 1 ? {className: 'active'} : null )}
                    >
                        { currentPage === 1 ? 2 : currentPage}
                    </button>
                }


                {lastPage < currentPage || currentPage === lastPage? null : <div> ... </div> }

                {lastPage < currentPage ? null :
                    <button
                        onClick={() => pageSelect.select(lastPage)}
                        { ...( currentPage === lastPage ? {className: 'active'} : null )}
                    >{lastPage}</button>
                }
                <button onClick={() => pageSelect.next()}>{'>'}</button>
            </div>
        </>
    );
};

export default Paginator;