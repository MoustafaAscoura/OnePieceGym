import {User} from './models'

export const fetchTrainees = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Trainees data")

    }
}