const connection = require('../connection/db_connection')
const Person = require("../models/person")
// viết câu sql.
let instance = null;

// prase raw t db -> model.
class Db_service  {
    static getDbServiceInstance() {
        return instance ? instance : new Db_service();
    }
    async getPost()  {
        const response = 'nguyenasfs'
        return response;
    }
    async getSearch(codes)  {
        try {
            const response = await new Promise((resolve, reject) => {
                console.log('codes:'+codes)
                const query = 'SELECT * FROM license_plates Where codes =?;';
                connection.query(query,[codes], (err, results) => {
                    if (err) reject(new Error(err.message));
                    console.log('codes'+codes)
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getSearchDetail(codes)  {
        try {
            const response = await new Promise((resolve, reject) => {
                const  query2='SELECT license_plates_detail.id, license_plates_detail.codes,license_plates.information_province,license_plates.vehicle_type,license_plates_detail.serial,license_plates_detail.information_districtcol\n' +
                    'FROM  search_license_plate.license_plates_detail \n' +
                    'INNER JOIN  search_license_plate.license_plates\n' +
                    'ON  license_plates_detail.codes= license_plates.codes where serial like CONCAT( ? , "%") ; '
                console.log('serial:'+codes)
                connection.query(query2,[codes], (err, results) => {
                    if (err) reject(new Error(err.message));
                    console.log('serial:'+results)
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = Db_service;



