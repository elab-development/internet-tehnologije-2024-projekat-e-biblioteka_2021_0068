import React from 'react';
import PropTypes from 'prop-types';

const Naslov = props => {
    return (
        <>
            <div className="naslov text-center mb-4">
                <h1>{props.naslov}</h1>
                {props.podnaslov && <i><p className="text-muted">{props.podnaslov}</p></i>}
            </div>
        </>
    );
};

Naslov.propTypes = {
    naslov: PropTypes.string.isRequired,
    podnaslov: PropTypes.string,
};

export default Naslov;
