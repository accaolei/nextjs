import React from 'react';
import { Chart, Legend, Point, Line, Tooltip } from 'bizcharts'
export default function () {
    const data = [{
        consumption: 0.63,
        price: 1.2,
        year: 1967
    }, {
        consumption: 0.64,
        price: 1.1,
        year: 1968,
    }, {
        consumption: 0.62,
        price: 1.8,
        year: 1969,
    }, {
        consumption: 0.64,
        price: 1.1,
        year: 1970,
    }, {
        consumption: 0.62,
        price: 1.8,
        year: 1971,
    },];
    const scale = {
        price: {
            min: 0,
            max: 1.9
        },
        year: {
            range: [0.05]
        }
    }
    return (
        <div >
            <Chart height={100} autoFit pure data={data} >
                <Tooltip />
                <Legend />
                <Line position="year*price" />
                {/* <Path animate={{
                    appear: {
                        animation: 'path-in',
                        duration: 1000,
                        easing: 'easeLinear',
                    }
                }}
                    shape="smooth"
                    position="year*price" /> */}
            </Chart>
        </div>
    )
}
