export default function emptyArc(ctx) {
  ctx.fillStyle = "red";
  // Draw shapes
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.beginPath();
      ctx.arc(100, 100, 100, Math.PI, Math.PI);
      ctx.fill();
    }
  }
}
