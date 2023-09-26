type Ratings = 1 | 2 | 3 | 4 | 5;

interface RatingInterface {
  id?: string;
  senderId: string;
  receiverId: string;
  rating: Ratings;
  review?: string;
}

export default RatingInterface;
