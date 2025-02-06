import { Request, Response } from 'express';
import { GroupService } from './group.service';
import { CreateGroupDTO, UpdateGroupDTO } from './group.dto';

export class GroupController {
    private groupService = new GroupService();

    /**
     * Creates a new group with the provided data.
     * 
     * @param {Request} req - The Express request object containing the group data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if there is an error during creation.
     */

    async createGroup(req: Request, res: Response): Promise<void> {
        const data: CreateGroupDTO = req.body;
        const group = await this.groupService.createGroup(data);
        res.status(201).json(group);
    }

    /**
     * Updates a group with the provided data.
     * 
     * @param {Request} req - The Express request object containing the group ID in the parameters and the updated data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the group is not found, or a 400 status code if there is an error during updating.
     */
    async updateGroup(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const data: UpdateGroupDTO = req.body;
        const group = await this.groupService.updateGroup(id, data);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    /**
     * Retrieves a group by their ID.
     * 
     * @param {Request} req - The Express request object containing the group ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the group is not found.
     */
    async getGroupById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const group = await this.groupService.getGroupById(id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

/**
 * Retrieves all groups.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object used to send the response.
 * 
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * 
 * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
 */

    async getAllGroups(req: Request, res: Response): Promise<void> {
        const groups = await this.groupService.getAllGroups();
        res.json(groups);
    }



    /**
     * Removes a member from a group.
     * 
     * @param {Request} req - The Express request object containing the group ID and member ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the group is not found, or a 500 status code if there is an error during removal.
     */
    async removeMemberFromGroup(req: Request, res: Response): Promise<void> {
        const { groupId, memberId } = req.params;
    
        try {
            const updatedGroup = await this.groupService.removeMember(groupId, memberId);
            if (!updatedGroup) {
                 res.status(404).json({ message: 'Group not found' });
                 return
            }
            res.status(200).json(updatedGroup);
            return;
        } catch (error) {
             res.status(500).json({ message: 'Error removing member from group', error });
             return;
        }
    };

    /**
     * Adds members to a group.
     * 
     * @param {Request} req - The Express request object containing the group ID in the parameters and the member IDs in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if no member IDs are provided, a 404 status code if the group is not found or no members are added, or a 500 status code if there is an error during addition.
     */
    async addMembersToGroup(req: Request, res: Response): Promise<void> {
        const { groupId } = req.params; 
        const { memberIds } = req.body; 
        console.log(memberIds);
        if (!memberIds || memberIds.length === 0) {
            res.status(400).json({ message: 'No member IDs provided' });
            return;
        }

        try {
            const updatedGroup = await this.groupService.addMembers(groupId, memberIds);
            if (!updatedGroup) {
                res.status(404).json({ message: 'Group not found or no members added' });
                return;
            }
            res.status(200).json(updatedGroup);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Error adding members to group', error });
            return;
        }
    }

    /**
     * Deletes a group by its ID.
     * 
     * @param {Request} req - The Express request object containing the group ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the group is not found.
     */
    async deleteGroup(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const group = await this.groupService.deleteGroup(id);
        if (group) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    /**
     * Sends a message to all members of a group.
     * 
     * @param {Request} req - The Express request object containing the group ID, subject, and message in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if there is an error during message sending.
     */
    async sendMessage(req: Request, res: Response): Promise<void> {
        const { groupId, subject, message } = req.body;
        try {
            await this.groupService.sendMessageToGroup(groupId, subject, message);
            res.status(200).json({ message: 'Message sent to group members' });
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }
}
