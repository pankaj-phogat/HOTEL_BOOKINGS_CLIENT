import { useState, useEffect } from "react";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import Search from '../components/forms/Search';
import { searchListings } from "../actions/hotel";
import {SmallCard} from '../components/cards/SmallCard';

const SearchResult=() => {
    //state
    const [searchLocation, setSearchLocation]=useState('');
    const [searchDate, setSearchDate]=useState('');
    const [searchBed, setSearchBed]=useState('');
    const [hotels, setHotels]=useState([]);

    // when component mounts, get search params from url and use to search query from backend
    useEffect(() => {
        const {location, date, bed}=queryString.parse(window.location.search);
        //console.table({location, date, bed});
        searchListings({location, date, bed}).then(res => {
            console.log('SEARCH RESULTS',res.data);
            setHotels(res.data);
        })
    },[window.location.search])
    return (
        <>
            <Search />
            <div className="container mt-5">
                <div className="row">
                    {
                        hotels.map( h => <SmallCard key={h._id} h={h}  />)
                    }
                </div>
            </div>
        </>
    )
}

export default SearchResult;