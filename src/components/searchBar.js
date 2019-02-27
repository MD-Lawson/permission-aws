import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
          };
        
        this.handleSearch = this.handleSearch.bind(this);
    }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  handleSearch = (event) => {
    this.setState({searchTerm: event.target.value});
    var validatedString = escapeRegExp(event.target.value)
    this.props.onChange(validatedString);
  }

  render () {
    return (
      <div>
        <label>Search</label>
        <input
        className="searchStyle"
          type="search"
          placeholder="Enter search term!"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

export default SearchBar;