const express = require('express');
const router = express.Router();
const path = require('path');


const { 
    dashboard,
    statewiseAverageSalary,
    statewiseGenderAverageSalary,
    addHouse,
    addMember,
    getState,
    getDistrict,
    getBlock,
    getVillage,
    getHouse
 } = require('../../controllers/v1/survey.controller');

 const { 
    dashboardMongo,
    statewiseAverageSalaryMongo,
    statewiseGenderAverageSalaryMongo,
    addHouseMongo,
    addMemberMongo,
    getStateMongo,
    getDistrictMongo,
    getBlockMongo,
    getVillageMongo,
    getHouseMongo
 } = require('../../controllers/v1/survey.mongo.controller');

/*************************************** MySQL Query Routes ******************************/
router.get('/dashboard', dashboard);
router.get('/statewise-average-salary', statewiseAverageSalary);
router.get('/statewise-gender-average-salary', statewiseGenderAverageSalary);

router.get('/state', getState);
router.get('/district/:stateId',getDistrict );
router.get('/block/:districtId', getBlock);
router.get('/village/:blockId', getVillage);
router.get('/house/:villageId',getHouse );

router.post('/house/:villageId', addHouse);
router.post('/member/:houseId',addMember);

/*************************************** MongoDB Query Routes ******************************/

router.get('/dashboard-mongo', dashboardMongo);
router.get('/statewise-average-salary-mongo', statewiseAverageSalaryMongo);
router.get('/statewise-gender-average-salary-mongo', statewiseGenderAverageSalaryMongo);

router.get('/state-mongo', getStateMongo);
router.get('/district-mongo/:stateId',getDistrictMongo );
router.get('/block-mongo/:districtId', getBlockMongo);
router.get('/village-mongo/:blockId', getVillageMongo);
router.get('/house-mongo/:villageId',getHouseMongo );

router.post('/house-mongo/:villageId', addHouseMongo);
router.post('/member-mongo/:houseId',addMemberMongo);


router.get('/', dashboard);
module.exports = router;