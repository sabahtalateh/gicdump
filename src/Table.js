import Row from './Row'

function Table({ data }) {
    if (data.length === 0) {
        return <div></div>
    }

    const rows = data[0].length
    let out = []

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < data.length; j++) {
            let d = data[j][i]
            if (i === 0 && d === undefined) {
                d = { empty_overlay: true }
            }
            row.push(d)
        }
        out.push(<Row key={i} row={i} data={row} borders={i === rows - 1} />)
    }

    return (<div className="table">{out}</div>);
}

export default Table
