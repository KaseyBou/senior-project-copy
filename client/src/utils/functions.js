import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";

//
const Functions = () => {

    //NOT FINISHED
    const IsUserLoggedIn = () => {
        //intializing
        const cookies = new Cookies();

        if(cookies.get("TOKEN") === undefined) {

            return true;
        }

        return true;
    }   

    return {IsUserLoggedIn}
};


export default Functions;