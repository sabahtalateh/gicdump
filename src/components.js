import {stageImpls, stages} from './index'

const filterComponents = ({components, search, selected}) => {
    const filtered = components.filter((c) => {
        if (selected !== undefined && c.type === selected.type && c.id === selected.id) {
            return true
        }

        search = search.toLowerCase()
        const type = c.type.toLowerCase()
        const id = c.id.toLowerCase()

        return type.includes(search) || id.includes(search)
    })

    return filtered.map(c => ({
        type: c.type,
        id: c.id,
        order: c.order,
        selected: selected !== undefined && c.type === selected.type && c.id === selected.id,
    }))
}

const componentStages = ({type, id}) => {
    let stgKeys = []
    for (const [key, value] of Object.entries(stageImpls)) {
        if (undefined !== value.find(i => i.type === type && i.id === id)) {
            stgKeys.push(key)
        }
    }

    return stgKeys.map(k => stages.find(s => s.id === k))
}

export {filterComponents, componentStages}
