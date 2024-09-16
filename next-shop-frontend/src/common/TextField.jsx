

function TextField({formik,label,name,required=false,...props}) {
    return (
        <div className="flex flex-col gap-y-1 relative">
            <label htmlFor={props.id} className="bg-secondary-0 text-xs sm:text-sm text-secondary-600 font-light absolute -top-3 right-2 px-1 rounded-md">{label}&nbsp;{props.required && <span className="text-error text-xxs sm:text-sm">*</span>}</label>
            <input type={props.type} id={props.id} name={name} {...formik.getFieldProps(name)} className="textField__style dir__ltr" />
            {formik.errors[name] && formik.touched[name] && <span className="block text-xxxs sm:text-xxs text-error">{formik.errors[name]}</span>}
        </div>
    );
}

export default TextField;