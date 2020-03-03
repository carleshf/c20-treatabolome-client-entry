import React, { Fragment } from 'react';

import './App.css';

import Header from './components/Header';
import FormManager from './components/FormManager';

console.log(React.version);

function App() {
    return (
        <Fragment>
            <Header />
            <main className="my-3 py-5">
                <FormManager init_step={ 1 }/>
            </main>
        </Fragment>
    );
}

export default App;
