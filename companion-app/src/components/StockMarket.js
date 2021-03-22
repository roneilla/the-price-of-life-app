import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { P } from '../shared/global';
import stockMarketData from './../stockMarketData';

const Container = styled.div`
	width: 100%;
	overflow: auto;
`;

const StockCardContainer = styled.div`
	width: 100%;
	border: #ccc 1px solid;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const MaterialIcons = styled.div`
	font-family: 'Material Icons';
`;

const StockCard = (props, receiveAmount) => {
	const [stockPrice, setStockPrice] = useState(0);
	const previousPriceRef = useRef();

	const MINUTE_MS = 1000; // 5 minutes

	useEffect(() => {
		const interval = setInterval(() => {
			setStockPrice(
				Math.floor(
					Math.random(props.startPrice, props.startPrice + props.priceRange) *
						1000
				)
			);
			console.log('Logs every minute');
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		previousPriceRef.current = stockPrice;
	});

	const previousPrice = previousPriceRef.current;

	let arrow;

	if (stockPrice > previousPrice) {
		arrow = (
			<MaterialIcons style={{ color: '#33B466' }}>arrow_upward</MaterialIcons>
		);
	} else if (stockPrice < previousPrice) {
		arrow = (
			<MaterialIcons style={{ color: '#C64949' }}>arrow_downward</MaterialIcons>
		);
	} else {
		arrow = <MaterialIcons>=</MaterialIcons>;
	}

	return (
		<StockCardContainer>
			<h3>{props.stockTicker}</h3>
			<h3>{props.stockName}</h3>
			<p>{stockPrice}</p>
			<span>{arrow}</span>
		</StockCardContainer>
	);
};

const StockMarket = () => {
	const stocks = stockMarketData.map((stock) => (
		<StockCard
			stockTicker={stock.ticker}
			stockName={stock.stockName}
			currentPrice={stock.startingPrice}
			priceRange={stock.priceRange}
			key={stock.ticker}></StockCard>
	));

	return (
		<Container>
			<h1>Stock Market</h1>
			{stocks}
		</Container>
	);
};

export default StockMarket;