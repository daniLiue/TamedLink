import React, {useContext, useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";

export const CreatePage = () => {
    const [link, setLink] = useState();
    const navigate = useNavigate();
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);
    useEffect(() => {
        window.M.updateTextFields();
    }, [])
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const pressHandler = async (e) => {
        if(e.key === 'Enter'){
            try{
                const data = await request('http://localhost:5000/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                });
                message(data.message);
                return navigate(`/detail/${data.link._id}`);
                
            }catch(data){}
        }
    }

    return (
        <>
            <div className="row">
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input 
                            placeholder="Введите ссылку"  
                            id="link" 
                            type="text"
                            name="link"
                            value={link}
                            onChange={e => { setLink(e.target.value)}}
                            onKeyPress={pressHandler}/>
                        <label htmlFor="link">Введите ссылку</label>
                    </div>
                </div>
            </div>
        </>
    )
}