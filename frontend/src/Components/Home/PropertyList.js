import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';
import { Link } from 'react-router-dom';

const Card = ({image,address,price,name,id}) => {
    return(
        <figure className="property">
            <Link to={`/propertylist/${id}`}><img src={image} alt='Propertyimg' /></Link> 
            <h4>{name}</h4>
            <figcaption>
                <main className='propertydetails'>
                    <h5>{name}</h5>
                    <h6>
                        <span className="material-symbols-outlined houseicon">
                            home_pin
                        </span>
                        {address}
                    </h6>
                    <p>
                        <span className='price'>
                            &#8377;{price}
                        </span>
                         / Night
                    </p>
                </main>
            </figcaption>
        </figure>
    )
}

const PropertyList = () => {
    // const cardsData = [
    //     {
    //         id:1,
    //         image:"/assets/image1.jpeg",
    //         name:"House Manali",
    //         address:"Manali, Himachal Pradesh, India",
    //         price: 1999,
    //     },
    //     {
    //         id:2,
    //         image:"/assets/property2.webp",
    //         name:"Villa Home",
    //         address:"Coorg, India",
    //         price: 3999,
    //     },
    // ]

    const [currentPage, setCurrentPage] = useState({ page: 1 });
    const {properties, totalproperties} = useSelector(
        (state) => state.properties
    );
    const lastpage = Math.ceil(totalproperties/12);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProperties = async (page) => {
            dispatch(propertyAction.updateSearchParams(page));
            dispatch(getAllProperties());
        };
        fetchProperties(currentPage);
    }, [currentPage, dispatch]
    );

    return (
        <>
        {
            properties.length === 0 ? (<p className='not_found'>property not found</p>) : (
                <div className='propertylist'>
                {
                    properties.map((property) => (
                        <Card key={property._id} id={property._id} image={property.images[0].url} name={property.propertyName} 
                            address={`${property.address.city}, ${property.address.state}, ${property.address.pincode}`} 
                            price={property.price} />
                    ))
                }
            </div>
            )
        }

        <div className='pagination'>
            <button className='previous_btn' onClick={() => setCurrentPage((prev) =>({ page: prev.page - 1 }))}
                disabled= {currentPage.page ===1 }>
                    <span className='material-symbols-outlined'>arrow_back_ios_new</span>
            </button>

            <button className='next_btn' onClick={() => setCurrentPage((prev) =>({ page: prev.page + 1 }))}
                disabled= {properties.length <12 || currentPage.page === lastpage }>
                    <span className='material-symbols-outlined'>arrow_forward_ios</span>
            </button>

        </div>

        </>
    )
}

export default PropertyList