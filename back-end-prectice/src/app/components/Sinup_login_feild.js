import React from 'react'

const Sinup_login_feild = (prop) => {
    return (

        <>
            <input type={prop.type} value={prop.value} onChange={prop.handlechange} name={prop.feild_name} className="input-field w-full h-[55px] text-base bg-transparent text-white px-[20px] border border-white rounded-full outline-none " />
            <label htmlFor="user" className="label">{prop.feild_name}</label>
            <i className="bx bx-user" ></i>
        </>

    )
}

export default Sinup_login_feild