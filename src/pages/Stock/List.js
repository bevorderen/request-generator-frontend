import {api} from "../../utils/api";
import React, {useCallback, useEffect, useState} from "react";
import classes from "./List.module.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {stockActions} from "../../store";
import classNames from 'classnames';

export const StockList = () => {
    const dispatch = useDispatch();

    const [stocks, setStocks] = useState([])
    const loadStocks = useCallback(async () => {
        const response = await api.getStocks();
        setStocks(response)
        dispatch(stockActions.setStocks(response));
    }, [dispatch])

    useEffect(() => {
        loadStocks();
    }, [loadStocks])

    return <main>
        <section><h1>Stocks</h1>
            {stocks.map((stock) => {
                return <div key={stock.id} className={classes.card}>
                    <div>
                        {stock.title}
                    </div>
                    <div>
                        {stock.description}
                    </div>
                    <div>
                        {stock.total_price} ₽
                    </div>
                    <Link
                        className={classNames(classes.btnStock, 'btn')} to={`/stocks/${stock.id}`}>
                        order
                    </Link>
                </div>
            })}
        </section>
    </main>
}