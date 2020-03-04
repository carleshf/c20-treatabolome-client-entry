import React, { Fragment } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


class HPOFetcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allowNew: false,
            isLoading: false,
            options: props.options,
            callbackChange: props.fetcher
        }
    }
  
    render() {
        return (
            <Fragment>
                <AsyncTypeahead
                    id="hpo_fetcher"
                    onChange={ (sel) => { this.state.callbackChange(sel) } }
                    clearButton
                    multiple={true}
                    isLoading={this.state.isLoading}
                    onSearch={(query) => {
                        this.setState({isLoading: true});
                        fetch(`http://127.0.0.1:5000/api/fetch/hpo?hpo=${query}`)
                            .then(resp => resp.json())
                            .then(json => this.setState({
                                isLoading: false,
                                options: json.options.map( function(x) {
                                    return { "id": x["id"], "name": x["name"], "term": x['id'] + ' > ' + x['name'] };
                                })
                            }));
                    }}
                    defaultSelected={this.state.options}
                    options={this.state.options}
                    labelKey="term"
                    placeholder="Search for HPO terms..."
                />
            </Fragment>
        )
    }
}
export default HPOFetcher;