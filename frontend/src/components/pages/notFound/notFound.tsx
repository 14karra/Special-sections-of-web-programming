import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

export const NotFound: React.FunctionComponent = () => (
    <div style={{textAlign: "center"}}>
        <Helmet>
            <title>Page Not Found | Authorization Service</title>
        </Helmet>
        <h1>Page Not Found</h1>
        <h3>
            <Link to="/">Back to Home page</Link>
        </h3>
    </div>
);