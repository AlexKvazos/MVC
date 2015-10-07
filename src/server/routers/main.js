/**
 * Main Router
 */

import express      from 'express';
import controllers  from '../controllers';

let router = express.Router();


router.get('/', controllers.main.home);


export default router;
