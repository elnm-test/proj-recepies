import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import utilService from '../services/utilService';


export default class TasteChart extends PureComponent {

    state = {
        data: []
    }

    componentDidMount() {
        //Random Values !
        const { getRandomIntInclusive } = utilService;
        const MIN_VAL = 50;
        const MAX_VAL = 150;

        this.setState({
            data: [
                {
                    subject: 'Sweet',
                    A: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    B: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    fullMark: 150,
                },
                {
                    subject: 'Salty',
                    A: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    B: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    fullMark: 150,
                },
                {
                    subject: 'Sour',
                    A: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    B: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    fullMark: 150,
                },
                {
                    subject: 'Bitter',
                    A: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    B: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    fullMark: 150,
                },
                {
                    subject: 'Savory',
                    A: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    B: getRandomIntInclusive(MIN_VAL, MAX_VAL),
                    fullMark: 150,
                },
                {
                    subject: 'Fatty',
                    A: getRandomIntInclusive(100, 150),
                    B: getRandomIntInclusive(100, 150),
                    fullMark: 150,
                },
            ]
        })
    }


    render() {
        const { data } = this.state;
        return (
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        );
    }
}
