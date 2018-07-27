import * as React from 'react';
import {findFirstMatches, segmentJamos, segmentSyllables} from '../KoreanInput';

class Keyboard extends React.Component {

    input(event: React.FormEvent<HTMLInputElement>) {
        console.log('input', event.currentTarget.value);
    }

    public render() {
        return (
            <div className="keyboard">
                <h1>Korean Software Keyboard</h1>

                <input type="text" onInput={this.input} />
            </div>
        );
    }
}

export default Keyboard;
