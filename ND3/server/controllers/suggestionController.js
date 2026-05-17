import Suggestion from "../models/Suggestion.js";

// issaugo lankytojo pasiulyma
export const createSuggestion = async (req, res) => {
    try {
        const suggestion = new Suggestion(req.body);

        const savedSuggestion = await suggestion.save();

        res.status(201).json(savedSuggestion);

    } catch (err) {

        res.status(400).json({
            message: "Nepavyko išsaugoti pasiūlymo",
            error: err.message
        });
    }
};

// visi pasiulymai
export const getSuggestions = async (req, res) => {
    try {

        const suggestions = await Suggestion.find().sort({
            createdAt: -1
        });

        res.status(200).json(suggestions);

    } catch (err) {

        res.status(500).json({
            message: "Nepavyko gauti pasiūlymų",
            error: err.message
        });
    }
};

// pasiulymas istrinamas
export const deleteSuggestion = async (req, res) => {
    try {

        const deletedSuggestion =
            await Suggestion.findByIdAndDelete(req.params.id);

        if (!deletedSuggestion) {
            return res.status(404).json({
                message: "Pasiūlymas nerastas"
            });
        }

        res.status(200).json({
            message: "Pasiūlymas ištrintas"
        });

    } catch (err) {

        res.status(500).json({
            message: "Nepavyko ištrinti pasiūlymo",
            error: err.message
        });
    }
};