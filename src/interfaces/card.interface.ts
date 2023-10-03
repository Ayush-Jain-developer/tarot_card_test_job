interface CardsInterface {
  id: string;
  stripeCusId: string;
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  amount: number;
  currency?: string;
}

export default CardsInterface;
