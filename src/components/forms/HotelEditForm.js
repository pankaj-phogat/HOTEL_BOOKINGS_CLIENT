import AlgoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from "antd";
import moment from "moment";
const { Option }=Select;
const config= {
    language : "en",
    countries : ["in"],
}
const HotelEditForm=({
    values,
    setValues,
    handleSubmit,
    handleChange,
    handleImageChange,
}) => {

        const {title, content, image, price,bed, from, to }=values;
        return (<form onSubmit={handleSubmit} name="newHotel">
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left ">
                    Image
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        hidden 
                    />
                </label>
                <input 
                    type="text" 
                    name="title"
                    onChange={handleChange} 
                    placeholder="title" 
                    className="form-control m-2" 
                    value={title} 
                />
                <textarea 
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Content" 
                    className="form-control m-2" 
                    value={content}
                    rows="6" 
                />
                {values.location && values.location.length && <AlgoliaPlaces 
                    className="form-control m-2" 
                    placeholder="location"
                    options={config}
                    defaultValue={values.location}
                    onChange={({suggestion}) => setValues({...values, location : suggestion.value}) }   
                    style={
                        {height : "50px"}
                    }   
                />}
                <input 
                    type="number"
                    name="price" 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="form-control m-2" 
                    value={price} 
                />
                <Select 
                    onChange={(value) => setValues({...values,bed : value})}
                    className="w-100 m-2" 
                    size="large" 
                    placeholder="Number of beds"
                    value={bed}
                >
                    <Option key={1}>1</Option>
                    <Option key={2}>2</Option>
                    <Option key={3}>3</Option>
                    <Option key={4}>4</Option>
                </Select>
                {from && <DatePicker
                    placeholder="From date"
                    className="form-control col-md-4 m-2"
                    defaultValue={moment(from,'YYYY-MM-DD')}
                    onChange={(date,dateString) => setValues({...values,from : dateString})}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1,'days') }
                />}
                {to && <DatePicker
                    placeholder="To date"
                    className="form-control col-md-4 m-2"
                    defaultValue={moment(from,'YYYY-MM-DD')}
                    onChange={(date,dateString) => setValues({...values,to : dateString})}
                    disabledDate={(current) => current 
                                    && current.valueOf() < moment().subtract(1,'days') }
                />}
                <button className="btn btn-outline-primary m-2" >Save</button>
            </div>
        </form>);
} 


export default HotelEditForm;