import React from 'react';
import Users from "./components/Users"
import Search from "./components/Search";
import './App.css';

class App extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.setSearchQuery = this.setSearchQuery.bind(this);
        this.refreshData = this.refreshData.bind(this);

        this.state = {
            valueInput: '',

        }
    }

    setSearchQuery(val: any) {
        this.setState({valueInput: val})
    }

    refreshData() {
        this.setState({valueInput: null})
    }

    render() {

        return (
            <div className='App'>
                <Search setSearchQuery={this.setSearchQuery}/>
                <Users valueInput={this.state.valueInput} refreshData={this.refreshData}/>
            </div>
        );
    }
}

export default App;
