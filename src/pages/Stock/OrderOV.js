import {reduxForm} from "redux-form"
import {required} from "../../utils/validators"
import {createField, Input} from "../../common/FormControl"

const OrderOVForm = ({handleSubmit, error, message, stock}) => {
    return <form onSubmit={handleSubmit}>
        <h2>{stock.title}</h2>
        {createField('commonName', 'commonName', [required], Input, "commonName")}
        {createField('organizationName', 'organizationName', [required], Input, "organizationName")}
        {createField('countryName', 'countryName', [required], Input, "countryName")}

        {createField('stateOrProvinceName', 'stateOrProvinceName', [required], Input, "stateOrProvinceName")}
        {createField('localityName', 'localityName', [required], Input, "localityName")}
        {createField('streetAddress', 'streetAddress', [required], Input, "streetAddress")}

        {createField('subjectAltName', 'separated by comma', [required], Input, "subjectAltName")}
        {createField('extKeyUsage', 'separated by comma', [required], Input, "extKeyUsage")}
        {createField('keyUsage', 'separated by comma', [required], Input, "keyUsage")}

        {error && <div className="error">{error}</div>}

        <div>
            <button>Order!</button>
        </div>
    </form>
}

export const OrderOVReduxForm = reduxForm({form: 'OrderOV'})(OrderOVForm)

