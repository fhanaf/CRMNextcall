const customerService = require('../services/customerService');


const getAllCustomers = async (req, res, next) => {
  try {

    const { q, job, status, level } = req.query;

    const customers = await customerService.getAllCustomers({ q, job, status, level });

    res.status(200).json({
      status: 'success',
      data: { customers },
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardData = async (req, res, next) => {
  try {
    const { q, job, status } = req.query;
    const customers = await customerService.getAllCustomers({ q, job, status });

    res.status(200).json({
      status: 'success',
      data: { customers }
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);

    res.status(200).json({
      status: 'success',
      data: { customer }
    });
  } catch (error) {
    next(error);
  }
};

const addInteraction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    // Kirim note ke service
    await customerService.updateContactStatus(id, note);

    res.status(201).json({
      status: 'success',
      message: 'Interaksi berhasil disimpan'
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { getDashboardData, getCustomerById, addInteraction, getAllCustomers };