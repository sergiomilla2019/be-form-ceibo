import React, { Component } from 'react'
import Checkout from './Checkout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


class App extends Component {
    state = { receivedEvent: null };
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Checkout />} />
                        {/* <Route exact path="/registereds" element={<Checkout/>}/> */}
                        {/*   <Route path="/">
                            <Checkout/>
                        </Route> */}
                        <Route path="/registereds">
                            {/*    <Checkout ></Checkout> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App