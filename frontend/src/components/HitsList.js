import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'

export default class HitsList extends Component {
    // Status of the application
    state = {
        hits: [],
        id: ''
    }

    onclick = (e) => {
        
        try {
            let href = e.target.attributes.href.value;
            if(href !== 'undefined'){
                window.open(href, '_blank');
            }
        } catch (error) {
            console.error(error);

        }
    }

    changeOver(e) {
        e.target.style.background = '#fafafa';
    }
    changeOut(e) {
        e.target.style.background = '#fff';
    }

    /* method that is executed before rendering */

    componentDidMount() {
        this.getHits()
    }

    getHits = async () => {
        //const res = await axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        const res = await axios.get('http://localhost:5000/cron/all')
        this.setState({
            hits: res.data
        });
    }

    putStateHit = async (id) => {
        this.setState({
            id: id
        });
        await axios.put('http://localhost:5000/cron/'+id)
        this.getHits()
    }
    
    render() {
        return (
                <div className="list-container">
                    <ul className="list-hits">
                        {
                            this.state.hits.map(hit => (

                                <li className="hits" onMouseOver={this.changeOver} onMouseOut={this.changeOut} key={ hit._id }>
                                    <button
                                        className="link-button title"
                                        href={ hit.url=== null ? hit.story_url : hit.url }
                                        onClick={this.onclick}
                                    >
                                        {hit.title === null ? hit.story_title : hit.title }
                                            <span className="author"  href={ hit.url=== null ? hit.story_url : 'http://localhost:3000/#' }> - { hit.author }- </span>
                                    </button>
                                    <div className="right">
                                        { format(hit.created_at) }
                                        <button
                                            className="link-button"
                                            onClick={() => {this.putStateHit(hit._id)}}>
                                            <i className="fa fa-trash"></i>
                                        </button>

                                    </div>
                                </li>

                            ))//end map
                        }
                    </ul>
                </div>
        )//end return

    }//end render
}