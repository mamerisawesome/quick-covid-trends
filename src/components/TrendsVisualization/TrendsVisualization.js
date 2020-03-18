import React from "react";
import DeceasedTrends from "./DeceasedTrends";
import CaseLocationsTrends from "./CaseLocationsTrends";

const TrendsVisualization = () => {
    return (
        <div>
            <DeceasedTrends />
            <CaseLocationsTrends />
        </div>
    );
};

export default TrendsVisualization;
