import React, { useEffect, useState } from "react";
import ChartistGraph from 'react-chartist';
import sheetConnector from "../../data";

const CaseLocationsTrends = () => {
    const [cases, setCases] = useState([]);
    const [headers, setHeaders] = useState([]);

    const data = {
        labels: headers,
        series: [cases]
    };

    const options = {
        high: 15,
        low: 0,
        reverseData: true,
        axisY: {
            offset: 200,
        },
        horizontalBars: true,
        height: "1500px",
    };

    const type = "Bar";

    useEffect(() => {
        if (!cases.length) {
            sheetConnector((_, tableData) => {
                // get age group
                const deceasedAgeGroup = [];
                for (let datum of tableData) {
                    const group = datum[12].trim().toLowerCase();
                    const groupIdx = deceasedAgeGroup.map(x => x[0]).indexOf(group);
                    if (groupIdx === -1) {
                        deceasedAgeGroup.push([group, 1]);
                        continue;
                    }

                    deceasedAgeGroup[groupIdx][1] += 1;
                }

                const sortedGroup = deceasedAgeGroup.sort((a, b) => {
                    return b[1] - a[1];
                });

                setHeaders(sortedGroup.map(x => x[0]));
                setCases(sortedGroup.map(x => x[1]));
            });
        }
    }, [cases]);

    if (!cases.length) {
        return (
            <div className="center-align">
                <h5>Sit tight, data is loading!</h5>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h3>Locations of confirmed cases</h3>
            <ChartistGraph
                data={data}
                options={options}
                type={type}
            />
        </div>
    );
};

export default CaseLocationsTrends;
