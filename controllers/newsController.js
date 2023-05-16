const NOTICIA = require("../models/news");

exports.crearNoticia = async (req, res) => {
    try {
        let nuevaNoticia;
        nuevaNoticia = new NOTICIA(req.body);
        await nuevaNoticia.save();
        // res.send(nuevaNoticia);
        res.status(200).json({
            ok: true,
            msg: "Noticia creada con exito",
            nuevaNoticia,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.readNoticias = async(req, res) =>{
    try {
        const readnoticias = await NOTICIA.find();
        return res.json({
            ok: true,
            readnoticias,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: "Noticia no encontrada",
        })
    }
}

exports.readNoticia = async (req, res) => {
    try {
        const readnoticia = await NOTICIA.findById(req.params.id);
        if(!readnoticia){
            return res.status(404).json({
                ok: false,
                msg: "Noticia no encontrada",
            })
        }else{
            return res.json({
                ok: true,
                readnoticia,
                msg: "Noticia encontrada",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.updateNoticia = async (req, res) => {
    try {
        const { titulo, descripcion, categoria, pais } = req.body;
        let updateNews = await NOTICIA.findById(req.params.id);

        //Buscamos si existe la noticia
        if (!updateNews) {
            res.status(404).json({ msg: 'La noticia no exite' })
        }
        updateNews.titulo = titulo;
        updateNews.descripcion = descripcion;
        updateNews.categoria = categoria;
        updateNews.pais = pais;

        updateNews = await NOTICIA.findByIdAndUpdate({ _id: req.params.id }, updateNews, { new: true })
        return res.json({
            ok: true,
            updateNews,
            msg: "Noticia actialiazada"
        });
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "Noticia no actualizada"
        })
    }
};

exports.deleteNoticia = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminarnoticia = await NOTICIA.findByIdAndRemove(id);
        return res.json({
            ok: true,
            msg: "Noticia borrada correctamente",
            eliminarnoticia,
        });
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: "Noticia no eliminada",

        });
    }
}