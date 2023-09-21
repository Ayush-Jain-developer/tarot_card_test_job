interface ReaderBioInterface {
  id: string;
  bio: Text;
  specialities: Array<string>;
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export default ReaderBioInterface;
