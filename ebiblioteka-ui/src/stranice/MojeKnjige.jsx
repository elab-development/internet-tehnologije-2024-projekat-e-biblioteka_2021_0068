import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Table} from "react-bootstrap";
import server from "../logika/server";
import {FaTrash} from "react-icons/fa";

const MojeKnjige = () => {

    const [omiljeneKnjige, setOmiljeneKnjige] = React.useState([]);
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            server.get('/omiljene-knjige/' + user.id).then(response => {
                console.log(response);
                setOmiljeneKnjige(response.data.podaci);
            }).catch(error => {
                console.log(error);
            })
        }
    }, []);

    return (
        <>
            <Naslov naslov="Moje omiljene knjige" podnaslov="Pregledajte svoje omiljene knjige" />

            <Table striped>
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Autor</th>
                        <th>Žanr</th>
                        <th>Obrisi</th>
                    </tr>
                </thead>

                <tbody>
                    {omiljeneKnjige.map(knjigaUser => (
                        <tr key={knjigaUser.id}>
                            <td>{knjigaUser.knjiga.nazivKnjige}</td>
                            <td>{knjigaUser.knjiga.autor}</td>
                            <td>{knjigaUser.knjiga.zanr.nazivZanra}</td>
                            <td>
                                <button
                                    className="btn dugme"
                                    onClick={() => {
                                        server.delete('/omiljene-knjige/' + knjigaUser.id)
                                            .then(response => {
                                                console.log(response);
                                                setOmiljeneKnjige(omiljeneKnjige.filter(k => k.id !== knjigaUser.id));
                                            })
                                            .catch(error => {
                                                console.error("Greška prilikom brisanja knjige:", error);
                                            });
                                    }}
                                >
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {omiljeneKnjige.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">Nemate omiljenih knjiga.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default MojeKnjige;
