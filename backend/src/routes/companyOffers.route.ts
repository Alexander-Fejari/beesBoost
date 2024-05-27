import express, { Router } from 'express';
import cOfferController from '../controllers/companyOffers.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();

// PSOT
router.post(`/addPost`, authenticateToken, cOfferController.createOffer); // Ajouter protection si éléments manquants

// GET
router.get(`/getPosts`, authenticateToken, cOfferController.getOffers);

router.get(`/getPostById/:id`, authenticateToken, cOfferController.getOfferById);

router.get(`/getPostWithCompanyInfo/:id`, authenticateToken, cOfferController.getOfferWithCompanyInfo);

// PUT
router.put(`/updatePost/:id`, authenticateToken, cOfferController.updateOffer);

router.put(`/updatePostBody/:id`, authenticateToken, cOfferController.updateOfferBody);

// DELETE
router.delete(`/deletePost/:id`, authenticateToken, authorizeRoles(`superAdmin`), cOfferController.deleteOffer);

export default router;