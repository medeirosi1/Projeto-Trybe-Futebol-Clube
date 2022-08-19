import { Router } from 'express';
import Auth from '../services/auth.service';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchController = new MatchController(new MatchService(), new Auth());

const matchRouter = Router();

matchRouter.patch('/:id/finish', (req, res) => matchController.updatedMatch(req, res));
matchRouter.get(
  '/',
  (req, res) => matchController.getByQueryAndAll(req, res),
//   (req, res) => matchController.list(req, res),
);
matchRouter.post('/', (req, res) => matchController.create(req, res));

export default matchRouter;
