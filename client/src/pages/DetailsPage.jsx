import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";
import { Loader } from '../components/Loader';
import { LinkCard } from "../components/LinkCard";
export const DetailsPage = () => {
    const [link, setLink] = useState(null);
    const  { token } = useContext(AuthContext)
    const linkId = useParams().id;
    const { request, loading } = useHttp();

    const getLink = useCallback(async() => {
        try{
            const fetched = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched);
        }catch(e){}}, [token, linkId, request])
        useEffect(() => {
            getLink()
        }, [getLink])
        if(loading){
            <Loader/>
        }
    return (
        <>
            { !loading && link && <LinkCard link={link} />}
        </>
    )
}