import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FaPencil} from "react-icons/fa6";
import {FaFacebook, FaGithub, FaHeart, FaInstagram, FaMailchimp, FaPhone, FaYoutube} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className="footer" >
                <Container>
                    <Row>
                        <Col md={4} className="text-center">
                            <ul>
                                <li>
                                    <FaMailchimp/> E-mail: ebibliteka@gmail.com
                                </li>
                                <li>
                                    <FaPencil/> Autor: Ivana i Katarina
                                </li>
                                <li>
                                    <FaPhone/> Telefon: +381 11 1234567 </li>
                            </ul>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="copyright">
                                <span>Tu smo zbog Vas! <FaHeart/></span>
                            </div>
                        </Col>

                        <Col md={4} className="text-center">
                            <ul className="social-icons">
                                <li><a className="insta" href="https://www.instagram.com/" ><FaInstagram /></a> </li>
                                <li><a className="fb"  href="https://www.facebook.com/" ><FaFacebook /> </a> </li>
                                <li><a className="github"  href="https://github.com/elab-development/internet-tehnologije-2024-projekat-e-biblioteka_2021_0068" ><FaGithub /></a> </li>
                                <li><a className="yt"  href="https://www.youtube.com/" ><FaYoutube /></a> </li>
                            </ul>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Footer;
