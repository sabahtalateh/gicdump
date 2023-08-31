import {Header, Row} from './Row'

function StagesTable({data, infoOpened}) {
    let out = []

    let rows = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].total > rows) {
            rows = data[i].total
        }
    }

    out.push(<Header key={0} data={data.map(d =>
        ({id: d.id, order: d.order, parallel: d.parallel, total: d.impls.length})
    )} firstRow={true}/>)

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < data.length; j++) {
            let d = data[j].impls[i]
            if (i === 0 && d === undefined) {
                d = {empty_overlay: true}
            }
            row.push(d)
        }

        out.push(<Row key={i + 1} data={row} firstRow={i === 0} lastRow={i === rows - 1} infoOpened={infoOpened}/>)
    }

    return (<div className='table stages'>{out}</div>);
}

export default StagesTable