export default function gradient(ctx) {
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.miterLimit = 10.0;
  ctx.font = "10px Helvetica";
  ctx.save();
  var radialGradient_1389130830351 = ctx.createRadialGradient(
    6e1,
    6e1,
    0.0,
    6e1,
    6e1,
    5e1,
  );
  radialGradient_1389130830351.addColorStop(0, "red");
  radialGradient_1389130830351.addColorStop(1, "blue");
  ctx.fillStyle = radialGradient_1389130830351;
  ctx.font = "10px Helvetica";
  ctx.beginPath();
  ctx.moveTo(2.5e1, 1e1);
  ctx.lineTo(9.5e1, 1e1);
  ctx.quadraticCurveTo(1.1e2, 1e1, 1.1e2, 2.5e1);
  ctx.lineTo(1.1e2, 9.5e1);
  ctx.quadraticCurveTo(1.1e2, 1.1e2, 9.5e1, 1.1e2);
  ctx.lineTo(2.5e1, 1.1e2);
  ctx.quadraticCurveTo(1e1, 1.1e2, 1e1, 9.5e1);
  ctx.lineTo(1e1, 2.5e1);
  ctx.quadraticCurveTo(1e1, 1e1, 2.5e1, 1e1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.save();
  var radialGradient_1389130830351 = ctx.createRadialGradient(
    3.5e1,
    1.45e2,
    0.0,
    3.5e1,
    1.45e2,
    2.5e1,
  );
  radialGradient_1389130830351.addColorStop(0, "red");
  radialGradient_1389130830351.addColorStop(1, "blue");
  ctx.fillStyle = radialGradient_1389130830351;
  ctx.font = "10px Helvetica";
  ctx.beginPath();
  ctx.moveTo(2.5e1, 1.2e2);
  ctx.lineTo(9.5e1, 1.2e2);
  ctx.quadraticCurveTo(1.1e2, 1.2e2, 1.1e2, 1.35e2);
  ctx.lineTo(1.1e2, 2.05e2);
  ctx.quadraticCurveTo(1.1e2, 2.2e2, 9.5e1, 2.2e2);
  ctx.lineTo(2.5e1, 2.2e2);
  ctx.quadraticCurveTo(1e1, 2.2e2, 1e1, 2.05e2);
  ctx.lineTo(1e1, 1.35e2);
  ctx.quadraticCurveTo(1e1, 1.2e2, 2.5e1, 1.2e2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}
