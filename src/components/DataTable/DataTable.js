import React, { useEffect, useState } from "react";
import sheetConnector from "../../data";

const DataTable = () => {
    const [cols, setCols] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!data.length) {
            sheetConnector((headers, data) => {
                setCols(headers);
                setData(data);
            });
        }
    }, [data]);

    return (
        <div className="responsive-table">
            <table className="striped">
                <thead>
                    <tr>
                        {cols.map((header, hidx) => (
                            <th key={hidx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(
                        (row, ridx) => (
                            <tr key={ridx}>
                                {cols.map((_, hidx) => (
                                    <td key={hidx}>{ row[hidx] }</td>
                                ))}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
