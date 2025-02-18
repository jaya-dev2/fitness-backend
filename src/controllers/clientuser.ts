import { Request, Response } from "express";
import { checkIfClientExistUnderCoach, deleteClientUser, findAndUpdateClientUser, getNotificationByUserId, getUserByClientEmail, onboardingUser, updateClientUserStatus } from "../db";
import { addClientToCoach } from '../db';
import { AuthUser } from "../constants";

const ClientUserController = {
    createClientUser: async (req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const { firebaseFCM, notification_settings } = req.body;
        const user = await getUserByClientEmail(authUser.email)
    try {
        if(user && user.inviteAccepted && firebaseFCM === user.firebaseFCM && notification_settings === user.notificationSettings) {
            const notifications = await getNotificationByUserId(user._id);
            return res.send({user, notifications: notifications});
        }
        else if(user){
            const user = await findAndUpdateClientUser(
                authUser.email,
                authUser.user_id,
                authUser.name,
                authUser.picture,
                true,
                firebaseFCM,
                notification_settings
            ); 
            const notifications = await getNotificationByUserId(user._id);
            return res.send({user, notifications: notifications});
            }
        else {
            return res.status(403).send('Unauthorized');
        }
    } 
    catch (error) {
        console.error(`client user unable to logged in.`, error);
        return res.status(403).json({ error: `client user unable to logged in.`});
}
    },

    addClient: async (req: Request, res: Response): Promise<any> => {
        const { coachId, clientEmail: email, startDate, endDate, duration } = req.body;
        try {
          const clientUserDetails = await addClientToCoach(coachId, email, startDate, endDate, duration);
          return res.send(clientUserDetails);
        } catch (error) {
          console.error('Error adding client to coach:', error);
          return res.status(500).json({ error: 'Internal server error.' });
        }   
    },

    checkIfClientExistUnderCoach: async (req: Request, res: Response): Promise<any> => {
        const { coachId, clientEmail } = req.body;

        const user = await checkIfClientExistUnderCoach(clientEmail, coachId);
        return res.send(user); 
    },

    deleteClientUser: async (req: Request, res: Response): Promise<any> => {
        const { clientId, coachId } = req.body;
        const deletedClientUser = await deleteClientUser(clientId, coachId);
        return res.send( deletedClientUser);

    },

    archiveClientUserStatus: async (req: Request, res: Response): Promise<any> => {
        const { clientId } = req.body;
        const archivedClientUser = await updateClientUserStatus(clientId, 'archive');
        return res.send( archivedClientUser);

    },

    activateClientUser: async (req: Request, res: Response): Promise<any> => {
        const { clientId } = req.body;
        const activateClientUser = await updateClientUserStatus(clientId, 'active');
        return res.send( activateClientUser);

    },

    OnboardingUser: async (req: Request, res: Response): Promise<any> => {
        const { _id, onboarding} = req.body
        const onboardedUser = await onboardingUser(
            _id,
            onboarding
        ); 
        return res.send(onboardedUser);
    },  

    

};
export default ClientUserController;