var appRouter = function(app) {
app.get("/random", function(req, res) {
	function getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1) + min);
	}
    if(!req.query.min) {
        return res.send({"status": "error", "message": "missing minimum value"});
    } else if(!req.query.max) {
        return res.send({"status": "error", "message": "missing maximum value"});
    } else {
    	var random = getRandomInt(req.query.min,req.query.max);
        res.status = function status(code) {
  this.statusCode = code;
  return this;
};
        //return res.send(random);
    }
});
}

module.exports = appRouter;


