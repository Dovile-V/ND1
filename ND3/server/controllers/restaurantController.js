import Restaurant from "../models/Restaurant.js";

// naujo restorano sukurimas
export const createRestaurant = async (req, res) => {
    try {

        const restaurant = new Restaurant(req.body);

        const savedRestaurant = await restaurant.save();

        res.status(201).json(savedRestaurant);

    } catch (err) {

        res.status(400).json({
            message: "Nepavyko sukurti restorano",
            error: err.message
        });
    }
};

// visi resstoranai gaunami
export const getRestaurants = async (req, res) => {
    try {

        const restaurants = await Restaurant.find().sort({
            createdAt: -1
        });

        res.status(200).json(restaurants);

    } catch (err) {

        res.status(500).json({
            message: "Nepavyko gauti restoranų",
            error: err.message
        });
    }
};

// vienas restoranas gaunamas
export const getRestaurant = async (req, res) => {
    try {

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restoranas nerastas"
            });
        }

        res.status(200).json(restaurant);

    } catch (err) {

        res.status(500).json({
            message: "Nepavyko gauti restorano",
            error: err.message
        });
    }
};

// atnaujinamas restoranas
export const updateRestaurant = async (req, res) => {
    try {

        const updatedRestaurant =
            await Restaurant.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedRestaurant) {
            return res.status(404).json({
                message: "Restoranas nerastas"
            });
        }

        res.status(200).json(updatedRestaurant);

    } catch (err) {

        res.status(400).json({
            message: "Nepavyko atnaujinti restorano",
            error: err.message
        });
    }
};

// istrinimas
export const deleteRestaurant = async (req, res) => {
    try {

        const deletedRestaurant =
            await Restaurant.findByIdAndDelete(req.params.id);

        if (!deletedRestaurant) {
            return res.status(404).json({
                message: "Restoranas nerastas"
            });
        }

        res.status(200).json({
            message: "Restoranas ištrintas"
        });

    } catch (err) {

        res.status(500).json({
            message: "Nepavyko ištrinti restorano",
            error: err.message
        });
    }
};