import React, { useEffect, useState } from "react";


export default function fetchData ({Api}) {

    const [namesList, setNamesList]=useState([]);
    //console.log(Api)
    useEffect(() => {
        fetchApi();
    }, []);
    
    const fetchApi = async () => {
        try{
            const response=await fetch(`${Api}`)
                    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const arr = [];
            if (result) {
                result.data.forEach((item) => {
                    const Item = [item.name,
                        item.id]                        ;
                    arr.push(Item);
                    
                });
                
            setNamesList(arr);
                
            } else {
                console.error('Data is not an array.');
            }
        } catch (error) {
            console.error('Error:', error);

            }
        }

        return namesList
}
    