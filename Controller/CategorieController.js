const { where, and } = require("sequelize");
const {Category} = require("../Model/association");





exports.createCategory = async (req, res, next) => {
    try {
        const {
            name
        } = req.body

        const user_id = req.user.userId;
        const category = await Category.create({ name, user_id});
        return res.status(201).json({ message: "Category " + category.name + " bien creer" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}




exports.findAllCategory = async (req, res, next) => {
    try {

        const category = await Category.findAll();
        return res.status(200).json({
            message: "Category recupperer avec succes",
            data: category
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}



exports.findCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category introuvable"
            });
        }

        if(category.user_id !== req.user.userId){
           
            return res.status(403).json({ message: "Acces refuse" });
        
        }
        return res.status(200).json({
            message: "Category recupperer avec succes",
            data: category
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


exports.updateCategory = async (req, res, next) => {
    try {
        const {
            name
        } = req.body;

        const user_id = req.user.userId;

        const updateCategory = {};

        if (name !== undefined) updateCategory.name = name;
        if (user_id !== undefined) updateCategory.user_id = user_id;
    

        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category introuvable"
            });
        }

        if(category.user_id !== req.user.userId){
           
            return res.status(403).json({ message: "Acces refuse" });
        
        }



        const [updatedRows] = await Category.update(updateCategory, {
            where: { id: req.params.id , user_id : user_id}
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Category introuvable"
            });
        }

        return res.status(200).json({
            message: "Category mise à jour avec succès"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {

        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category introuvable"
            });
        }

        if(category.user_id !== req.user.userId){
           
            return res.status(403).json({ message: "Acces refuse" });
        
        }


        await Category.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: "Category supprimer " })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}




exports.findAllCategorieOfUser = async (req, res, next) => {
    try {

        console.log("Requete " +req.user.userId)

        
        const category = await Category.findAll({ where: { user_id: req.user.userId } })

        if (category === null) {
            return res.status(200).json({ message: "Aucune Categorie pour ce user" })
        }

        return res.status(200).json({
            message: "Categorie recupperer avec succes",
            data: category
        });




    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

