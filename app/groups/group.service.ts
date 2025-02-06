import { Group, IGroup } from './group.model';
import { CreateGroupDTO, UpdateGroupDTO } from './group.dto';
import { Employee } from '../employees/employee.model';
import { sendEmail } from '../common/services/email.service';

export class GroupService {
    /**
     * Creates a new group with the provided data.
     * 
     * @param {CreateGroupDTO} data - The data required to create a new group.
     * @returns {Promise<IGroup>} The newly created group.
     * @throws {Error} If there is an error during group creation.
     */
    async createGroup(data: CreateGroupDTO): Promise<IGroup> {
        const group = new Group(data);
        return group.save();
    }

    /**
     * Updates a group with the provided data.
     * 
     * @param {string} id - The ID of the group to update.
     * @param {UpdateGroupDTO} data - The data to update the group with.
     * @returns {Promise<IGroup | null>} The updated group if found, or null if not found.
     * @throws {Error} If there is an error during update.
     */
    async updateGroup(id: string, data: UpdateGroupDTO): Promise<IGroup | null> {
        return Group.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Retrieves a group by its ID.
     * 
     * @param {string} id - The ID of the group to retrieve.
     * @returns {Promise<IGroup | null>} A promise that resolves with the group object if found, or null if not found.
     */

    async getGroupById(id: string): Promise<IGroup | null> {
        return Group.findById(id).populate('members');
    }

    /**
     * Retrieves all groups.
     * 
     * @returns {Promise<IGroup[]>} A promise that resolves with an array of all group objects.
     */
    async getAllGroups(): Promise<IGroup[]> {
        return Group.find().populate('members');
    }

    /**
     * Removes a member from a group.
     * 
     * @param {string} groupId - The ID of the group to remove the member from.
     * @param {string} memberId - The ID of the member to remove.
     * @returns {Promise<IGroup | null>} A promise that resolves with the updated group object if found, or null if not found.
     * @throws {Error} If there is an error during removal.
     */
    async removeMember(groupId: string, memberId: string): Promise<IGroup | null> {
        return Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: memberId } }, 
            { new: true }
        ).populate('members'); 
    }

    /**
     * Adds members to a group.
     * 
     * @param {string} groupId - The ID of the group to which members are being added.
     * @param {string[]} memberIds - An array of member IDs to add to the group.
     * @returns {Promise<IGroup | null>} A promise that resolves with the updated group object if found, or null if not found.
     * @throws {Error} If there is an error during the addition of members.
     */

    async addMembers(groupId: string, memberIds: string[]): Promise<IGroup | null> {
        try {
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                { $addToSet: { members: { $each: memberIds } } },
                { new: true } 
            ).populate('members'); 

            return updatedGroup; 
        } catch (error) {
            throw new Error('Error adding members to the group'); 
        }
    }


    /**
     * Deletes a group by its ID.
     * 
     * @param {string} id - The ID of the group to delete.
     * @returns {Promise<IGroup | null>} A promise that resolves with the deleted group object if found, or null if not found.
     * @throws {Error} If there is an error during deletion.
     */
    async deleteGroup(id: string): Promise<IGroup | null> {
        return Group.findByIdAndDelete(id);
    }

    /**
     * Sends a message to all members of a group.
     * 
     * @param {string} groupId - The ID of the group to which the message is being sent.
     * @param {string} subject - The subject of the message.
     * @param {string} message - The message to be sent.
     * 
     * @throws {Error} If the group is not found.
     */
    async sendMessageToGroup(groupId: string, subject: string, message: string): Promise<void> {
        const group = await Group.findById(groupId).populate('members');
        if (!group) throw new Error('Group not found');

        
        const memberEmails = await Promise.all(
            group.members.map(async member => {
                const employee = await Employee.findById(member);
                return employee?.email;
            })
        );

        
        await Promise.all(memberEmails.map(email => {
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: subject,
                text: message,
            };
            return sendEmail(mailOptions); 
        }));
    }
}
