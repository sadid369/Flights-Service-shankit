const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { ServerConfig } = require("../config");
const { BookingRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const db = require('../models');
async function createBooking (data) {
    return new Promise((resolve, reject) => {
        const result = db.sequelize.transaction(
            async function bookingImp (t) {
                const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
                const flightData = flight.data.data;
                if (parseInt(data.noOfSeats) > flightData.totalSeats) {
                    reject(new AppError(
                        'No of seats exceeds available seats',
                        StatusCodes.BAD_REQUEST
                    ));
                }
                resolve(true);
            }
        );
    }
    );


}

module.exports = {
    createBooking
};