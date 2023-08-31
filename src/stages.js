import {stageImpls, stages} from './index'

const stageTable = (filter) => {
    filter = filter.toLowerCase()
    return stages.map(s => {
        let impls = []
        let total = 0
        if (stageImpls[s.id] !== undefined) {
            impls = stageImpls[s.id].filter(i => {
                const type = i.type.toLowerCase()
                const id = i.id.toLowerCase()
                return type.includes(filter) || id.includes(filter)
            })
            total = impls.length
        }
        return {id: s.id, order: s.order, parallel: s.parallel, impls: impls, total: total}
    })
}

export {stageTable}
