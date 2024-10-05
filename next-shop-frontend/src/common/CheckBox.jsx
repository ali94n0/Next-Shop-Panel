

function CheckBox({label,onChange,checked,...props}) {
    return (
        <div className='flex items-center gap-x-2 text-xs md:text-sm text-secondary-300 font-light py-1'>
            <input className="form-checkbox cursor-pointer rounded-md border border-secondary-50/70 text-primary-600 focus:border-primary-600 !ring-0 !ring-offset-0" type='checkbox' name={props.name} id={props.id} value={props.id} onChange={onChange} checked={checked} />
            <label htmlFor={props.id} className='cursor-pointer'>{label}</label>
            
        </div>
    );
}

export default CheckBox;