import React from 'react';
import { Person } from '../../lib/interfaces';

interface SpeakerSelectorProps {
    selected: string;
    speakers: Person[];
    handleChange(e: React.FormEvent<HTMLSelectElement>): void;
}

export const SpeakerSelector: React.SFC<SpeakerSelectorProps> = props => {
    return (
        <div className='mx-3'>
            <select
                name='speakers'
                onChange={props.handleChange}
                value={props.selected}
            >
                <option
                    label='Select Speaker'
                    value=''
                >
                    Select Speaker
                </option>
                {
                    props.speakers.map(speaker => (
                        <option
                            key={speaker.id}
                            label={speaker.name}
                            value={speaker.name.split(' ').join('+')}
                        >
                            {speaker.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};