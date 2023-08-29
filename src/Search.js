import EraseIcon from './Icons/Erase'

function Search({value, setValue}) {
    const selectedClass = (value !== '') ? 'selected' : ''
    return <div className={`section search ${selectedClass}`}>
        <div className='icon' onClick={(_) => {setValue('')}}><EraseIcon/></div>
        <input className='search-input' type='text' value={value} onChange={(e) => (setValue(e.target.value))}/>
    </div>
}

export default Search
