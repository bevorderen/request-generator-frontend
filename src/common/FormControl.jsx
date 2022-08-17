import {Field} from "redux-form";

const FormControl = ({meta: {touched, error, asyncValidating}, children}) => {
    const hasError = touched && error
    return (<div className="form-control">
        <div>
            {children}
        </div>
        {asyncValidating && <p>Async validating</p>}
        {hasError && <span className="error">{error}</span>}
    </div>)
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps}  />
    </FormControl>
}

export const Input = (props) => {
    const {input, meta, label, ...restProps} = props
    return <FormControl {...props}>
        <label>{label}</label>
        <input {...input} {...restProps} />
    </FormControl>
}

export function createField(name, placeholder, validators, component, label = "", props = {}, text = '',) {
    return <div>
        <Field placeholder={placeholder} validate={validators} name={name} component={component} {...props}
               label={label}/>{text}
    </div>
}