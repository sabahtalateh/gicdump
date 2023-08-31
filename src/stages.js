import {stageImpls, stages} from "./index";

const stageTable = (filter) => {
    return stages.map(s => {
        filter = filter.toLowerCase()
        return {
            id: s.id,
            order: s.order,
            parallel: s.parallel,
            impls: stageImpls[s.id].filter(i => {
                const type = i.type.toLowerCase()
                const id = i.id.toLowerCase()
                return type.includes(filter) || id.includes(filter)
            }),
            total: stageImpls[s.id].length,
        }
    })
}

export {stageTable}
