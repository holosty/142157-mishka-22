function initMap() {
  const address = { lat: 59.9387192, lng: 30.3208587 }; //Записываем нужный адрес

  const map = new google.maps.Map(document.querySelector(".map-google"), {
    center: address,
    zoom: 17,
  });
  // Содержание информационного окна
  const contentString =
    "<h1>Mishka</h1>" +
    "<div>" +
    "<p>г. Санкт-Петербург ул. Большая Конюшенная д. 19/8, офис 101</p>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  // Создаем свой маркер на карте
  const marker = new google.maps.Marker({
    position: address,
    map: map,
    title: "Mishka",
    icon: {
      url: "../img/map-pin.svg",
      scaledSize: new google.maps.Size(67, 100)
    }
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}
