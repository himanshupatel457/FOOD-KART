import React, { useState } from 'react'
import { Country, State } from "country-state-city"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"


const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);

    const [HouseNo, setHouseNo] = useState(shippingInfo.HouseNo)
    const [country, setCountry] = useState(shippingInfo.country)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(houseNo,state,city,country,pinCode);
        dispatch({
            type: "addShippingInfo",
            payload: {
                HouseNo, state, city, country, pinCode, phoneNo
            }
        });
        localStorage.setItem("shippingInfo", JSON.stringify({
            HouseNo, state, city, country, pinCode, phoneNo
        }))
        navigate("/confirmOrder")
    }











    return (
        <section className='shipping'>
            <main>
                <h1>
                    Shipping details
                </h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>House No.</label>
                        <input type="text" value={HouseNo} required onChange={(e) => setHouseNo(e.target.value)} placeholder='Enter House No.' />
                    </div>
                    <div>
                        <label>City/Town</label>
                        <input type="text" value={city} required onChange={(e) => setCity(e.target.value)} placeholder='Enter City' />
                    </div>
                    <div>
                        <label>Country</label>
                        <select value={country} required onChange={(e) => setCountry(e.target.value)}>
                            <option required value="">Country</option>
                            {
                                Country && Country.getAllCountries().map((i) => (
                                    <option required value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {country && <div>
                        <label>State</label>
                        <select required value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="" q>State</option>
                            {
                                State && State.getStatesOfCountry(country).map(i => (
                                    <option required value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                ))
                            }
                        </select>
                    </div>}
                    <div>
                        <label>PinCode</label>
                        <input required type="number" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder='Pin/Zip Code' />
                    </div>
                    <div>
                        <label>Phone No.</label>
                        <input required type="number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder='Enter Phone No.' />
                    </div>
                    <button type='submit' >Confirm Order</button>
                </form>
            </main>
        </section>
    )
}

export default Shipping