import { Router } from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController(new TeamService());

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.list(req, res));
teamRouter.get('/:id', (req, res) => teamController.listById(req, res));

export default teamRouter;
