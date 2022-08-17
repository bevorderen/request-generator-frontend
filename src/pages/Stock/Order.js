import {api} from "../../utils/api";
import {useParams} from "react-router-dom";
import {OrderDVReduxForm} from "./OrderDV";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {downloadFile} from "../../utils/downloadFile";
import {OrderOVReduxForm} from "./OrderOV";


export const Order = () => {
    const params = useParams();
    const [stock, setStock] = useState({})
    const stockFromStore = useSelector((state) => state.stock.stocks.find((s) => s.id === parseInt(params.stockId)))
    const initialValuesDV = {
        "commonName": "ООО Ромашка",
        "countryName": "RU",
        "subjectAltName": "romaska.ru, ромашка.рф",
        "extKeyUsage": "1.3.6.1.5.5.7.3.1, 1.3.6.1.5.5.7.3.2"
    }
    const initialValuesOV = {
        "commonName": "ООО Ромашка",
        "countryName": "RU",
        "organizationName": "Romashka",
        "subjectAltName": "romaska.ru, ромашка.рф",
        "extKeyUsage": "1.3.6.1.5.5.7.3.1, 1.3.6.1.5.5.7.3.2",
        "stateOrProvinceName": "77 г. Москва",
        "localityName": "г. Москва",
        "streetAddress": "улица Удальцова, дом 85",
        "keyUsage": "digitalSignature, keyEncipherment"
    }

    const handleDVSubmit = async (formData) => {
        try {
            const subject = {
                "commonName": formData.commonName,
                "countryName": formData.countryName,
                "subjectAltName": formData.subjectAltName.split(",").map((part) => part.trim())
            }
            const request = {
                subject: subject,
                extKeyUsage: formData.extKeyUsage.split(",").map((part) => part.trim()),
                stock_id: params.stockId
            }
            const response = await api.creatOrder(request)
            downloadFile(response["key"], "key")
            downloadFile(response["request"], "request")

        } catch (error) {
            console.log(error)
        }
    }

    const handleOVSubmit = async (formData) => {
        try {
            const subject = {
                "commonName": formData.commonName,
                "countryName": formData.countryName,
                "stateOrProvinceName": formData.stateOrProvinceName,
                "localityName": formData.localityName,
                "streetAddress": formData.streetAddress,
                "subjectAltName": formData.subjectAltName.split(",").map((part) => part.trim()),
                "organizationName": formData.organizationName
            }
            const request = {
                subject: subject,
                extKeyUsage: formData.extKeyUsage.split(",").map((part) => part.trim()),
                stock_id: params.stockId,
                keyUsage: formData.keyUsage.split(",").map((part) => part.trim()),
            }
            const response = await api.creatOrder(request)
            downloadFile(response["key"], "key.key")
            downloadFile(response["request"], "request.csr")

        } catch (error) {
            console.log(error)
        }
    }

    const fetchStock = useCallback(async () => {
        if (!stockFromStore) {
            setStock(await api.getStock(params.stockId))
        } else {
            setStock(stockFromStore)
        }
    }, [stockFromStore, params.stockId])

    useEffect(() => {
        fetchStock()
    }, [fetchStock])

    return <main>
        <section>
            {stock.type === "Domain Validation" ?
                <OrderDVReduxForm
                    onSubmit={handleDVSubmit}
                    stock={stock}
                    initialValues={initialValuesDV}
                />
                : <OrderOVReduxForm
                    onSubmit={handleOVSubmit}
                    stock={stock}
                    initialValues={initialValuesOV}
                />
            }
        </section>
    </main>
}