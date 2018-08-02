import * as React from 'react';
import { convert } from '../KoreanInput';


interface KeyboardProps {

}

interface KeyboardState {
    hangul: string;
}

class Keyboard extends React.Component<KeyboardProps, KeyboardState> {

    constructor(props: KeyboardProps) {
        super(props);
        this.state = {hangul: ''};
    }

    input = (event: React.FormEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        this.setState({hangul: convert(value)});
    };

    public render() {
        return (
            <div className="keyboard">
                <h1>Korean Software Keyboard</h1>

                <input type="text" onInput={this.input} />

                <p>{this.state.hangul}</p>
            </div>
        );
    }
}

export default Keyboard;
