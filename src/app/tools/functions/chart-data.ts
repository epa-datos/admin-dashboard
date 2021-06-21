/**
 * Disaggregates data to pictorial chart
 * @param metricName1 name property (value) to to distinguish the first metric
 * @param metricName2 name property (value) to to distinguish the second metric
 * @param dataRaw array with two metrics (objects)
 * @returns an object with 2 objetcs (disaggregated metric1 and metric2 data)
 */
export function disaggregatePictorialData(metricName1: string, metricName2: string, dataRaw: any[]): {} {
    let disMetric1;
    let disMetric2;

    const metric1 = dataRaw.find(item => item.name === metricName1);
    const metric2 = dataRaw.find(item => item.name === metricName2);

    let devicePerc = getPercentageValues(metric1?.value, metric2?.value);

    if (metric1) {
        disMetric1 = [
            {
                name: 'empty',
                value: devicePerc.perc1 ? +(100 - (+devicePerc.perc1)).toFixed(2) : 100
            },
            {
                name: metricName1,
                value: devicePerc.perc1 ? +devicePerc.perc1 : 0, rawValue: metric1.value
            },
        ];
    } else {
        disMetric1 = [];
    }

    if (metric2) {
        disMetric2 = [
            {
                name: 'empty',
                value: devicePerc.perc2 ? +(100 - (+devicePerc.perc2)).toFixed(2) : 100
            },
            {
                name: metricName2,
                value: devicePerc.perc2 ? +devicePerc.perc2 : 0, rawValue: metric2.value
            },
        ];
    } else {
        disMetric2 = [];
    }

    console.log('res',)

    return {
        [metricName1.toLowerCase()]: disMetric1,
        [metricName2.toLowerCase()]: disMetric2
    };
}

function getPercentageValues(value1: any, value2: any) {
    let total = value1 + value2;
    let perc1 = ((value1 * 100) / total).toFixed(2);
    let perc2 = ((value2 * 100) / total).toFixed(2);
    return { perc1, perc2 };
}
