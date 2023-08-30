import {stageImpls, stages} from "./index";

const stageTable = () => {
    return stages.map(s => ({
        id: s.id,
        order: s.order,
        parallel: s.parallel,
        impls: stageImpls[s.id],
    }))
}

export {stageTable}
