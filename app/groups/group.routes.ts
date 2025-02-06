import { Router } from 'express';
import { GroupController } from './group.controller';
import { validate } from '../common/middlewares/validate.middleware';
import { CreateGroupDTO, UpdateGroupDTO } from './group.dto';
import { isAdminMiddleware } from '../common/middlewares/isAdmin.middleware';

const router = Router();
const groupController = new GroupController();

router.post('/', validate, isAdminMiddleware,groupController.createGroup.bind(groupController));
router.put('/:id', validate,isAdminMiddleware, groupController.updateGroup.bind(groupController));
router.get('/:id',isAdminMiddleware, groupController.getGroupById.bind(groupController));
router.get('/',isAdminMiddleware, groupController.getAllGroups.bind(groupController));
router.post('/:groupId/members',isAdminMiddleware, groupController.addMembersToGroup.bind(groupController));
router.delete('/:groupId/members/:memberId',isAdminMiddleware, groupController.removeMemberFromGroup.bind(groupController));
router.delete('/:id',isAdminMiddleware, groupController.deleteGroup.bind(groupController));
router.post('/send-message',isAdminMiddleware, groupController.sendMessage.bind(groupController)); 

export default router;
