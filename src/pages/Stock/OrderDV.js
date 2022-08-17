import {reduxForm} from "redux-form"
import {required} from "../../utils/validators"
import {createField, Input} from "../../common/FormControl"

const OrderDVForm = ({handleSubmit, error, message, stock}) => {
    return <form onSubmit={handleSubmit}>
        <h2>{stock.title}</h2>
        {createField('commonName', 'commonName', [required], Input, "commonName")}
        {createField('countryName', 'countryName', [required], Input, "countryName")}
        {createField('subjectAltName', 'separated by comma', [required], Input, "subjectAltName")}
        {createField('extKeyUsage', 'separated by comma', [required], Input,"extKeyUsage"  )}

        {error && <div className="error">{error}</div>}

        <div>
            <button>Order!</button>
        </div>
    </form>
}

export const OrderDVReduxForm = reduxForm({form: 'OrderDV'})(OrderDVForm)

