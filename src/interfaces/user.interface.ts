interface UserInterface {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  role: string;
  stripeCusId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export default UserInterface;
