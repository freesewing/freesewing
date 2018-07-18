module.exports = `
function pointHover(evt) {
  var point = evt.target;
  var id = point.id;
  var cx = point.getAttribute('x');
  var cy = point.getAttribute('y');
  console.log('Point '+id+' ( '+cx+' , '+cy+' )');
  var scale = 2;
  cx = cx-scale*cx;
  cy = cy-scale*cy;
  point.setAttribute("transform", 'matrix('+scale+', 0, 0, '+scale+', '+cx+', '+cy+')');
  setTimeout(function(){
    var point = document.getElementById(evt.target.id);
    point.removeAttribute("transform", '');
  }, 1000);
}
`;