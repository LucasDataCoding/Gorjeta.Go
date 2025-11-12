export interface IExchangeRateApiItemResponse {
  ask: '6.13497'
  bid: '6.11995'
  code: 'EUR'
  codein: 'BRL'
  create_date: '2025-11-11 09:26:03'
  high: '6.14628'
  low: '6.10501'
  name: 'Euro/Real Brasileiro'
  pctChange: '0.122387'
  timestamp: '1762863963'
  varBid: '0.007481'
}

export interface IExchangeRateResponse {
  [key: string]: IExchangeRateApiItemResponse
}
