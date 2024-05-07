import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/authContext";


export const AuthPage = () => {
    const [ form, setForm ] = useState({ email: '', password: '' });
    const message = useMessage();
    const navigate = useNavigate();
    const { loading, request, error, clearError } = useHttp(); 
    const auth = useContext(AuthContext);
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async (e) => {
        try{
            await request('http://localhost:5000/api/auth/registation', 'POST', {...form});
            message('Пользователь создан нажмиет "Войти"');
        }catch(error){}
    }
    const loginHandler = async (e) => {
        try{
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            message(data.message);
            navigate('/create');
        }catch(error){}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                    <div className="card blue darken-1">
                      <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                          <div className="input-field">
                            <input 
                                placeholder="Введите Email" 
                                id="email" 
                                type="text"
                                name="email"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                          </div>

                          <div className="input-field">
                            <input 
                                placeholder="Введите Пароль" 
                                id="password" 
                                type="password"
                                name="password"
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                          </div>

                        </div>
                      </div>
                    <div className="card-action">
                        <button 
                            onClick={loginHandler}
                            className="btn yellow darken-4" 
                            style={{ marginRight: 10 }}
                            disabled={loading}> Войти </button>
                        <button 
                            onClick={registerHandler} 
                            className="btn green lighten-2 black-text"
                            disabled={loading}> Регистрация </button>
                    </div>
                 </div>
            </div>
        </div>
    )
}