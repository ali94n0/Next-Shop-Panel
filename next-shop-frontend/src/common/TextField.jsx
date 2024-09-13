

function TextField({formik,label,name,required=false,...props}) {
    return (
        <div className="flex flex-col gap-y-1">
            <label htmlFor={props.id} className="block text-xs sm:text-md text-secondary-600">{label}&nbsp;:&nbsp;{props.required && <span className="text-error text-xxs sm:text-sm">*</span>}</label>
            <input type={props.type} id={props.id} name={name} {...formik.getFieldProps(name)} className="textField__style" />
            {formik.errors[name] && formik.touched[name] && <span className="block text-xxxs sm:text-xxs text-error">{formik.errors[name]}</span>}
        </div>
    );
}

export default TextField;