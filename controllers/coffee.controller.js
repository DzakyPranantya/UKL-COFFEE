const { coffee } = require(`../models/index`);
const { Op } = require(`sequelize`);
const path = require(`path`);
const fs = require(`fs`);
const upload = require(`./upload.images`).single(`image`);

exports.getAll = async (req, res) => {
  let cars = await coffee.findAll();
  return res.json({
    success: true,
    data: cars,
    message: `All coffee have been loaded`,
  });
};

exports.findCoffee = async (req, res) => {
  try {
    let keyword = req.params.keyword;
    let cars = await coffee.findOne({
      where: { coffeeID: keyword },
    });
    return res.json({
      success: true,
      data: cars,
      message: `All coffee have been loaded`,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error,
    });
  }
};

exports.findCoffeeString = async (req, res) => {
  let keyword = req.params.keyword;
  let cars = await coffee.findOne({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: keyword } },
        { coffeeID: { [Op.substring]: keyword } },
      ],
    },
  });
  return res.json({
    success: true,
    data: cars,
    message: `All coffee have been loaded`,
  });
};

exports.addCoffee = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }
    if (!request.file) {
      return response.json({
        message: `Nothing to Upload`,
      });
    }
    let newCoffee = {
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
      image: request.file.filename,
    };
    coffee
      .create(newCoffee)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New coffee has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.updateCoffee = async (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }
    let carID = request.params.id;
    let dataEvent = {
      name: request.body.name,
      price: request.body.price,
      size: request.body.size,
      image: request.file.filename,
    };
    if (request.file) {
      const selectedEvent = await coffee.findOne({
        where: { coffeeID: carID },
      });
      const oldImage = selectedEvent.image;
      const pathImage = path.join(__dirname, `../image`, oldImage);
      if (fs.existsSync(pathImage)) {
        fs.unlink(pathImage, (error) => console.log(error));
      }
      dataEvent.image = request.file.filename;
    }
    coffee
      .update(dataEvent, { where: { coffeeID: carID } })
      .then((result) => {
        return response.json({
          success: true,
          message: `Data coffee has been updated`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deletCoffee = async (request, response) => {
  const eventID = request.params.id;
  const event = await coffee.findOne({ where: { coffeeID: eventID } });
  const oldImage = event.image;
  const pathImage = path.join(__dirname, `../image`, oldImage);
  if (fs.existsSync(pathImage)) {
    fs.unlink(pathImage, (error) => console.log(error));
  }
  coffee
    .destroy({ where: { coffeeID: eventID } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data coffee has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
