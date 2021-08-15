import React, { useState } from 'react';
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AlgoliaPlaces from 'algolia-places-react'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
//destruct values from ant components
const {RangePicker} =DatePicker;
const {Option}=Select;
const config={
    language : "en",
    countries : ["in"],
}

const Search=() => {
    //state
    const [location, setLocation]=useState('');
    const [date, setDate]=useState('');
    const [bed, setBed]=useState('');

    //history from route using hook
    const history=useHistory();

    const handleSubmit= () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    }

    return (
        <div className="d-flex p-4">
            <div className="w-100">
                <AlgoliaPlaces
                    placeholder="location"
                    defaultValue={location}
                    options={config}
                    onChange={({suggestion}) => setLocation(suggestion.value) }
                    style={{height : "50px"}} 
                 />
            </div>
                <RangePicker
                    onChange={(value,dateString) => setDate(dateString)}
                    className="w-100"
                    disabledDate={(current) => current && current.valueOf()<moment().subtract(1,"days") }
                />

                <Select
                    onChange={(value) => setBed(value)}
                    className="w-100"
                    size="large"
                    placeholder="no. of beds"
                >
                    <option key={1}>{1}</option>
                    <option key={2}>{2}</option>
                    <option key={3}>{3}</option>
                    <option key={4}>{}</option>
                </Select>

                <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn-square" />
        </div>
    );
}

export default Search;