import * as React from 'react';
import './App.css';
import Keyboard from './Components/Keyboard';


class App extends React.Component {
    constructor() {
        super(React.Component);
        this.state = {};
    }

    public render() {
        return (
            <div className="App">
                <Keyboard />
            </div>
        );
    }
}

export default App;
