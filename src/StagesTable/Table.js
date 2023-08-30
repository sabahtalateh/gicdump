import {Header, Row} from './Row'

function StagesTable({data}) {
    let out = []

    // let totals = []
    // for (let i = 0; i < data.length; i++) {
    //     totals.push({
    //         path: (i === 0) ? `Application ${Pluralize('Component', data[i].length)}` : findSelected(data[i - 1], data[i].length),
    //         total: data[i].length,
    //     })
    // }

    let rows = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].impls.length > rows) {
            rows = data[i].impls.length
        }
    }

    out.push(<Header key={0} data={data.map(d => ({id: d.id, order: d.order, parallel: d.parallel}))} firstRow={true}/>)

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < data.length; j++) {
            let d = data[j].impls[i]
            if (i === 0 && d === undefined) {
                d = {empty_overlay: true}
            }
            row.push(d)
        }

        out.push(<Row key={i + 1} data={row} firstRow={i === 0} lastRow={i === rows - 1}/>)
    }

    return (<div className='table stages'>{out}</div>);
}

export default StagesTable