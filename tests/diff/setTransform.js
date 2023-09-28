export default function setTransform(ctx) {
  ctx.fillStyle = "red";
  ctx.setTransform(1, 0.2, 0.8, 1, 0, 0);
  ctx.fillRect(0, 0, 100, 100);
}
