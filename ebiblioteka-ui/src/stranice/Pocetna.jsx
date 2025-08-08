import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Card, Col, Image, Row} from "react-bootstrap";
import magic from '../slike/magic.jpg';
import server from "../logika/server";
import {FaInstagram, FaLinkedin} from "react-icons/fa";

const Pocetna = () => {

    const [knjigaApi, setKnjigaApi] = React.useState([]);

    useEffect(() => {
        server.get('https://potterapi-fedeperin.vercel.app/en/books').then(response => {
            console.log(response);
            setKnjigaApi(response.data);
        }).catch(error => {
            console.log(error);
            alert("Došlo je do greške prilikom učitavanja knjiga.");
        });
    }, []);

    return (
        <>
            <Naslov naslov="Dobrodošli u biblioteku" podnaslov="Uživajte u čitanju knjiga" />
            <Row>
                <Col md={6}>
                    <Image src={magic} fluid />
                </Col>
                <Col md={6}>
                    <h2>Dobrodošli u našu e-biblioteku</h2>
                    <p>
                        E-Biblioteka Ivana i Katarina je osmišljena da vam pruži jednostavan i pristupačan način da uživate u knjigama iz udobnosti vašeg doma.
                        Naš sistem omogućava <strong>online iznajmljivanje knjiga</strong> uz fleksibilan model pretplate koji se prilagođava vašim potrebama.
                    </p>

                    <h2>Kako funkcioniše?</h2>
                    <ul>
                        <li>Pretražite naš bogat katalog sa hiljadama naslova.</li>
                        <li>Izaberite knjigu koju želite da iznajmite.</li>
                        <li>Čitajte je odmah na svom telefonu, tabletu ili računaru.</li>
                    </ul>

                    <h2>Pretplata</h2>
                    <p>
                        Uz naš model pretplate, za samo <strong>999 RSD mesečno</strong> dobijate:
                    </p>
                    <ul>
                        <li>Neograničen pristup svim knjigama u katalogu.</li>
                        <li>Mogućnost offline čitanja.</li>
                        <li>Pristup ekskluzivnim naslovima dostupnim samo pretplatnicima.</li>
                    </ul>
                </Col>
            </Row>

            <hr/>
            <Naslov naslov="Popularne knjige" podnaslov="Istražite naše najpopularnije naslove" />
            <Row>
                {
                    knjigaApi.map(knjiga => (
                        <Col md={4} key={knjiga.number} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={knjiga.cover} />
                                <Card.Body>
                                    <Card.Title>{knjiga.title}</Card.Title>
                                    <Card.Text>
                                        {knjiga.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default Pocetna;
