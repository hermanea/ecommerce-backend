const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  }).then(data =>{
    res.json(data);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({
      msg: "An error occured.",
      err: err
    })
  })
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product]
  }).then(data =>{
    res.json(data);
  }).catch(err =>{
    res.status(500).json({
      msg: "An error occured.",
      err: err
    })
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data =>{
    res.status(201).json(data);
  }).catch(err =>{
    res.json({
      msg: "An error occured.",
      err: err
    })
  })
});

router.put('/:id', (req, res) => {
  
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json(data)
  }).catch (err => {
    res.status(500).json({
      msg: "An error occured.",
      err: err
    })
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
        id:req.params.id
    }
  }).then(data=>{
      if(data){
          return res.json(data)
      } else {
          return res.status(404).json({msg:"no such record"})
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
});

module.exports = router;
