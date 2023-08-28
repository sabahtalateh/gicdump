import {Row, Total} from "./Row";

function Table({data}) {
    if (data.length === 0) {
        return <div></div>
    }

    const rows = data[0].length
    let out = []

    let totals = []
    for (let i = 0; i < data.length; i++) {
        totals.push(data[i].length)
    }

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < data.length; j++) {
            let d = data[j][i]
            if (i === 0 && d === undefined) {
                d = {empty_overlay: true}
            }
            row.push(d)
        }

        if (i === 0) {
            out.push(<Total key={'total'} data={totals}/>)
        }
        out.push(<Row key={i} data={row} firstRow={i === 0} lastRow={i === rows - 1}/>)
    }

    return (<div className="table">{out}</div>);
}

export default Table
