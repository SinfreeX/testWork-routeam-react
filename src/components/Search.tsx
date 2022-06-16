import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {searchProjects} from "../store/reducers/ActionCreators";
import {projectSlice} from "../store/reducers/ProjectSlice";

const Search = () => {
    const dispatch = useAppDispatch()
    const {setQuery} = projectSlice.actions
    const {query} = useAppSelector(state => state.projectReducer)

    const [value, setValue] = useState<string>(query)
    const [error, setError] = useState<string>('')


    const submitHandle = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value.trim().length > 2 ) {
            if (query !== value.trim()) {
                dispatch(setQuery(value.trim()))
                dispatch(searchProjects())
                setError('')
            }
            else setError('Результаты по этому запросу уже отображены')
        }
        else setError('Запрос слишком короткий')
    }

    return (
        <>
            <form onSubmit={submitHandle}>
                <div className={'col-md-12'}>
                    <input
                        type="text"
                        onChange={(e) =>
                            {setValue(e.target.value)}
                        }
                        value={value}
                        placeholder={'Начните вводить текст для поиска (не менее трех символов'}
                    />

                    <button type={'submit'}><span className={'material-icons'}>search</span></button>
                </div>
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
            </form>
        </>
    );
};

export default Search;