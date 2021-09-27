import React from "react";

import "./style/search.css"

class Search extends React.Component<any, any> {

    render(){

        return(
               <>
                   <div className='inputContainer' >
                       <input className='inputText' type='text' onChange={e => this.props.setSearchQuery(e.target.value)}/>
                       <img className='cancel' src='./icons/cancel.svg' alt='cancel'/>
                       <img className='search' src='./icons/search.svg' alt='search'/>
                   </div>
               </>
        )
    }
}

export default Search