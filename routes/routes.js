exports.index = function(req, res){
  res.render('index');
  console.log('requested: index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log('requested: '+name);
  res.render('partials/' + name);
};