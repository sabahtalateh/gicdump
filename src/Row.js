import './Row.css'

import { Cell, Empty } from './Cell'

function Row({ row, data, borders }) {
    var topBorder = (row == 0) ? <div className='top-border'></div> : <></>
    return <div className="row">
        {topBorder}
        {data.map((c, idx) => {
            if (c !== undefined && !c.empty_overlay) {
                return <Cell key={idx} col={idx} data={c} selected={c.selected} border={borders} />
            } else {
                const overlay = c !== undefined && c.empty_overlay
                return <Empty key={idx} border={borders} overlay={overlay} />
            }
        })}
    </div>
}

export default Row
