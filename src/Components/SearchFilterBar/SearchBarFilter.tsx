type Props = {
    q: string,
    status: string,
    sort: string,
    onSearch: (q: string) => void,
    onSort: (sort: string) => void
}

export default function({q, status, sort, onSearch, onSort}: Props){
    return(
        <div className="center-row" style={{marginBottom:12}}>
            <input 
            className="input"
            type="text"
            placeholder="Search Company or role"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            />

            <select className="input" value={sort} onChange={(e) => onSort(e.target.value)}>
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
            </select>
        </div>
    )
}