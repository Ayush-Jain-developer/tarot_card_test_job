interface RatingInterface {
  id?: string;
  senderId: string;
  receiverId: string;
  rating: number;
  review?: string;
}

export default RatingInterface;
