import React, {useState} from 'react'
import {DatePicker, Space} from 'antd'
import { useDispatch } from 'react-redux'
import { getAllProperties } from '../../Store/Property/property-action'
import { propertyAction } from '../../Store/Property/property-slice'

const Search = () => {
    const {RangePicker} = DatePicker;
    const [keyword, setKeyword] = useState({});
    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    function searchHandler(e){
        e.preventDefault();
        dispatch(propertyAction.updateSearchParams(keyword));
        dispatch(getAllProperties());
        setKeyword({
            city: "",
            guests: "",
            dateIn: "",
            dateOut: "",
        });
        setValue([]);

    }

    function returnDates(date, dateString){
        setValue([date[0], date[1]]);
        updateKeyword("dateIn", dateString[0]);
        updateKeyword("dateOut", dateString[1]);
    }
    const updateKeyword = (field, value) => {
        setKeyword((preKeyword) => ({
            ...preKeyword,
            [field]: value,
        }));
    };

    return (
        <>
            <div className='searchbar'>
                <input type='text' className='search' id='search_destination' placeholder='Search Your Destination' 
                    value={keyword.city} onChange={(e => updateKeyword("city", e.target.value))} />
                <Space direction='vertical' size={12} className='search'>
                    <RangePicker format="DD-MM-YYYY" picker='date' className='date_pikcer' value={value} 
                        disabledDate={(current) => {
                            return current && current.isBefore(Date.now(), "day");}} onChange={returnDates} />
                </Space>
                <input type='number' className='search' id='addguest' placeholder='Add Guest' 
                    value={keyword.guests} onChange={(e) => updateKeyword("guests", e.target.value)} />
                <span className="material-symbols-outlined searchicon" onClick={searchHandler}>
                    search
                </span>
            </div>
        </>
  )
}

export default Search