const Link = require('../models/Link');
const config = require('config');
const shortid = require('shortid');

class LinkController{
    async generate(req, res){
       try{
        const baseurl = config.get("BASE_URL");
        const { from } = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({ from });
        if(existing){
            return res.json({ message: 'Такая ссылка уже существует'});
        }
        const to = baseurl + '/t/' + code;
        const link = new Link({ 
            code, to, from, owner: req.user.userId
        })
        await link.save();
        res.status(201).json({
            message: 'Ссылка создана',
            link: link
        })
       }catch(e) {
        res.status(500).json({ message: 'Что то пошло не так'});
       }
    }
    async allLinks(req, res){
       try{
        const links = await Link.find({ owner: req.user.userId})
        res.json(links);
       }catch(e) {
        res.status(500).json({ message: 'Что то пошло не так'});
       }
    }
    async getLinks(req, res){
       try{
        const link = await Link.findById(req.params.id);
        res.json(link);
       }catch(e) {
        res.status(500).json({ message: 'Что то пошло не так'});
       }
    }   

}


module.exports = new LinkController();