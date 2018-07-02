exports.addMapLink = function(object, city){
  let {id, category, position, title} = object; 
  const [lat, long] = position; 
  title = title.replace(/ /g, '-').replace(/[^a-zA-Z\d\-]/g,'');

  object.linkToMap = `https://wego.here.com/united-kingdom/${city}/${category.id}/${title}--${id}?map=${lat},${long},15,normal&x=ep`.toLowerCase();
}

/* This takes a HERE API object, and a string of the city it's in, and adds a key to it with a link to the HERE map. It doesn't return anything.
If you have an array of places, just forEach over it, passing each city to the function, and it'll modify the objects. 
All places in the array would have to be in the same city, though, because you'd still need to write in their location as a string.*/