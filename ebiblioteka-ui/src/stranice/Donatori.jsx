import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row} from "react-bootstrap";
import server from "../logika/server";
import Kartica from "../komponente/Kartica";
import {CSVLink} from "react-csv";
import {FaDownload} from "react-icons/fa";

const Donatori = () => {

    const [donatori, setDonatori] = React.useState([]);
    const [podaciZaDownload, setPodaciZaDownload] = React.useState([]);

    useEffect(() => {
        server.get('/donatori').then(response => {
            console.log(response);
            const podaci = response.data.podaci;

            let donatoriNiz = [];
            let podaciDoDownloadNiz = [];

            for (let i = 0; i < podaci.length; i++) {
                donatoriNiz.push({
                    id: i + 1,
                    ime: podaci[i].ime + ' ' + podaci[i].prezime,
                    opis: podaci[i].email + ' (' + podaci[i].donacija +')',
                    slika: podaci[i].slika,
                    instaLink: 'https://www.instagram.com/',
                    linkedInLink: 'https://www.linkedin.com/'
                });

                podaciDoDownloadNiz.push({
                    id: i + 1,
                    ime: podaci[i].ime,
                    prezime: podaci[i].prezime,
                    email: podaci[i].email,
                    donacija: podaci[i].donacija
                });
            }

            setDonatori(donatoriNiz);
            setPodaciZaDownload(podaciDoDownloadNiz);
        }).catch(error => {
            console.log(error);
            alert("Došlo je do greške prilikom učitavanja donatora.");
        });
    }, []);


    return (
        <>
           <Naslov naslov="Donatori" podnaslov="Lista donatora" />

            <hr/>
            <div className="d-flex justify-content-center">
                <CSVLink data={podaciZaDownload} className="btn dugme mb-3" filename={"donatori.csv"} target="_blank">
                    Preuzmi listu donatora <FaDownload />
                </CSVLink>
            </div>

            <Row>
                {
                    donatori.map((donator, index) => (
                        <Col md={3} key={index} className="mb-3">
                            <Kartica
                                slika={donator.slika}
                                opis={donator.opis}
                                ime={donator.ime}
                                instaLink={donator.instaLink}
                                lnLink={donator.linkedInLink}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default Donatori;
