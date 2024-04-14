import express from 'express';
import {
  createZone ,
  deleteZone,
  listHostZone,
} from '../controllers/controllerDomain.js';
import {requireLogin} from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/all',requireLogin, listHostZone);
router.post('/create',requireLogin, createZone );
router.post('/delete',requireLogin, deleteZone);

export default router;
