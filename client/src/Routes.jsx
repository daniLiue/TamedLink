import React from "react";
import { Routes, Route } from "react-router-dom"
import { LinksPage } from "./pages/LinksPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AuthPage } from "./pages/AuthPage";
import { CreatePage } from "./pages/CreatePage";


export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Routes>
                <Route path="/links" exact element={<LinksPage/>}/>
                <Route path="/detail/:id" element={<DetailsPage/>}/>
                <Route path="/create" exact element={<CreatePage/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" exact element={<AuthPage/>}/>
        </Routes>
    )

}