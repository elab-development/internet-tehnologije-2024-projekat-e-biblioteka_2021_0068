import React from 'react';
import Naslov from "../komponente/Naslov";
import katarina from "../slike/katarina.jpeg";
import ivana from "../slike/ivana.jpeg";
import {Col, Row} from "react-bootstrap";
import Kartica from "../komponente/Kartica";

const Onama = () => {
    
    const onama = [
            {
                slika: katarina,
                ime: "Katarina",
                opis: "Student cetvrte godine na Fakultetu organizacionih nauka. Omiljeni zanr joj je komedija. Uvek nasmejana i vesela. ",
                instaLink: "https://www.instagram.com/katarinaa_nedovic/",
                lnLink: "https://www.linkedin.com/in/katarina-nedovic/"
            },
            {
                slika: ivana,
                ime: "Ivana",
                opis: "Student cetvrte godine na Fakultetu organizacionih nauka. Strastvena čitateljka i ljubiteljka avantura. Uvek u potrazi za novim izazovima.",
                instaLink: "https://www.instagram.com/milenkoviivana/",
                lnLink: "https://www.linkedin.com/in/ivanamilenkovic8/"
            }
        ];

    return (
        <>
            <Naslov naslov="Rekli su" podnaslov="o nama" />
            <Row>
                {
                    onama.map((osoba, index) => (
                        <Col md={6} key={index}>
                            <Kartica slika={osoba.slika} opis={osoba.opis} ime={osoba.ime} instaLink={osoba.instaLink} lnLink={osoba.lnLink} />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default Onama;
