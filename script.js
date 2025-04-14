const canvas = document.getElementById('triangleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

let animationFrame = 0;
const duration = 100; // Number of frames for the animation
const startPoints = [
    { x: canvas.width / 2, y: 50 },  // Top point
    { x: 50, y: canvas.height - 50 }, // Bottom-left point
    { x: canvas.width - 50, y: canvas.height - 50 } // Bottom-right point
];
const endPoints = [
    { x: canvas.width / 2, y: 50 },
    { x: 50, y: canvas.height - 50 },
    { x: canvas.width - 50, y: canvas.height - 50 }
];
const initialPoints = [
    { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
    { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
    { x: Math.random() * canvas.width, y: Math.random() * canvas.height }
];

function interpolate(p1, p2, t) {
    return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t
    };
}

function drawTriangle(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fillStyle = 'skyblue';
    ctx.fill();
    ctx.strokeStyle = 'steelblue';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const t = Math.min(1, animationFrame / duration); // Normalize time (0 to 1)

    const currentPoints = initialPoints.map((start, index) => {
        return interpolate(start, endPoints[index], t);
    });

    drawTriangle(currentPoints);

    animationFrame++;
    if (animationFrame <= duration) {
        requestAnimationFrame(animate);
    } else {
        // Optionally, you can reset the animation here
        // animationFrame = 0;
        // requestAnimationFrame(animate);
    }
}

animate();
