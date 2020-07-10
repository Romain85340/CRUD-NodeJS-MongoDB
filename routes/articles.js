const Article = require("../Models/Article")
const router = require("express").Router()

// Ajouter des articles
router.post("/add", async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        cover: req.body.cover,
        category: req.body.category,
    });
    try {
        const newArticle = await article.save();
        res.status(201).json({ newArticle });
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// Afficher tous les articles
router.get("/", async (req, res) => {
    const article = await Article.find().populate("category", "title")
    try {
        res.status(201).json({ article });
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// Filtrer les articles par categorie
router.get("/bycategories/:id", async (req, res) => {
    const articles = await Article.find({ category: req.params.id }).populate("category", "title")

    try {
        res.status(201).json({ articles })
    } catch {
        res.status(400).json({ message: err });
    }
})


// Mettre a jour un article
router.put("/:id", async (req, res) => {
    

    try {
        await Article.updateOne(
            {_id: req.params.id},
            {title: req.body.title,
            content: req.body.content,
            cover: req.body.cover,
            category: req.body.category}

        )
        res.status(201).send("Article mis a jour avec succes !")
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

//Supprimer un article
router.delete("/:id", async (req, res) => {
    try {
        await Article.deleteOne({_id : req.params.id})
        res.status(201).send("Article supprimer avec succes !")
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

module.exports = router;