"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = __importDefault(require("../controllers/company.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// POST
router.post('/addCompany', auth_middleware_1.authenticateToken, company_controller_1.default.createCompany); // Swagger à faire + Ajouter protection si élements manquants + Protection si nom déjà utilisé
// GET
router.get('/getCompanies', auth_middleware_1.authenticateToken, company_controller_1.default.getCompanies); // Swagger à faire + Perfectionner la gestion d'erreur
router.get('/getCompany/:param', auth_middleware_1.authenticateToken, company_controller_1.default.getCompany); // Swagger à faire
router.get('/getCompanyBasicInfo/:param', auth_middleware_1.authenticateToken, company_controller_1.default.getCompanyBasicInfo); // Swagger à faire
// PUT
router.put('/updateCompany/:param', auth_middleware_1.authenticateToken, company_controller_1.default.updateCompany); // Swagger à faire + surement à modifier
// DELETE
router.delete('/deleteCompany/:id', auth_middleware_1.authenticateToken, company_controller_1.default.deleteCompany); // Swagger à faire 
exports.default = router;
