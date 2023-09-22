interface ReaderBioInterface {
  id: string;
  bio: string;
  specialities: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export default ReaderBioInterface;
