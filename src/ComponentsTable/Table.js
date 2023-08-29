import {Row, Total} from './Row'
import Pluralize from "pluralize";

const findSelected = (components, dependencies) => {
    const sel = components.find(c => c.selected)
    if (sel !== undefined) {
        let out = `${Pluralize('Dependency', dependencies)} of ${sel.type}`
        if (sel.id !== '') {
            out = `${out}@${sel.id}`
        }
        return out
    }
    return ''
}

function ComponentsTable({data, rows}) {
    let out = []

    let totals = []
    for (let i = 0; i < data.length; i++) {
        totals.push({
            path: (i === 0) ? `Application ${Pluralize('Component', data[i].length)}` : findSelected(data[i - 1], data[i].length),
            total: data[i].length,
        })
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
            out.push(<Total key={`total-${i}`} data={totals}/>)
        }
        out.push(<Row key={i} data={row} firstRow={i === 0} lastRow={i === rows - 1}/>)
    }

    return (<div className='table'>{out}</div>);
}

export default ComponentsTable
