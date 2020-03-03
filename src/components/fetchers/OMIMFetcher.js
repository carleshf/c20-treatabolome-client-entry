import React, { Fragment } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


class OMIMFetcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: [],
            callbackChange: props.fetcher
        }
    }
  
    render() {
        return (
            <Fragment>
                <AsyncTypeahead
                    onChange={ (sel) => { this.state.callbackChange(sel) } }
                    isLoading={this.state.isLoading}
                    onSearch={(query) => {
                        this.setState({isLoading: true});
                        fetch(`http://127.0.0.1:5000/api/fetch/omim?omim=${query}`)
                            .then(resp => resp.json())
                            .then(json => this.setState({
                                isLoading: false,
                                options: json.options.map( function(x) {
                                    return { "id": x["id"], "name": x["name"], "term": x['id'] + ' > ' + x['name'] };
                                })
                            }));
                    }}
                    options={this.state.options}
                    labelKey="term"
                    placeholder="Search for an OMIM term"
                />
            </Fragment>
        )
    }
}

export default OMIMFetcher