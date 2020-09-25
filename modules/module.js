module.exports = {
   hello: function() {
      return "Hello";
   }
}	

module.exports.createDate = function() {
    return new Date();
};

module.exports.showAlert = function() {
    alert("I'm running in Node module!");
};