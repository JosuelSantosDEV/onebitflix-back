import { User } from "../models";
import { IUserCreationAttributes } from "../models/User";

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email
            }
        });
        return user;
    },
    create: async (attributes: IUserCreationAttributes) => {
        const user = await User.create(attributes);
        return user;
    }
};