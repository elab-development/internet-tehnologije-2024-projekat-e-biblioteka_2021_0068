import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Form} from "react-bootstrap";
import useForm from "../logika/useForm";
import server from "../logika/server";

const Login = () => {

    const [prikaziLogin, setPrikaziLogin] = useState(true);
    const [poruka, setPoruka] = useState("");

    const naslov = prikaziLogin ? "Login stranica" : "Stranica za registraciju";
    const [gradovi, setGradovi] = React.useState([]);

    useEffect(() => {
        server.get(
            '/gradovi',
        ).then(response => {
                console.log(response);
                setGradovi(response.data.podaci);
            }
        ).catch(error => {
            console.log(error);
            alert("Došlo je do greške prilikom učitavanja gradova.");
        })
    }, []);

    const {values, handleChange} = useForm({
        email: "",
        password: "",
        ime: "",
        brojTelefona: "",
        adresa: "",
        grad: 0
    });

    const login = () => {

        const data = {
            email: values.email,
            password: values.password
        }

        server.post(
            '/logovanje',
            data
        ).then(response => {
            console.log(response);
            if (response.data.uspesno === true) {
                setPoruka(response.data.poruka);
                const token = response.data.podaci.token;
                const user = response.data.podaci.user;

                window.sessionStorage.setItem('token', token);
                window.sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = "/";
            } else {
                setPoruka(response.data.poruka);
            }
        }).catch(error => {
            console.log(error);
            setPoruka("Došlo je do greške prilikom prijave. Molimo pokušajte ponovo.");
        }
        )
    }

    const registracija = () => {
        const data = {
            name: values.ime,
            email: values.email,
            password: values.password,
            brojTelefona: values.brojTelefona,
            adresa: values.adresa,
            gradId: values.grad
        }

        server.post(
            '/registracija',
            data
        ).then(response => {
            console.log(response);
            if (response.data.uspesno === true) {
                setPoruka(response.data.poruka);
                setPrikaziLogin(true);
            } else {
                setPoruka(response.data.poruka);
            }
        }).catch(error => {
            console.log(error);
            setPoruka("Došlo je do greške prilikom registracije. Molimo pokušajte ponovo.");
        })
    }


    return (
        <>
            <Naslov naslov={naslov} podnaslov={poruka} />

            {
                prikaziLogin && (
                    <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label column="lg">Email address</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label column="lg">Password</Form.Label>
                                <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={login} variant="primary" type="button">
                                Prijavi se!
                            </Button>
                            <p><a href="#" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setPrikaziLogin(false);
                                }
                            }>Nemate nalog? Registrujte se!</a></p>
                        </Form>
                    </>
                )
            }

            {
                !prikaziLogin && (
                    <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formImePrezime">
                                <Form.Label column="lg">Ime i prezime</Form.Label>
                                <Form.Control onChange={handleChange} name="ime" type="text" placeholder="Unesite ime i prezime" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmailReg">
                                <Form.Label column="lg">Email address</Form.Label>
                                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPasswordReg">
                                <Form.Label column="lg">Password</Form.Label>
                                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formbrojTelefona">
                                <Form.Label column="lg">Broj telefona</Form.Label>
                                <Form.Control onChange={handleChange} name="brojTelefona" type="text" placeholder="065 3234 123" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formAdresa">
                                <Form.Label column="lg">Adresa</Form.Label>
                                <Form.Control onChange={handleChange} name="adresa" type="text" placeholder="Unesite adresu" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGrad">
                                <Form.Label column="lg">Grad</Form.Label>
                                <Form.Select onChange={handleChange} name="grad" size="lg">
                                    {
                                        gradovi.map((grad) => {
                                            return (
                                                <option key={grad.id} value={grad.id}>{grad.nazivGrada}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Button onClick={registracija} variant="primary" type="button">
                                Registruj se!
                            </Button>
                            <p><a href="#" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setPrikaziLogin(true);
                                }
                            }>Imate nalog? Prijavite se!</a></p>
                        </Form>
                    </>
                )
            }

        </>
    );
};

export default Login;
