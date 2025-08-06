import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row, Table} from "react-bootstrap";
import server from "../logika/server";
import {FaDownload, FaSpinner, FaStar, FaStarHalf} from "react-icons/fa";

const Knjige = () => {

    const [link, setLink] = React.useState('/paginacija');

    const [knjige, setKnjige] = React.useState([]);
    const [linkovi, setLinkovi] = React.useState([]);
    const [ucitanaKnjiga, setUcitanaKnjiga] = React.useState(null);

    const [imaPretplatu, setImaPretplatu] = React.useState(false);
    const [pretplate, setPretplate] = React.useState([]);
    const [omiljeneKnjige, setOmiljeneKnjige] = React.useState([]);
    const [ucitanaKnjigeJeOmiljena, setUcitanaKnjigeJeOmiljena] = React.useState(false);

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    useEffect(() => {

        if (user) {
            const userId = user.id;
            server.get('/pretplate-korisnika-na-dan/' + userId).then(response => {
                console.log(response);
                setPretplate(response.data.podaci);
                if (response.data.podaci.length > 0) {
                    setImaPretplatu(true);
                } else {
                    setImaPretplatu(false);
                }
            }).catch(error => {
                console.log(error);
                setImaPretplatu(false);
            })
        } else {
            setImaPretplatu(false);
        }
    }, []);

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

    useEffect(() => {
        server.get(link).then(response => {
            console.log(response);
            setKnjige(response.data.podaci.data);
            setLinkovi(response.data.podaci.links);
        }).catch(error => {
            console.log(error);
        })
    }, [link]);

    return (
        <>
            <Naslov naslov="Knjige" podnaslov="Pregled svih knjiga" />
            <Row>
                <Col md={8}>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Naslov</th>
                                <th>Autor</th>
                                <th>Žanr</th>
                                <th>Download</th>
                                <th>Uvid</th>
                                <th>Detalji</th>
                            </tr>
                        </thead>
                        <tbody>
                            {knjige.map((knjiga, index) => (
                                <tr key={index}>
                                    <td>{knjiga.nazivKnjige}</td>
                                    <td>{knjiga.autor}</td>
                                    <td>{knjiga.nazivZanra}</td>
                                    <td>{
                                        !imaPretplatu && (
                                            <>
                                                Morate biti ulogovani sa aktivnom pretplatom da biste downloadovali knjige.
                                            </>
                                        )

                                    }
                                        {
                                        imaPretplatu && (
                                            <a href={knjiga.urlKnjige} target="_blank" rel="noopener noreferrer">
                                                <FaDownload/>
                                            </a>
                                        )
                                        }

                                    </td>
                                    <td>{knjiga.uvidKnjige}</td>
                                    <td><button onClick={() => {
                                        setUcitanaKnjiga(knjiga);
                                        //setUcitanaKnjigeJeOmiljena(jeOmiljena);
                                    }} className="btn dugme"><FaSpinner/>Ucitaj </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <hr/>
                    {
                        linkovi.map((link, index) => (
                            <button className="btn dugme m-1" key={index} onClick={() => setLink(link.url)} disabled={!link.url}>
                                {
                                    link.label === '&laquo; Previous' ? 'Prethodna' :
                                    link.label === 'Next &raquo;' ? 'Sledeća' :
                                    link.label
                                }
                            </button>
                        ))
                    }

                </Col>
                <Col md={4}>
                    {
                        ucitanaKnjiga && (
                            <div>
                                <h3>Detalji knjige</h3>
                                <p><strong>Naslov:</strong> {ucitanaKnjiga.nazivKnjige}</p>
                                <p><strong>Autor:</strong> {ucitanaKnjiga.autor}</p>
                                <p><strong>Žanr:</strong> {ucitanaKnjiga.nazivZanra}</p>
                                <p><strong>Uvid:</strong> {ucitanaKnjiga.uvidKnjige}</p>
                            </div>
                        )
                    }

                    {
                        ucitanaKnjigeJeOmiljena && (
                            <div className="m-3">
                                Ova knjiga je već u vašim omiljenim knjigama. <FaStar />
                            </div>
                        )
                    }

                    {
                        !ucitanaKnjigeJeOmiljena && (
                            <div className="m-3">
                                Dodajte ovu knjigu u omiljene knjige klikom na <button className="btn dugme" onClick={() => {

                                    if (user) {
                                        server.post('/omiljene-knjige', {
                                            knjigaId: ucitanaKnjiga.id,
                                            userId: user.id
                                        }).then(response => {
                                            console.log(response);
                                            setOmiljeneKnjige([...omiljeneKnjige, ucitanaKnjiga]);
                                            setUcitanaKnjigeJeOmiljena(true);
                                        }).catch(error => {
                                            console.log(error);
                                        });
                                    } else {
                                        alert('Morate biti ulogovani da biste dodali knjigu u omiljene.');
                                    }

                            }} > <FaStarHalf/> </button>
                            </div>
                        )
                    }

                    {
                        !imaPretplatu && (
                            <div className="alert alert-warning">
                                Morate biti ulogovani sa aktivnom pretplatom da biste mogli da preuzimate knjige.
                            </div>
                        )
                    }

                    {
                        imaPretplatu && ucitanaKnjiga && (
                            <div className="alert alert-success">
                                <a href={ucitanaKnjiga.urlKnjige} target="_blank" rel="noopener noreferrer"> <FaDownload/> Mozete downloadovati vasu knjigu</a>
                            </div>
                        )
                    }
                </Col>
            </Row>
        </>
    );
};

export default Knjige;
