function ConverterController() { }

ConverterController.prototype.convert = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  return res.send({convert: "this"});
}

export default ConverterController;
