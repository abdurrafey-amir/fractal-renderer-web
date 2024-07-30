var header = document.querySelector('h2')
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var width = 200
var height = 200

canvas.width = width
canvas.height = height

var mouseX = 0
var mouseY = 0

var constant = math.complex(0.28, 0.01)

// turn a point on the complex plane into a color
function pointToColor(point) {
    point = point.sub(constant)
    var red = point.re * 255
    var green = point.im * 255
    var blue = math.abs(point) * 255

    return `rgb(${red}, ${green}, ${blue})`
}

// turn xy pixel coordinates into a point on the complex plane
function pixelToPoint(x, y) {
    // map percentage of total width/height to a value from -1 to +1
    
    var zx = (x / width) * 2 - 1
    var zy = 1 - (y / height) * 2

    // create a complex number based on our new xy values
    return math.complex(zx, zy)
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
}

function draw() {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            
            var point = pixelToPoint(x, y)

            var color = pointToColor(point)
            
            drawPixel(x, y, color)
        }
    }
}

function update() {
    header.innerHTML = constant.toString()
    draw()
}

function move(event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;

    constant = pixelToPoint(mouseX, mouseY)

    constant.re = math.round(constant.re * 100) / 100
    constant.im = math.round(constant.im * 100) / 100

    update()
}

canvas.addEventListener('pointermove', move)
update()