let map = document.getElementById("map");
let pin = document.getElementById("pin");
let line = document.getElementById("line");
let input = document.getElementById("input");
map.addEventListener('click', on_click);
map.addEventListener('keypress', on_key_press);
input.addEventListener('keypress', on_key_press);
let destination = pin.cloneNode(true)
map.appendChild(destination);
let mapX = map.offsetLeft;
let mapY = map.offsetTop;
let mapWidth = map.clientWidth;
let mapHeight = map.clientHeight;
let actualWidth = 2362;
let actualHeight = 1143;
let mm_per_pixel = (actualWidth / mapWidth).toPrecision(5);
var hasClicked = false;
let diameter;
let degree_per_mm;

function on_click(event) {
    coor = get_mouse_pos(event);
    coor[0] -= mapX;
    coor[1] -= mapY

    if (!hasClicked) {;
        destination.style.display = "none";
        line.style.display = "none";
        pin.style.display = 'block';
        pin.style.left = coor[0] + mapX + 'px';
        pin.style.top = coor[1] + mapY + 'px';  
        hasClicked = true;
    }
    else {
        destination.style.display = 'block';
        destination.style.left = coor[0] + mapX + 'px';
        destination.style.top = coor[1] + mapY + 'px';
        hasClicked = false;
        distance = get_distance(pin.offsetLeft, pin.offsetTop, destination.offsetLeft, destination.offsetTop);
        document.getElementById("distance").innerHTML = distance[0];
        document.getElementById("deltaX").innerHTML = distance[1];
        document.getElementById("deltaY").innerHTML = distance[2];
    }
}

function get_mouse_pos(event) {
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    var coor = [x, y]
    return coor
}

function on_key_press() {
    diameter = parseFloat(input.value);
    degree_per_mm = (360 / (diameter * Math.PI)).toPrecision(5);
}

function get_distance(x1, y1, x2, y2) {
    line.style.display = "block";
    distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    line.style.width = distance + 'px';
    line.style.left = x1 + mapX + 'px';
    line.style.top = y1 + mapY + 'px';
    line.style.transform = 'rotate(' + (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI) + 'deg)';
    distanceInMM = distance * mm_per_pixel;
    distanceInDegrees = (distanceInMM * degree_per_mm).toPrecision(5);
    deltaX = Math.abs((x2 - x1) * mm_per_pixel * degree_per_mm).toPrecision(5)
    deltaY = Math.abs((y2 - y1) * mm_per_pixel * degree_per_mm).toPrecision(5)
    return [distanceInDegrees, deltaX, deltaY];
}
