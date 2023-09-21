interface ReaderBioInterface {
  id: string;
  bio: string;
  specialities: Array<string>;
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export default ReaderBioInterface;
