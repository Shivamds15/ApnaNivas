import React,{useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import "../../CSS/FilterModal.css"
import "react-input-range/lib/css/index.css"
import InputRange from "react-input-range"

const FilterModal = ({selectedFilters,onFilterChange,onClose}) => {
    const [priceRange, setPriceRange] = useState({
        min:selectedFilters.priceRange?.min || 600,
        max:selectedFilters.priceRange?.max || 30000,
    });
    const [propertyType, setPropertyType] = useState(
        selectedFilters.propertyType || ""
    );
    const [roomType, setRoomType] = useState(
        selectedFilters.roomType || ""
    );
    const [amenities, setAmenities] = useState(
        selectedFilters.amenities || []
    );
            
    useEffect(() => {
        setPriceRange({
            min:selectedFilters.priceRange?.min || 600,
            max:selectedFilters.priceRange?.max || 30000,
        });
        setPropertyType(
            selectedFilters.propertyType || ""
        );
        setRoomType(
            selectedFilters.roomType || ""
        );
    
        setAmenities(
            selectedFilters.amenities || []
        );
    }, [selectedFilters]);

    const modalRef = useRef(null);

    useEffect(() => {
          const handleClickOutside = (event) => {
              if (modalRef.current && !modalRef.current.contains(event.target)) {
                  onClose();
              }
          };  
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [onClose]);

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };
    const handleMinInputChange =(e) => {
        const minValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({
            ...prev,
            min: minValue
        }))
    };
    const handleMaxInputChange =(e) => {
        const maxValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({
            ...prev,
            max: maxValue
        }))
    };
    const handleFilterChange = () => {
        onFilterChange("minPrice", priceRange.min);
        onFilterChange("maxPrice", priceRange.max);
        onFilterChange("propertyType", propertyType);
        onFilterChange("roomType", roomType);
        onFilterChange("amenities", amenities);
        onClose();
    };
    const propertyTypeOptions = [
        {
            value: "House", label: "House", icons:"house" 
        },
        {
            value: "Flat", label: "Flat", icons:"apartment" 
        },
        {
            value: "Guest House", label: "Guest House", icons:"hotel" 
        },
        {
            value: "Hotel", label: "Hotel", icons:"meeting_room" 
        },
    ];
    const roomTypeOptions = [
        {
            value: "Entire Room", label: "Entire Room", icons:"hotel" 
        },
        {
            value: "Room", label: "Room", icons:"meeting_room" 
        },
        {
            value: "AnyType", label: "AnyType", icons:"apartment" 
        },
    ];
    const amenitiesOptions = [
        {
            value: "Wifi", label: "Wifi", icons:"wifi" 
        },
        {
            value: "Kitchen", label: "Kitchen", icons:"kitchen" 
        },
        {
            value: "AC", label: "AC", icons:"ac_unit" 
        },
        {
            value: "Washing Machine", label: "Washing Machine", icons:"local_laundry_service" 
        },
        {
            value: "TV", label: "TV", icons:"tv" 
        },
        {
            value: "Pool", label: "Pool", icons:"pool" 
        },
        {
            value: "Free Parking", label: "Free Parking", icons:"local_parking" 
        },
    ];
    const handleClearFilters = () => {
        setPriceRange({
            min: 600,
            max: 30000
        });
        setPropertyType("");
        setRoomType("");
        setAmenities([]);
    };
    const handleAmenitiesChange = (selectedAmenity) => {
        setAmenities((prevAmenities) => 
            prevAmenities.includes(selectedAmenity) ? 
            prevAmenities.filter((item) => item !== selectedAmenity) : [...prevAmenities, selectedAmenity]
        );
    };
    const handlePropertyTypeChange = (selectedType) => {
        setPropertyType((prevType) =>
            prevType === selectedType ? "" : selectedType
        );
    };
    const handleRoomTypeChange = (selectedType) => {
        setRoomType((prevType) =>
            prevType === selectedType ? "" : selectedType
        );
    };
    
    return (
        <div className='modal-backdrop'>
            <div className='modal-content' ref={modalRef}>
                <h4>
                    Filters <hr/>
                </h4>
                <button className='close-button' onClick={onClose}>
                    <span>&times;</span>
                </button>
                <div className='modal-filters-container'>
                    <div className='filter-section'>
                        <label>Price range:</label>
                        <InputRange minValue={600} maxValue={30000} value={priceRange} onChange={handlePriceRangeChange} />
                        <div className='range-inputs'>
                            <input type='number' value={priceRange.min} onChange={handleMinInputChange} />
                            <span>-</span>
                            <input type='number' value={priceRange.max} onChange={handleMaxInputChange} />
                            <span></span>
                        </div>
                    </div>
                    <div className='filter-section'>
                        <label>Property Type:</label>
                        <div className='icon-box'>
                            {
                                propertyTypeOptions.map((options) =>
                                    (
                                        <div key={options.value} className={`selectable-box ${propertyType === options.value ? "selected":""}`} onClick={()=>handlePropertyTypeChange(options.value)}>
                                            <span className='material-icons'>{options.icons}</span>
                                            <span>{options.label}</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className='filter-section'>
                        <label>Room Type:</label>
                        <div className='icon-box'>
                            {
                                roomTypeOptions.map((option) =>
                                    (
                                        <div key={option.value} className={`selectable-box ${roomType === option.value ? "selected":""}`} onClick={()=>handleRoomTypeChange(option.value)}>
                                            <span className='material-icons'>{option.icons}</span>
                                            <span>{option.label}</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className='filter-section'>
                        <label>Amenities:</label>
                        <div className='amenities-checkboxes'>
                            {
                                amenitiesOptions.map((options) =>
                                    (
                                        <div key={options.value} className="amenity-checkbox">
                                            {console.log(amenities.includes(options.value))}
                                            <input type='checkbox' value={options.value} checked={amenities.includes(options.value)} 
                                                onChange={() => handleAmenitiesChange(options.value)} />
                                            <span className='material-icons amenitieslabel'>{options.icons}</span>
                                            <span>{options.label}</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className='filter-buttons'>
                        <button className='clear-button' onClick={handleClearFilters}>
                            Reset
                        </button>
                        <button className='clear-button' onClick={handleFilterChange}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

FilterModal.propTypes = {
    selectedFilters:PropTypes.object.isRequired,
    onFilterChange:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
}

export default FilterModal