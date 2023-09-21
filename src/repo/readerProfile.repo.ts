import { models } from "@database/models";
import { ReaderBioInterface } from "@interfaces";

class ReaderBioRepo {
  static async createReaderBio(
    data: Omit<ReaderBioInterface, "bio" | "specialities" | "availability">,
  ) {
    return models.readerBio.create(data);
  }

  static async findReaderBioById(id: string) {
    return models.readerBio.findByPk(id);
  }

  static async updateReaderProfile(data: ReaderBioInterface) {
    return models.readerBio.update(
      {
        bio: data.bio,
        specialities: data.specialities,
        avalability: data.availability,
      },
      {
        where: {
          id: data.id,
        },
        returning: true,
      },
    );
  }
}

export default ReaderBioRepo;
