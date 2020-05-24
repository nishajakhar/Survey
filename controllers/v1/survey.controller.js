const { sendResponse } = require('../../config/response');
const { connection } = require('../../config/dbConnection');
const { APP_URL } = require('../../config/constants')
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

exports.dashboard = async (req, res) => {
    let renderParams = {
        layout: 'layout',
        title: 'Dashboard',
        constants: APP_URL,
    }
    try {
        let sql1 = `SELECT count(*) AS count FROM state`;
        let sql2 = `SELECT count(*) AS count FROM district`;
        let sql3 = `SELECT count(*) AS count FROM block`;
        let sql4 = `SELECT count(*) AS count FROM village`;
        let sql5 = `SELECT count(*) AS count FROM house`;
        let sql6 = `SELECT count(*) AS count FROM member`;
        const stateQuery = await query(sql1);
        const districtQuery = await query(sql2);
        const blockQuery = await query(sql3);
        const villageQuery = await query(sql4);
        const houseQuery = await query(sql5);
        const memberQuery = await query(sql6);

        const final = await Promise.all([stateQuery, districtQuery, blockQuery, villageQuery, houseQuery, memberQuery]);
        if (final) {
            const data = { State: stateQuery[0].count, District: districtQuery[0].count, Block: blockQuery[0].count, Village: villageQuery[0].count, House: houseQuery[0].count, Member: memberQuery[0].count }
            renderParams.data = data;
            // return sendResponse(res, 200, 'Dashboard displayed successfully', {State : stateQuery[0].count, District : districtQuery[0].count, Block : blockQuery[0].count, Village : villageQuery[0].count, House : houseQuery[0].count, Member : memberQuery[0].count});
            return res.render('dashboard', renderParams);
        }
        else return res.render('dashboard', {});

    } catch (err) {
        console.log("Error Occurred", err);
        return res.render('dashboard', {});
    }
}
exports.statewiseAverageSalary = async (req, res) => {
    try {
        let sql = `SELECT state.name AS StateName ,AVG(member.salary) as AVGSALARY
                    FROM state 
                    INNER JOIN district 
                        ON state.stateID = district.stateID 
                    INNER JOIN block 
                        ON district.districtID = block.districtID 
                    INNER JOIN village 
                        ON block.blockID = village.blockID 
                    INNER JOIN house 
                        ON village.villageID = house.villageID 
                    INNER JOIN member
                        ON house.houseID = member.houseID
                    GROUP BY StateName`;
        const result = await query(sql);
        if (result) return sendResponse(res, 200, 'Statewise Average salary displayed successfully', result);
        else return sendResponse(res, 500, 'House not added. Error while connecting to database. Please  try again later.');

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.statewiseGenderAverageSalary = async (req, res) => {
    try {
        let sql = `SELECT state.name AS StateName ,member.gender AS GENDER, AVG(member.salary) as AVGSALARY
                    FROM state 
                    INNER JOIN district 
                        ON state.stateID = district.stateID 
                    INNER JOIN block 
                        ON district.districtID = block.districtID 
                    INNER JOIN village 
                        ON block.blockID = village.blockID 
                    INNER JOIN house 
                        ON village.villageID = house.villageID 
                    INNER JOIN member
                        ON house.houseID = member.houseID
                    GROUP BY StateName, member.gender`;
        const result = await query(sql);
        if (result) return sendResponse(res, 200, 'Statewise GenderWise Average salary displayed successfully', result);
        else return sendResponse(res, 500, 'Error while connecting to database. Please  try again later.');

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}

exports.getState = async (req, res) => {
    try {
        let sql = "SELECT * FROM state";
        const result = await query(sql);
        
        return sendResponse(res, 200, 'State displayed successfully', result)

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getDistrict = async (req, res) => {
    try {
        let sql = `SELECT * FROM district WHERE stateID = '${req.params.stateId}'`;
        const result = await query(sql);
       
        return sendResponse(res, 200, 'District displayed successfully', result)

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getBlock = async (req, res) => {
    try {
        let sql = `SELECT * FROM block WHERE districtID = '${req.params.districtId}'`;
        const result = await query(sql);
        return sendResponse(res, 200, 'Blocks displayed successfully', result)

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getVillage = async (req, res) => {
    try {
        let sql = `SELECT * FROM village WHERE blockID = '${req.params.blockId}'`;
        const result = await query(sql);
        return sendResponse(res, 200, 'Villages displayed successfully', result)

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getHouse = async (req, res) => {
    try {
        let sql = `SELECT * FROM house WHERE villageID = '${req.params.villageId}'`;
        const result = await query(sql);
        return sendResponse(res, 200, 'House displayed successfully', result)

    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}

exports.addHouse = async ({ params: { villageId }, body: { houseNumber, headName } }, res) => {
    try {
        let sql = `INSERT INTO house (houseNumber, headName, villageID) VALUES ('${houseNumber}', '${headName}', '${villageId}')`;
        const result = await query(sql);
        if (result) return sendResponse(res, 200, 'New House added successfully', result);
        else return sendResponse(res, 500, 'House not added. Error while connecting to database. Please  try again later.');
    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.addMember = async ({ params: { houseId }, body: { name, age, salary, gender } }, res) => {
    try {
        let sql = `INSERT INTO member (name, age, salary, gender, houseID) VALUES ('${name}', '${age}', '${salary}', '${gender}', '${houseId}')`;
        const result = await query(sql);
        console.log("fghjhjkkjhjk...", result);
        if (result) return sendResponse(res, 200, 'New Member added successfully', result);
        else return sendResponse(res, 500, 'Member not added. Error while connecting to database. Please  try again later.');
    } catch (err) {
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}