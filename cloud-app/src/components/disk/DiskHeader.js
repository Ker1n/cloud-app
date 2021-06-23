import React from 'react'
import { useDispatch } from "react-redux";
import { setFilesView } from "../../redux/reducers/appReducer";


export const DiskHeader = (props) => {
    const dispatch = useDispatch();
    const {sort, setSort} = props;

    return (
        <div className="disk__header">
        <div className="disk-header__right-row">
          <div className="right-row__arrow-back">
            Back
          </div>
          <div className="right-row__arrow-forward">
          Forward
          </div>
          <div className="right-row__new-folder">
            new folder
          </div>
        </div>
        <div className="disk-header__left-row">
          <div className="left-row__select-sort">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className='select-sort__select' >
              <option value="name">Sort by name</option>
              <option value="type">Sort by type</option>
              <option value="date">Sort by date</option>
            </select>
          </div>
              <div className="left-row__select-table">
                <button className="select-table__plate" onClick={()=>dispatch(setFilesView('plate'))}></button>
                <button className="select-table__list" onClick={()=>dispatch(setFilesView('list'))}></button>
              </div>
        </div>
      </div>
    )
}
