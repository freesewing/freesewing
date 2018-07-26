export default `
function pointHover(evt) {
  var point = evt.target;
  var id = point.id;
  var cx = point.getAttribute('x');
  var cy = point.getAttribute('y');
  var name = point.getAttribute('data-point');
  var part = point.getAttribute('data-part');
  console.log(name+' ('+cx+', '+cy+') @ '+part);
  var scale = 2;
  cx = cx-scale*cx;
  cy = cy-scale*cy;
  point.setAttribute("transform", 'matrix('+scale+', 0, 0, '+scale+', '+cx+', '+cy+')');
  pointUnhover(id);
}
function pointUnhover(id) {
  setTimeout(function(){
    document.getElementById(id).removeAttribute("transform", '');
  }, 500);
}
`;
