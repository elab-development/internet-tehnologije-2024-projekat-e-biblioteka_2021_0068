import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import server from "../logika/server";
import useForm from "../logika/useForm";
import {FaTrash} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import {Chart} from "react-google-charts";

const Admin = () => {
    const [poruka, setPoruka] = React.useState("");
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const uloga = user ? user.uloga : null;

    const imaPristupAdministraciji = uloga === 'admin' || uloga === 'bibliotekar';

    const samoAdmin = uloga === 'admin';

    const [pretplate, setPretplate] = React.useState([]);

    const [zanrovi, setZanrovi] = React.useState([]);

    const [izabraniZanrId, setIzabraniZanrId] = React.useState(0);

    const [filtriraneKnjige, setFiltriraneKnjige] = React.useState([]);

    const [podaciGrafikona, setPodaciGrafikona] = React.useState([]);

    const {values, handleChange} = useForm({
        nazivKnjige: "",
        autor: "",
        zanrId: 1,
        uvidKnjige: ""
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    useEffect(() => {
        server.get('/pretplate-na-dan').then(response => {
            console.log(response);
            setPretplate(response.data.podaci);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        server.get('/zanrovi').then(response => {
            console.log(response);
            setZanrovi(response.data.podaci);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const uploadKnjige = () => {
        if (!selectedFile) {
            setPoruka("Molimo vas da izaberete knjigu za upload.");
            return;
        }

        const formData = new FormData();
        formData.append('nazivKnjige', values.nazivKnjige);
        formData.append('autor', values.autor);
        formData.append('zanrId', values.zanrId);
        formData.append('uvidKnjige', values.uvidKnjige);
        formData.append('knjiga', selectedFile);

        console.log(formData);

        server.post('/knjige', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            setPoruka("Knjiga je uspešno dodata.");
            setSelectedFile(null);
        }).catch(error => {
            console.log(error);
            setPoruka("Došlo je do greške prilikom dodavanja knjige.");
        });
    }

    useEffect(() => {
        if (izabraniZanrId > 0) {
            server.get('/knjige/zanr/' + izabraniZanrId).then(response => {
                console.log(response);
                setFiltriraneKnjige(response.data.podaci);
            }).catch(error => {
                console.log(error);
            });
        } else {
            server.get('/knjige').then(response => {
                console.log(response);
                setFiltriraneKnjige(response.data.podaci);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [izabraniZanrId]);

    useEffect(() => {
        server.get('/knjige-po-zanru').then(response => {
            console.log('grafikon')
            console.log(response);
            const podaci = response.data.podaci;
            let grafikPodaci = [];
            grafikPodaci.push(['Zanr', 'Broj knjiga']);

            for (let i = 0; i < podaci.length; i++) {
                grafikPodaci.push([podaci[i].nazivZanra, podaci[i].brojKnjiga]);
            }

            console.log(grafikPodaci);

            setPodaciGrafikona(grafikPodaci);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Naslov naslov="Administracija" podnaslov={poruka} />

            <Row>
                {
                    imaPristupAdministraciji && (
                        <>
                            <Col md={4}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formKnjige">
                                        <Form.Label column="lg">Naziv knjige</Form.Label>
                                        <Form.Control onChange={handleChange} name="nazivKnjige" type="text" placeholder="Unesite naziv knjige" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formKnjige">
                                        <Form.Label column="lg">Autor</Form.Label>
                                        <Form.Control onChange={handleChange} name="autor" type="text" placeholder="Unesite autora" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formZanr">
                                        <Form.Label column="lg">Zanr</Form.Label>
                                        <Form.Select onChange={handleChange} name="zanrId" size="lg">
                                            {
                                                zanrovi.map((zanr) => {
                                                    return (
                                                        <option key={zanr.id} value={zanr.id}>{zanr.nazivZanra}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formKnjige">
                                        <Form.Label column="lg">Uvid Knjige</Form.Label>
                                        <Form.Control onChange={handleChange} name="uvidKnjige" type="text" placeholder="Unesite tizer knjige do 100 karaktera" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formKnjige">
                                        <Form.Label column="lg">Knjiga</Form.Label>
                                        <Form.Control onChange={(event) => {
                                            setSelectedFile(event.target.files[0]);
                                        }} name="knjiga" type="file" placeholder="knjgu" />
                                    </Form.Group>

                                    <Button onClick={uploadKnjige} variant="primary" type="button">
                                        Unesi knjigu
                                    </Button>
                                </Form>
                            </Col>

                            <Col md={8}>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Korisnik</th>
                                            <th>Datum od</th>
                                            <th>Datum do</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        pretplate.map(pretplata => (
                                            <tr key={pretplata.id}>
                                                <td>{pretplata.korisnik.name}</td>
                                                <td>{new Date(pretplata.datumOd).toLocaleDateString()}</td>
                                                <td>{new Date(pretplata.datumDo).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </>
                    )
                }
            </Row>
            <hr/>

            <Row>

                {
                    samoAdmin && (
                        <>
                            <Col md={12}>
                                <h1 className="text-center p-1">Pregled broja knjiga po zanru</h1>
                            </Col>
                            <Col md={12}>

                                {
                                    podaciGrafikona.length > 0 && <Chart chartType="ColumnChart" width="100%" height="100%" data={podaciGrafikona} />
                                }
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3" controlId="formZanrPretraga">
                                    <Form.Label column="lg">Pretraga knjiga po zanru</Form.Label>
                                    <Form.Select onChange={
                                        (event) => {
                                            setIzabraniZanrId(event.target.value);
                                    }
                                    } name="zanrPretraga" size="lg">
                                        <option key={0} value={0}>Svi zanrovi</option>

                                        {
                                            zanrovi.map((zanr) => {
                                                return (
                                                    <option key={zanr.id} value={zanr.id}>{zanr.nazivZanra}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <hr/>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Naslov</th>
                                            <th>Autor</th>
                                            <th>Žanr</th>
                                            <th>Obrisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filtriraneKnjige.map((knjiga, index) => (
                                                <tr key={index}>
                                                    <td>{knjiga.nazivKnjige}</td>
                                                    <td>{knjiga.autor}</td>
                                                    <td>{knjiga.zanr.nazivZanra}</td>
                                                    <td>
                                                        <button
                                                            className="btn dugme"
                                                            onClick={() => {
                                                                server.delete('/knjige/' + knjiga.id)
                                                                    .then(response => {
                                                                        console.log(response);
                                                                        setFiltriraneKnjige(filtriraneKnjige.filter(k => k.id !== knjiga.id));
                                                                    })
                                                                    .catch(error => {
                                                                        console.error("Greška prilikom brisanja knjige:", error);
                                                                    });
                                                            }}
                                                        >
                                                            <FaTrashCan/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </>
                    )
                }
            </Row>

        </>
    );
};

export default Admin;
