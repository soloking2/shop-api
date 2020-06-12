const Thing = require('../models/things');

exports.getThings = (req, res) => {
  Thing.find((err, things) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(things);

  })
};

exports.postThing = (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.thing = JSON.parse(req.body.thing);
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  })
  thing.save().then(() => {
    res.status(201).json({
      message: 'Post saved successfully'
    });
  }).catch(err => {
    res.status(400).json({
      error: err
    })
  })
};

exports.getThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}, (err, stuff) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(stuff);
  })
};

exports.updateThing = (req, res, next) => {
  const thing  = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  })
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(200).json({
        message: 'Posts updated successfully'
      })
    }
  ).catch(error => {
    res.status(400).json({
      error: error
    })
  })
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(() => {
    res.json({
      message: 'Deleted successfully'
    })
  }).catch(error => {
    res.json({
      error: error
    })
  })
};