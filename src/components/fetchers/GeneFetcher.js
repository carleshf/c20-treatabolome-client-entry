import React, { Fragment } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'


class GeneFetcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allowNew: false,
            isLoading: false,
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
                    id="gene_fetcher"
                    onChange={ (sel) => { this.state.callbackChange(sel) } }
                    clearButton
                    isInvalid={ !this.state.validated }
                    multiple={false}
                    isLoading={this.state.isLoading}
                    onSearch={(query) => {
                        this.setState({isLoading: true});
                        fetch(`http://127.0.0.1:5000/api/fetch/gene?gene=${query}`)
                            .then(resp => resp.json())
                            .then(json => this.setState({
                                isLoading: false,
                                options: json.options.map( function(x) {
                                    return { "id": x, "name": x };
                                })
                            }));
                    }}
                    defaultSelected={this.state.options}
                    options={this.state.options}
                    labelKey="name"
                    placeholder="Search for genes..."
                />
            </Fragment>
        )
    }
}



export default GeneFetcher;