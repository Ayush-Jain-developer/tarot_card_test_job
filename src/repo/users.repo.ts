import { models } from "@database/models";
import { UserInterface } from "@interfaces";

export class UserRepo {
    static async createUser (data:Omit<UserInterface,'id'|'profilePicture'>) {
        return models.user.create(data)
    }

    static async findUser (email:string){
        return models.user.findOne({
            where: {
                email: email
            }
        })
    }
}