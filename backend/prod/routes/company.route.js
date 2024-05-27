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
router.post(`/addCompany`, auth_middleware_1.authenticateToken, company_controller_1.default.createCompany); // Ajouter protection si élements manquants
// GET
router.get(`/getCompanies`, auth_middleware_1.authenticateToken, company_controller_1.default.getCompanies); // Perfectionner la gestion d'erreur/les filtres
router.get(`/getCompany/:param`, auth_middleware_1.authenticateToken, company_controller_1.default.getCompany);
router.get(`/getCompanyBasicInfo/:param`, auth_middleware_1.authenticateToken, company_controller_1.default.getCompanyBasicInfo);
// PUT
router.put(`/updateCompany/:param`, auth_middleware_1.authenticateToken, company_controller_1.default.updateCompany); // Surement à modifier
// DELETE
router.delete(`/deleteCompany/:id`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`superAdmin`), company_controller_1.default.deleteCompany);
exports.default = router;
