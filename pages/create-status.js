import React, { useState } from 'react';
import auth0 from '../lib/auth0';
import axios from 'axios';

const CreateStatus = () => {
    const [data, setData] = useState({
        status: 'bem',
        coords: {
            lat: null,
            long: null
        }
    })
    const getMylocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords);
                setData(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude,
                        }
                    }
                })
            })
        }
    }
    const onStatusChange = evt => {
        const value = evt.target.value;
        setData(old => {
            return {
                ...old,
                status: value
            }
        })
    }
    const saveStatus = async () =>{
        await axios.post('/api/save-status', data)
    }
    return (
        <div>
            <h1>Criar Status</h1>
            <label className='block'><input type="radio" name='status' value='bem' onClick={onStatusChange} />Estou bem.</label>
            <label className='block'><input type="radio" name='status' value='gripe/resfriado' onClick={onStatusChange} />Estou com sintomas de gripe/resfriado.</label>
            <label className='block'><input type="radio" name='status' value='covid' onClick={onStatusChange} />Estou com sintomas da COVID.</label>
            Precione o botão para pegar sua localização: {JSON.stringify(data)}
            <button className='block py-4 px-2 bg-green-500 hover:shadow-xl' onClick={getMylocation}>Minha localização</button>
            <button className='my-3 py-4 px-2 bg-green-500 hover:shadow-xl' onClick={saveStatus}>Salvar meu Status</button>
        </div>
    )
}

export default CreateStatus;

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if (session) {
        return {
            props: {
                isAuth: true,
                user: session.user.name,
                photo: session.user.picture,
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}
