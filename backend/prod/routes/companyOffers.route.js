"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyOffers_controller_1 = __importDefault(require("../controllers/companyOffers.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// PSOT
router.post('/addPost', auth_middleware_1.authenticateToken, companyOffers_controller_1.default.createOffer); // Swagger à faire + Ajouter protection si éléments manquants
// GET
router.get('/getPosts', companyOffers_controller_1.default.getOffers); // Swagger à faire 
router.get('/getPostById/:id', companyOffers_controller_1.default.getOfferById); // Swagger à faire 
router.get('/getPostWithCompanyInfo/:id', companyOffers_controller_1.default.getOfferWithCompanyInfo); // Swagger à faire
// PUT
router.put('/updatePost/:id', companyOffers_controller_1.default.updateOffer); // Swagger à faire 
// DELETE
router.delete('/deletePost/:id', companyOffers_controller_1.default.deleteOffer); // Swagger à faire 
exports.default = router;
