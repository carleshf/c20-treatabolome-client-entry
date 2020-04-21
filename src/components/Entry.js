import React, { Fragment } from 'react'
import Header from './Header'
import FormManager from './FormManager'


function Entry() {
    return (
        <Fragment>
            <Header />
            <main className="my-3 py-5">
                <FormManager init_step={ 1 }/>
            </main>
        </Fragment>
    );
}

export default Entry
