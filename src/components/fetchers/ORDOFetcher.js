import React, { Component, Fragment } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'


class ORDOFetcher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: props.options,
            callbackChange: props.fetcher,
            validated: true
        }
    }

    setValid = (status) => {
        this.setState({ validated: status })
    }
  
    render() {
        return (
            <Fragment>
                <AsyncTypeahead
                    id="ordo_fetcher"
                    isInvalid={ !this.state.validated }
                    onChange={ (sel) => { this.state.callbackChange(sel) } }
                    isLoading={ this.state.isLoading }
                    onSearch={ (query) => {
                        this.setState({isLoading: true});
                        fetch(`http://127.0.0.1:5000/api/fetch/ordo?ordo=${query}`)
                            .then(resp => resp.json())
                            .then(json => this.setState({
                                isLoading: false,
                                options: json.options.map( function(x) {
                                    return { "id": x["id"], "name": x["name"], "term": x['id'] + ' > ' + x['name'] };
                                })
                            }));
                    } }
                    defaultSelected={this.state.options}
                    options={this.state.options}
                    labelKey="term"
                    placeholder="Search for an ORDO term"
                />
            </Fragment>
        )
    }
}

export default ORDOFetcher