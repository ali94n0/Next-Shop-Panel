

function RadioInput({label,onChange,checked,...props}) {
    return (
        <div className='flex items-center gap-x-2 text-xs md:text-sm text-secondary-300 font-light py-1'>
            <input className="form-radio cursor-pointer rounded-md border border-secondary-50/70 text-primary-600 focus:border-primary-600 !ring-0 !ring-offset-0" type='radio' name={props.name} id={props.id} value={props.value} onChange={onChange} checked={checked} />
            <label htmlFor={props.id} className='cursor-pointer'>{label}</label>
            
        </div>
    );
}

export default RadioInput;