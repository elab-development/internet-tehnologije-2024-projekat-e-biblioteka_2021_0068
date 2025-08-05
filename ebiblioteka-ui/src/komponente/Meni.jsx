import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {FaHouse} from "react-icons/fa6";
import {FaBomb, FaBook, FaSign, FaSignInAlt, FaUser, FaWaveSquare} from "react-icons/fa";

const Meni = () => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const token = window.sessionStorage.getItem('token');
    const uloga = user ? user.uloga : null;
    const imaPristupAdministraciji = uloga === 'admin' || uloga === 'bibliotekar';
    const logout = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
        window.location.href = "/";
    }

    return (
        <>
            <Navbar className="meni-bg" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Ebiblioteka</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/"><FaHouse/> Pocetna</Nav.Link>
                        <Nav.Link href="/knjige"><FaBook/> Knjige</Nav.Link>
                        <Nav.Link href="/onama"><FaBomb/> O nama</Nav.Link>

                        { token && (
                            <>
                            <Nav.Link href="/moje-knjige"><FaUser/> Moje knjige</Nav.Link>
                                {
                                    imaPristupAdministraciji && (
                                        <Nav.Link href="/admin"><FaSign/> Admin</Nav.Link>
                                    )
                                }
                            <Nav.Link onClick={logout} href="#"><FaWaveSquare/> Logout</Nav.Link>
                            </>
                        )}

                        { !token && (
                            <>
                                <Nav.Link href="/login"><FaSignInAlt/> Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Meni;
