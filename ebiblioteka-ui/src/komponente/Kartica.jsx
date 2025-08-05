import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import {FaInstagram, FaLinkedin} from "react-icons/fa";

const Kartica = props => {

    const {slika, ime, opis, instaLink, lnLink} = props;

    return (
        <>
            <Card>
                <Card.Img variant="top" src={slika} />
                <Card.Body>
                    <Card.Title>{ime}</Card.Title>
                    <Card.Text>
                        {opis}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="kartica-linkovi">
                    <Card.Link href={instaLink}><FaInstagram/></Card.Link>
                    <Card.Link href={lnLink}><FaLinkedin/></Card.Link>
                </Card.Body>
            </Card>
        </>
    );
};

Kartica.propTypes = {
    slika : PropTypes.string,
    ime: PropTypes.string,
    opis: PropTypes.string,
    instaLink: PropTypes.string,
    lnLink: PropTypes.string
};

export default Kartica;
