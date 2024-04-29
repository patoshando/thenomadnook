export default function Perks({selected, onChange}){
    function handleCheckBoxClick(ev){
        const {checked, name} = ev.target;
        if (checked){
        onChange([...selected, name]);
        }else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }
    return(
        <>
        <div className="grid gap-2 grid-col-2 md:grid-cols-3 lg:grid-cols-6">
                            <label  className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckBoxClick} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>
                                <span>WiFi</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheckBoxClick} />
                                <svg className="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                                </svg>
                                <span>Parkování zdarma</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCheckBoxClick} />
                                <svg className="h-8 w-8"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">  
                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />  
                            <polyline points="17 2 12 7 7 2" />
                            </svg>
                                <span>TV</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked={selected.includes('animals')} name="animals" onChange={handleCheckBoxClick} />
                            <svg className="h-8 w-8"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>

                                <span>Zvířata</span>
                            </label>
                            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                <input type="checkbox" checked={selected.includes('priv_en')} name="priv_en" onChange={handleCheckBoxClick} />
                                <svg className="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                                <span>Soukromý vstup</span>
                            </label>
                            
                        </div>
        </>
    );
}