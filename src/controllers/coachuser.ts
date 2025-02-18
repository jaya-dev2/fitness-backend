import { Request, Response } from "express";
import { createCoachUser, deleteCoachUser, getClientsForCoach, getNotificationByUserId, getUserByCoachEmail, updateCoachUserFirebaseFCM } from "../db";
import { AuthUser } from "../constants";


const CoachUserController = {
    createCoachUser: async (req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const { firebaseFCM } = req.body; 
        const user = await getUserByCoachEmail(authUser.email);
    
        try {
            let clientUserDetails: any[] = []; // Adjust the type
    
            if (!user) {
                const newCoachUser: any = await createCoachUser(
                    authUser.email,
                    authUser.user_id,
                    authUser.name,
                    authUser.picture,
                    firebaseFCM   
                ); 
                return res.json({ coachId: newCoachUser._id, clients: [], notifications: [] });
            } else {
                if (firebaseFCM && firebaseFCM !== user.firebaseFCM) {
                    await updateCoachUserFirebaseFCM(authUser.email, authUser.name, authUser.picture, firebaseFCM);
                }
    
                const userDetails = await getClientsForCoach(user._id);
                clientUserDetails = userDetails.clients;
                const notifications = await getNotificationByUserId(user._id);
    
                return res.json({ coachId: user._id, clients: clientUserDetails, notifications });
            }
        } catch (error) {
            console.error(`Coach user unable to log in.`, error);
            return res.status(403).json({ error: `Coach user unable to log in.`});
        }
    },
       

    deleteCoachUser: async (req: Request, res: Response): Promise<any> => {
        const { _id } = req.body;
        const deletedCoachUser = await deleteCoachUser(_id);
        return res.send( deletedCoachUser);
    },
};
export default CoachUserController;