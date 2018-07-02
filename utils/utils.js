exports.addMapLink = function(object, city){
  let {id, category, position, title} = object; 
  const [lat, long] = position; 
  title = title.replace(/ /g, '-').replace(/[^a-zA-Z\d\-]/g,'');

  return `https://wego.here.com/united-kingdom/${city}/${category.id}/${title}--${id}?map=${lat},${long},15,normal&x=ep`.toLowerCase();
}